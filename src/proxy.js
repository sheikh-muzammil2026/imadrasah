import { NextResponse } from "next/server";
import { siteConfig } from "./config/siteConfig";

/**
 * Edge Proxy & RBAC Guard
 * Intercepts protected dashboard routes, verifies authentication and role hierarchy,
 * blocks cross-role privilege escalation, and attaches verified role headers.
 */
export function proxy(request) {
  const { pathname, search } = request.nextUrl;

  // Only intercept /dashboard routes
  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  // 1. Extract session credentials from cookies or headers
  const qkRoleCookie = request.cookies.get("qk_role")?.value;
  const qkUserCookie = request.cookies.get("qk_user")?.value;
  const headerRole = request.headers.get("x-user-role");

  let userRole = null;
  let userId = null;

  if (qkRoleCookie) {
    userRole = decodeURIComponent(qkRoleCookie).toLowerCase().trim();
  }

  if (qkUserCookie) {
    try {
      const parsedUser = JSON.parse(decodeURIComponent(qkUserCookie));
      if (parsedUser) {
        userRole = userRole || parsedUser.role?.toLowerCase()?.trim();
        userId = parsedUser.id || parsedUser._id || null;
      }
    } catch {
      // Cookie is not JSON
    }
  }

  if (headerRole && !userRole) {
    userRole = headerRole.toLowerCase().trim();
  }

  // 2. Unauthenticated check: Redirect to login with callback URL
  if (!userRole) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Root /dashboard redirect to user's assigned role dashboard
  if (pathname === "/dashboard" || pathname === "/dashboard/") {
    if (userRole === siteConfig.roles.SUPER_ADMIN) {
      return NextResponse.redirect(new URL("/dashboard/super-admin", request.url));
    }
    if (userRole === siteConfig.roles.ADMIN) {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }
    if (userRole === siteConfig.roles.TEACHER) {
      return NextResponse.redirect(new URL("/dashboard/teacher", request.url));
    }
    return NextResponse.redirect(new URL("/dashboard/student", request.url));
  }

  // 4. Role-Based Route Protection (Zero Cross-Role Hopping)
  // Super Admin Zone
  if (pathname.startsWith("/dashboard/super-admin")) {
    const allowedRoles = siteConfig.routePermissions["/dashboard/super-admin"] || ["super_admin"];
    if (!allowedRoles.includes(userRole)) {
      if (userRole === "admin") {
        return NextResponse.redirect(new URL("/dashboard/admin", request.url));
      }
      if (userRole === "teacher") {
        return NextResponse.redirect(new URL("/dashboard/teacher", request.url));
      }
      return NextResponse.redirect(new URL("/dashboard/student", request.url));
    }
  }

  // Admin Zone
  if (pathname.startsWith("/dashboard/admin")) {
    const allowedRoles = siteConfig.routePermissions["/dashboard/admin"] || ["admin", "super_admin"];
    if (!allowedRoles.includes(userRole)) {
      if (userRole === "teacher") {
        return NextResponse.redirect(new URL("/dashboard/teacher", request.url));
      }
      return NextResponse.redirect(new URL("/dashboard/student", request.url));
    }
  }

  // Teacher Zone
  if (pathname.startsWith("/dashboard/teacher")) {
    const allowedRoles = siteConfig.routePermissions["/dashboard/teacher"] || ["teacher", "admin", "super_admin"];
    if (!allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL("/dashboard/student", request.url));
    }
  }

  // 5. Authorized: Pass request downstream with verified headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-role", userRole);
  if (userId) {
    requestHeaders.set("x-user-id", String(userId));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
