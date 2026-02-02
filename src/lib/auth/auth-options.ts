import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { postgres } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "database",
  },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        const user = await postgres.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || user.deletedAt) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};