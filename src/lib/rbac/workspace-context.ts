import { postgres } from "@/lib/db";
import { getAuthContext } from "@/lib/auth";

export async function resolveWorkspaceContext(workspaceId: string) {
  const { userId } = await getAuthContext();

  const membership = await postgres.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId,
        workspaceId,
      },
    },
    include: {
      workspace: true,
    },
  });

  if (!membership || membership.deletedAt) {
    throw new Error("FORBIDDEN");
  }

  if (membership.workspace.deletedAt) {
    throw new Error("WORKSPACE_DELETED");
  }

  return {
    userId,
    workspaceId,
    role: membership.role,
  };
}