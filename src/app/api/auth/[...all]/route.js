import { toNextJsHandler } from "better-auth/next-js";

// Force dynamic execution so Next.js build-time static page collection
// does not evaluate database connections or hold the event loop open.
export const dynamic = "force-dynamic";

export const GET = async (request) => {
  const { auth } = await import("@/lib/auth");
  const handler = toNextJsHandler(auth);
  return handler.GET(request);
};

export const POST = async (request) => {
  const { auth } = await import("@/lib/auth");
  const handler = toNextJsHandler(auth);
  return handler.POST(request);
};
