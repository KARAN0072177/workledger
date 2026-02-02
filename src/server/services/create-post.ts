import { mongo } from "@/lib/db";
import { requirePermission } from "@/lib/rbac/require-permission";

export async function createPost(
  workspaceId: string,
  content: string
) {
  const { userId } = await requirePermission(
    workspaceId,
    "post:create"
  );

  const post = await mongo.post.create({
    data: {
      workspaceId,
      authorId: userId,
      content,
    },
  });

  await mongo.activity.create({
    data: {
      workspaceId,
      actorId: userId,
      type: "POST_CREATED",
      metadata: { postId: post.id },
    },
  });

  return post;
}