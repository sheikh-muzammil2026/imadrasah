import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getUsersCollection, getAuditLogsCollection } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id };
    const collection = getUsersCollection();
    const user = await collection.findOne(query);

    if (!user) {
      return NextResponse.json({ success: false, message: "ব্যবহারকারী পাওয়া যায়নি।" }, { status: 404 });
    }

    const newStatus = user.status === "suspended" ? "active" : "suspended";
    await collection.updateOne(query, {
      $set: { status: newStatus, updatedAt: new Date() },
    });

    // Record audit log
    const auditLogs = getAuditLogsCollection();
    await auditLogs.insertOne({
      actor: {
        id: request.headers.get("x-user-id") || "admin",
        role: request.headers.get("x-user-role") || "admin",
        email: request.headers.get("x-user-email") || "admin@qurankanan.com",
      },
      action: "USER_STATUS_TOGGLED",
      target: {
        type: "user",
        id: user._id.toString(),
        name: user.name,
      },
      details: {
        previousStatus: user.status || "active",
        newStatus,
        email: user.email,
      },
      timestamp: new Date(),
    }).catch(() => {});

    return NextResponse.json({
      success: true,
      message: `ব্যবহারকারী অ্যাকাউন্ট সফলভাবে ${newStatus === "active" ? "সক্রিয়" : "স্থগিত"} করা হয়েছে।`,
      status: newStatus,
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    return NextResponse.json({ success: false, message: "Error" }, { status: 500 });
  }
}
