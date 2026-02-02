import { postgres, mongo } from "@/lib/db";
import { requirePermission } from "@/lib/rbac/require-permission";

export async function inviteMember(
  workspaceId: string,
  userIdToInvite: string
) {
  const { userId } = await requirePermission(
    workspaceId,
    "member:invite"
  );

  const membership = await postgres.workspaceMember.create({
    data: {
      workspaceId,
      userId: userIdToInvite,
      role: "MEMBER",
    },
  });

  await mongo.activity.create({
    data: {
      workspaceId,
      actorId: userId,
      type: "MEMBER_INVITED",
      metadata: { invitedUserId: userIdToInvite },
    },
  });

  return membership;
}