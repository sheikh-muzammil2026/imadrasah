import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getUsersCollection, getAuditLogsCollection } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { role } = body || {};

    const validRoles = ["super_admin", "admin", "teacher", "student"];
    if (!validRoles.includes(role)) {
      return NextResponse.json({ success: false, message: "অকার্যকর রোল।" }, { status: 400 });
    }

    const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id };
    const collection = getUsersCollection();
    const user = await collection.findOne(query);

    if (!user) {
      return NextResponse.json({ success: false, message: "ব্যবহারকারী পাওয়া যায়নি।" }, { status: 404 });
    }

    const actorRole = request.headers.get("x-user-role") || "admin";
    if ((role === "super_admin" || user.role === "super_admin") && actorRole !== "super_admin") {
      return NextResponse.json({ success: false, message: "কেবলমাত্র সুপার অ্যাডমিন এই রোলটি পরিবর্তন করতে পারেন।" }, { status: 403 });
    }

    await collection.updateOne(query, {
      $set: { role, updatedAt: new Date() },
    });

    // Record audit log
    const auditLogs = getAuditLogsCollection();
    await auditLogs.insertOne({
      actor: {
        id: request.headers.get("x-user-id") || "admin",
        role: actorRole,
        email: request.headers.get("x-user-email") || "admin@qurankanan.com",
      },
      action: "USER_ROLE_UPDATED",
      target: {
        type: "user",
        id: user._id.toString(),
        name: user.name,
      },
      details: {
        previousRole: user.role,
        newRole: role,
        email: user.email,
      },
      timestamp: new Date(),
    }).catch(() => {});

    return NextResponse.json({
      success: true,
      message: `রোল সফলভাবে ${role} এ পরিবর্তিত হয়েছে!`,
      role,
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json({ success: false, message: "Error" }, { status: 500 });
  }
}
