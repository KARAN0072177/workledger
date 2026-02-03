import { NextResponse } from "next/server";
import { inviteMember } from "@/server/services/invite-member";

export async function POST(
  req: Request,
  { params }: { params: { workspaceId: string } }
) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID required" },
        { status: 400 }
      );
    }

    const membership = await inviteMember(
      params.workspaceId,
      userId
    );

    return NextResponse.json(membership);
  } catch (err) {
    return NextResponse.json(
      { error: "FORBIDDEN" },
      { status: 403 }
    );
  }
}