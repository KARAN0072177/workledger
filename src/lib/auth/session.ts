import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";

export async function getAuthContext() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("UNAUTHENTICATED");
  }

  return {
    userId: session.user.id,
  };
}