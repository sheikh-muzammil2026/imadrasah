import { NextResponse } from "next/server";
import { getUsersCollection } from "@/lib/db";
import { verifyPassword } from "@/lib/auth-passwords";

export const dynamic = "force-dynamic";

/**
 * POST /api/auth/login
 * Authenticates user from MongoDB 'users' collection
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "দয়া করে ইমেইল ও পাসওয়ার্ড প্রদান করুন।" },
        { status: 400 }
      );
    }

    const usersCollection = getUsersCollection();
    const normalizedEmail = email.toLowerCase().trim();

    const user = await usersCollection.findOne({ email: normalizedEmail });
    if (!user || !verifyPassword(password, user.password)) {
      return NextResponse.json(
        { success: false, message: "ভুল ইমেইল বা পাসওয়ার্ড। দয়া করে আবার চেষ্টা করুন।" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "লগইন সফল হয়েছে!",
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "student",
          studentId: user.studentId || null,
          teacherId: user.teacherId || null,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "লগইন করতে ব্যর্থ হয়েছে। সার্ভার এরর।",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
