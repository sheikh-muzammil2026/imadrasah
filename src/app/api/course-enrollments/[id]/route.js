import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import {
  getCourseEnrollmentsCollection,
  getUsersCollection,
  generateNextStudentId,
} from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/course-enrollments/[id]
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id };
    const collection = getCourseEnrollmentsCollection();
    const enrollment = await collection.findOne(query);

    if (!enrollment) {
      return NextResponse.json({ success: false, message: "Enrollment not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, enrollment });
  } catch (error) {
    console.error("Error fetching enrollment:", error);
    return NextResponse.json({ success: false, message: "Error" }, { status: 500 });
  }
}

// PATCH /api/course-enrollments/[id]
// Body: { action: "approve" | "reject", adminFeedback?: string }
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { action, adminFeedback } = body;

    const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id };
    const enrollmentsCollection = getCourseEnrollmentsCollection();
    const usersCollection = getUsersCollection();

    const enrollment = await enrollmentsCollection.findOne(query);
    if (!enrollment) {
      return NextResponse.json({ success: false, message: "আবেদনটি খুঁজে পাওয়া যায়নি।" }, { status: 404 });
    }

    if (action === "approve") {
      const userEmail = enrollment.userEmail.toLowerCase().trim();
      const existingUser = await usersCollection.findOne({ email: userEmail });

      // Check if user already has studentId: KEEP existing, or generate 0401+
      let studentId = existingUser?.studentId || enrollment.studentId;
      if (!studentId) {
        studentId = await generateNextStudentId();
      }

      // 1. Update enrollment document
      await enrollmentsCollection.updateOne(query, {
        $set: {
          status: "approved",
          studentId,
          approvedAt: new Date(),
          updatedAt: new Date(),
        },
      });

      // 2. Grant course access & update user record
      const courseAccessItem = {
        courseSlug: enrollment.courseSlug,
        courseTitle: enrollment.courseTitle,
        enrolledAt: new Date(),
      };

      if (existingUser) {
        await usersCollection.updateOne(
          { _id: existingUser._id },
          {
            $set: {
              studentId,
              role: existingUser.role === "admin" || existingUser.role === "teacher" ? existingUser.role : "student",
              updatedAt: new Date(),
            },
            $addToSet: {
              enrolledCourses: courseAccessItem,
            },
          }
        );
      } else {
        await usersCollection.insertOne({
          name: enrollment.userName,
          email: userEmail,
          role: "student",
          studentId,
          enrolledCourses: [courseAccessItem],
          emailVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      return NextResponse.json({
        success: true,
        message: `কোর্সে ভর্তি আবেদন সফলভাবে অনুমোদিত হয়েছে। শিক্ষার্থী আইডি: ${studentId}`,
        studentId,
        status: "approved",
      });
    } else if (action === "reject") {
      const feedbackNote =
        adminFeedback && adminFeedback.trim()
          ? adminFeedback.trim()
          : "আবেদন পর্যালোচনায় তথ্যের ঘাটতি থাকায় এই মুহূর্তে আবেদনটি গ্রহণ করা সম্ভব হয়নি। অনুগ্রহ করে বিস্তারিত তথ্যসহ পুনরায় আবেদন করুন।";

      await enrollmentsCollection.updateOne(query, {
        $set: {
          status: "rejected",
          adminFeedback: feedbackNote,
          rejectedAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return NextResponse.json({
        success: true,
        message: "ভর্তি আবেদন বাতিল করা হয়েছে এবং শিক্ষার্থীকে কারণ জানানো হয়েছে।",
        status: "rejected",
        adminFeedback: feedbackNote,
      });
    }

    return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error updating enrollment:", error);
    return NextResponse.json({ success: false, message: "আবেদন আপডেট করতে ত্রুটি হয়েছে।" }, { status: 500 });
  }
}

// DELETE /api/course-enrollments/[id]
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id };
    const collection = getCourseEnrollmentsCollection();
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "আবেদনটি পাওয়া যায়নি।" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "আবেদন মুছে ফেলা হয়েছে।" });
  } catch (error) {
    console.error("Error deleting enrollment:", error);
    return NextResponse.json({ success: false, message: "Error deleting" }, { status: 500 });
  }
}
