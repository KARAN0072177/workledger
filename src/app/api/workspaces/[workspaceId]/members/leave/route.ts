import { NextResponse } from "next/server";
import { leaveWorkspace } from "@/server/services/leave-workspace";

export async function POST(
  _req: Request,
  { params }: { params: { workspaceId: string } }
) {
  try {
    await leaveWorkspace(params.workspaceId);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "CANNOT_LEAVE_WORKSPACE" },
      { status: 400 }
    );
  }
}