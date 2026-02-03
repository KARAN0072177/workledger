import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">
          Hello {session?.user?.email}
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          (Temporary page for auth testing)
        </p>
      </div>
    </main>
  );
}