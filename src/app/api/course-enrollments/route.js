import { NextResponse } from "next/server";
import { getCourseEnrollmentsCollection } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/course-enrollments
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get("userEmail");
    const courseSlug = searchParams.get("courseSlug");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const query = {};
    if (userEmail) query.userEmail = userEmail.toLowerCase().trim();
    if (courseSlug) query.courseSlug = courseSlug;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { userName: { $regex: search, $options: "i" } },
        { userEmail: { $regex: search, $options: "i" } },
        { courseTitle: { $regex: search, $options: "i" } },
        { studentId: { $regex: search, $options: "i" } },
      ];
    }

    const collection = getCourseEnrollmentsCollection();
    const enrollments = await collection
      .find(query)
      .sort({ appliedAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      count: enrollments.length,
      enrollments,
    });
  } catch (error) {
    console.error("Error in GET /api/course-enrollments:", error);
    return NextResponse.json(
      { success: false, message: "Error loading enrollments" },
      { status: 500 }
    );
  }
}

// POST /api/course-enrollments
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      userId,
      userName,
      userEmail,
      courseSlug,
      courseTitle,
      phone,
    } = body;

    if (!userEmail || !courseSlug) {
      return NextResponse.json(
        { success: false, message: "ব্যবহারকারীর ইমেইল ও কোর্সের তথ্য আবশ্যক।" },
        { status: 400 }
      );
    }

    const email = userEmail.toLowerCase().trim();
    const collection = getCourseEnrollmentsCollection();

    // Check if active pending or approved enrollment exists
    const existing = await collection.findOne({
      userEmail: email,
      courseSlug,
      status: { $in: ["pending", "approved"] },
    });

    if (existing) {
      if (existing.status === "approved") {
        return NextResponse.json(
          {
            success: false,
            message: "আপনি ইতোমধ্যে এই কোর্সে ভর্তি রয়েছেন।",
            status: "approved",
            enrollment: existing,
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          message: "এই কোর্সে আপনার একটি আবেদন ইতোমধ্যেই প্রক্রিয়াধীন রয়েছে।",
          status: "pending",
          enrollment: existing,
        },
        { status: 400 }
      );
    }

    const enrollmentDoc = {
      userId: userId || "",
      userName: userName ? userName.trim() : "শিক্ষার্থী",
      userEmail: email,
      phone: phone ? phone.trim() : "",
      courseSlug: courseSlug.trim(),
      courseTitle: courseTitle ? courseTitle.trim() : courseSlug,
      status: "pending",
      adminFeedback: "",
      appliedAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(enrollmentDoc);

    return NextResponse.json(
      {
        success: true,
        message: "কোর্সে ভর্তির আবেদন সফলভাবে জমা হয়েছে। অ্যাডমিন প্যানেল পর্যালোচনা করে অনুমোদন প্রদান করবে।",
        enrollmentId: result.insertedId,
        enrollment: enrollmentDoc,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/course-enrollments:", error);
    return NextResponse.json(
      { success: false, message: "আবেদন জমা দিতে সমস্যা হয়েছে।" },
      { status: 500 }
    );
  }
}
