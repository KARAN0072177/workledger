import { NextResponse } from "next/server";
import { postgres } from "@/lib/db";
import { getAuthContext } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { username } = await req.json();
    const { userId } = await getAuthContext();

    if (!username || username.length < 3) {
      return NextResponse.json(
        { error: "Invalid username" },
        { status: 400 }
      );
    }

    const exists = await postgres.user.findUnique({
      where: { username },
    });

    if (exists) {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 409 }
      );
    }

    await postgres.user.update({
      where: { id: userId },
      data: { username },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "UNAUTHORIZED" },
      { status: 401 }
    );
  }
}