import { NextResponse } from "next/server";
import { getUsersCollection } from "@/lib/db";
import { hashPassword } from "@/lib/auth-passwords";

export const dynamic = "force-dynamic";

/**
 * POST /api/auth/register
 * Persists user directly into MongoDB 'users' collection
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body || {};

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "নাম, ইমেইল এবং পাসওয়ার্ড আবশ্যক।" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।" },
        { status: 400 }
      );
    }

    const usersCollection = getUsersCollection();
    const normalizedEmail = email.toLowerCase().trim();

    // Check duplicate email
    const existing = await usersCollection.findOne({ email: normalizedEmail });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট তৈরি করা আছে।" },
        { status: 409 }
      );
    }

    // Hash password & insert into 'users' collection
    const hashedPassword = hashPassword(password);
    const newUser = {
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: role || "student",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);

    return NextResponse.json(
      {
        success: true,
        message: "নিবন্ধন সফলভাবে সম্পন্ন হয়েছে!",
        user: {
          id: result.insertedId.toString(),
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API register error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "নিবন্ধন সম্পন্ন করতে ব্যর্থ হয়েছে। সার্ভার এরর।",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
