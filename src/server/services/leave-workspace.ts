import { postgres, mongo } from "@/lib/db";
import { getAuthContext } from "@/lib/auth";

export async function leaveWorkspace(workspaceId: string) {
  const { userId } = await getAuthContext();

  const membership = await postgres.workspaceMember.findUnique({
    where: {
      userId_workspaceId: { userId, workspaceId },
    },
  });

  if (!membership || membership.role === "OWNER") {
    throw new Error("CANNOT_LEAVE_WORKSPACE");
  }

  await postgres.workspaceMember.update({
    where: {
      userId_workspaceId: { userId, workspaceId },
    },
    data: { deletedAt: new Date() },
  });

  await mongo.activity.create({
    data: {
      workspaceId,
      actorId: userId,
      type: "MEMBER_LEFT",
    },
  });
}