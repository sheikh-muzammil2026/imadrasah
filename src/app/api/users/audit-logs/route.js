import { NextResponse } from "next/server";
import { getAuditLogsCollection } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");
    const actorEmail = searchParams.get("actorEmail");
    const limit = Number(searchParams.get("limit")) || 50;
    const skip = Number(searchParams.get("skip")) || 0;

    const filter = {};
    if (action && action !== "all") filter.action = action;
    if (actorEmail) filter["actor.email"] = { $regex: actorEmail, $options: "i" };

    const collection = getAuditLogsCollection();
    const total = await collection.countDocuments(filter).catch(() => 0);
    const logs = await collection
      .find(filter)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()
      .catch(() => []);

    return NextResponse.json({
      success: true,
      count: total,
      logs,
    });
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    return NextResponse.json({ success: false, message: "Error", logs: [] }, { status: 500 });
  }
}
