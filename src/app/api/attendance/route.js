import { NextResponse } from "next/server";
import { getAttendanceCollection } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/attendance?courseSlug=...&date=...
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseSlug = searchParams.get("courseSlug");
    const date = searchParams.get("date");
    const studentEmail = searchParams.get("studentEmail");

    const query = {};
    if (courseSlug) query.courseSlug = courseSlug;
    if (date) query.date = date;
    if (studentEmail) query["records.studentEmail"] = studentEmail.toLowerCase().trim();

    const collection = getAttendanceCollection();
    const records = await collection.find(query).sort({ date: -1 }).toArray();

    return NextResponse.json({
      success: true,
      count: records.length,
      records,
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch attendance" }, { status: 500 });
  }
}

// POST /api/attendance
// Body: { courseSlug, courseTitle, date, teacherId, teacherName, lessonTopic, records: [{ studentId, studentName, studentEmail, status: "present"|"absent"|"excused" }] }
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      courseSlug,
      courseTitle,
      date,
      teacherId,
      teacherName,
      lessonTopic,
      records,
    } = body;

    if (!courseSlug || !date || !Array.isArray(records)) {
      return NextResponse.json(
        { success: false, message: "কোর্স, তারিখ এবং শিক্ষার্থীদের হাজিরা তালিকা আবশ্যক।" },
        { status: 400 }
      );
    }

    const formattedRecords = records.map((r) => ({
      studentId: r.studentId || "",
      studentName: r.studentName || "",
      studentEmail: (r.studentEmail || "").toLowerCase().trim(),
      status: ["present", "absent", "late", "excused"].includes(r.status) ? r.status : "present",
      notes: r.notes || "",
    }));

    const attendanceDoc = {
      courseSlug,
      courseTitle: courseTitle || courseSlug,
      date: date || new Date().toISOString().split("T")[0],
      teacherId: teacherId || "0202",
      teacherName: teacherName || "উস্তাদ",
      lessonTopic: lessonTopic || "দৈনিক পাঠ ও মাশক",
      records: formattedRecords,
      totalCount: formattedRecords.length,
      presentCount: formattedRecords.filter((r) => r.status === "present").length,
      absentCount: formattedRecords.filter((r) => r.status === "absent").length,
      lateCount: formattedRecords.filter((r) => r.status === "late").length,
      updatedAt: new Date(),
    };

    const collection = getAttendanceCollection();
    const existing = await collection.findOne({ courseSlug, date });

    if (existing) {
      await collection.updateOne(
        { _id: existing._id },
        { $set: attendanceDoc }
      );
      return NextResponse.json({
        success: true,
        message: "আজকের ক্লাসের হাজিরা সফলভাবে আপডেট হয়েছে!",
        recordId: existing._id,
        record: { ...attendanceDoc, _id: existing._id },
      }, { status: 200 });
    }

    attendanceDoc.createdAt = new Date();
    const result = await collection.insertOne(attendanceDoc);

    return NextResponse.json({
      success: true,
      message: "হাজিরা সফলভাবে সংরক্ষিত হয়েছে!",
      recordId: result.insertedId,
      record: attendanceDoc,
    }, { status: 201 });
  } catch (error) {
    console.error("Error recording attendance:", error);
    return NextResponse.json({ success: false, message: "হাজিরা সংরক্ষণ করতে সমস্যা হয়েছে।" }, { status: 500 });
  }
}
