import { postgres } from "@/lib/db";
import { getAuthContext } from "@/lib/auth";

export async function requireUsername() {
  const { userId } = await getAuthContext();

  const user = await postgres.user.findUnique({
    where: { id: userId },
    select: { username: true },
  });

  if (!user || !user.username) {
    throw new Error("USERNAME_REQUIRED");
  }

  return user.username;
}