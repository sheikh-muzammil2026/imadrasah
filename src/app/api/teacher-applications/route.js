import { NextResponse } from "next/server";
import { getTeacherApplicationsCollection } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/teacher-applications
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const department = searchParams.get("department");
    const search = searchParams.get("search");

    const query = {};
    if (status) query.status = status;
    if (department) query.department = department;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { teacherId: { $regex: search, $options: "i" } },
      ];
    }

    const collection = getTeacherApplicationsCollection();
    const applications = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Error in GET /api/teacher-applications:", error);
    return NextResponse.json(
      { success: false, message: "আবেদন তালিকা লোড করতে সমস্যা হয়েছে।" },
      { status: 500 }
    );
  }
}

// POST /api/teacher-applications
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      fatherName,
      phone,
      email,
      nidOrBrn,
      qualification,
      department,
      experience,
      address,
      bioOrCvLink,
    } = body;

    if (!name || !phone || !email || !qualification || !department) {
      return NextResponse.json(
        {
          success: false,
          message: "অনুগ্রহ করে সকল আবশ্যক তথ্য (নাম, ফোন, ইমেইল, শিক্ষাগত যোগ্যতা ও বিভাগ) পূরণ করুন।",
        },
        { status: 400 }
      );
    }

    const applicationDoc = {
      name: name.trim(),
      fatherName: fatherName ? fatherName.trim() : "",
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      nidOrBrn: nidOrBrn ? nidOrBrn.trim() : "",
      qualification: qualification.trim(),
      department: department.trim(),
      experience: experience ? experience.trim() : "নতুন",
      address: address ? address.trim() : "",
      bioOrCvLink: bioOrCvLink ? bioOrCvLink.trim() : "",
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const collection = getTeacherApplicationsCollection();
    const result = await collection.insertOne(applicationDoc);

    return NextResponse.json(
      {
        success: true,
        message: "আপনার শিক্ষক আবেদনটি সফলভাবে গৃহীত হয়েছে। অ্যাডমিন প্যানেল পর্যালোচনা করে দ্রুত যোগাযোগ করবে।",
        applicationId: result.insertedId,
        application: applicationDoc,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/teacher-applications:", error);
    return NextResponse.json(
      { success: false, message: "আবেদন জমা দিতে সমস্যা হয়েছে।" },
      { status: 500 }
    );
  }
}
