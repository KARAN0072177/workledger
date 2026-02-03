import { NextResponse } from "next/server";
import { changeMemberRole } from "@/server/services/change-member-role";

export async function PATCH(
  req: Request,
  { params }: { params: { workspaceId: string } }
) {
  try {
    const { userId, role } = await req.json();

    if (!userId || !role) {
      return NextResponse.json(
        { error: "User ID and role required" },
        { status: 400 }
      );
    }

    const updated = await changeMemberRole(
      params.workspaceId,
      userId,
      role
    );

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json(
      { error: "FORBIDDEN" },
      { status: 403 }
    );
  }
}