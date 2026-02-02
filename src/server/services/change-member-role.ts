import { postgres, mongo } from "@/lib/db";
import { requirePermission } from "@/lib/rbac/require-permission";
import { WorkspaceRole } from "@prisma/client/postgres";

export async function changeMemberRole(
  workspaceId: string,
  targetUserId: string,
  newRole: WorkspaceRole
) {
  const { userId } = await requirePermission(
    workspaceId,
    "member:invite"
  );

  const updated = await postgres.workspaceMember.update({
    where: {
      userId_workspaceId: {
        userId: targetUserId,
        workspaceId,
      },
    },
    data: { role: newRole },
  });

  await mongo.activity.create({
    data: {
      workspaceId,
      actorId: userId,
      type: "ROLE_CHANGED",
      metadata: { targetUserId, newRole },
    },
  });

  return updated;
}