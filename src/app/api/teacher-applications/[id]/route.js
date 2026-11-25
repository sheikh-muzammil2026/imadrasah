import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import {
  getTeacherApplicationsCollection,
  getUsersCollection,
  generateNextTeacherId,
} from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/teacher-applications/[id]
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id };
    const collection = getTeacherApplicationsCollection();
    const application = await collection.findOne(query);

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error("Error fetching application details:", error);
    return NextResponse.json({ success: false, message: "Error loading application" }, { status: 500 });
  }
}

// PATCH /api/teacher-applications/[id]
// Body: { action: "approve" | "reject" }
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { action } = body;

    const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id };
    const applicationsCollection = getTeacherApplicationsCollection();
    const usersCollection = getUsersCollection();

    const application = await applicationsCollection.findOne(query);
    if (!application) {
      return NextResponse.json({ success: false, message: "আবেদনটি খুঁজে পাওয়া যায়নি।" }, { status: 404 });
    }

    if (action === "approve") {
      let teacherId = application.teacherId;
      if (!teacherId || application.status !== "approved") {
        teacherId = await generateNextTeacherId();
      }

      // 1. Update Application status
      await applicationsCollection.updateOne(query, {
        $set: {
          status: "approved",
          teacherId,
          approvedAt: new Date(),
          updatedAt: new Date(),
        },
      });

      // 2. Link or create user in user collection
      const userEmail = application.email.toLowerCase().trim();
      const existingUser = await usersCollection.findOne({ email: userEmail });

      if (existingUser) {
        await usersCollection.updateOne(
          { _id: existingUser._id },
          {
            $set: {
              role: "teacher",
              teacherId,
              department: application.department,
              phone: application.phone || existingUser.phone,
              qualification: application.qualification,
              updatedAt: new Date(),
            },
          }
        );
      } else {
        await usersCollection.insertOne({
          name: application.name,
          email: userEmail,
          role: "teacher",
          teacherId,
          department: application.department,
          phone: application.phone,
          qualification: application.qualification,
          emailVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      return NextResponse.json({
        success: true,
        message: `শিক্ষক আবেদন সফলভাবে অনুমোদিত হয়েছে। আইডি: ${teacherId}`,
        teacherId,
        status: "approved",
      });
    } else if (action === "reject") {
      await applicationsCollection.updateOne(query, {
        $set: {
          status: "rejected",
          rejectedAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return NextResponse.json({
        success: true,
        message: "আবেদনটি বাতিল করা হয়েছে।",
        status: "rejected",
      });
    }

    return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error updating teacher application:", error);
    return NextResponse.json({ success: false, message: "আবেদন আপডেট করতে ত্রুটি হয়েছে।" }, { status: 500 });
  }
}

// DELETE /api/teacher-applications/[id]
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id };
    const collection = getTeacherApplicationsCollection();
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "আবেদনটি পাওয়া যায়নি।" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "শিক্ষক আবেদন সফলভাবে মুছে ফেলা হয়েছে।" });
  } catch (error) {
    console.error("Error deleting application:", error);
    return NextResponse.json({ success: false, message: "আবেদন মুছতে সমস্যা হয়েছে।" }, { status: 500 });
  }
}
