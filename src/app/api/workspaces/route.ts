import { NextResponse } from "next/server";
import { createWorkspace } from "@/server/services/create-workspace";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: "Workspace name required" },
        { status: 400 }
      );
    }

    const workspace = await createWorkspace(name);

    return NextResponse.json(workspace, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "UNAUTHORIZED" },
      { status: 401 }
    );
  }
}