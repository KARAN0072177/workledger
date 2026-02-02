import { postgres, mongo } from "@/lib/db";
import { getAuthContext } from "@/lib/auth";

export async function createWorkspace(name: string) {
  const { userId } = await getAuthContext();

  const workspace = await postgres.workspace.create({
    data: {
      name,
      members: {
        create: {
          userId,
          role: "OWNER",
        },
      },
    },
  });

  await mongo.activity.create({
    data: {
      workspaceId: workspace.id,
      actorId: userId,
      type: "WORKSPACE_CREATED",
      metadata: { name },
    },
  });

  return workspace;
}