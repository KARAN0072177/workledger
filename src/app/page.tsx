"use client";

import { signIn } from "next-auth/react";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">
          WorkLedger
        </h1>

        <p className="mb-6 text-sm text-gray-600">
          Team workspace & activity tracking platform
        </p>

        <button
          onClick={() =>
            signIn("google", { callbackUrl: "/home" })
          }
          className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100"
        >
          Continue with Google
        </button>
      </div>
    </main>
  );
}