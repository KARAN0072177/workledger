import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { postgres } from "@/lib/db/postgres";

export const authOptions: NextAuthOptions = {
  // 🔑 FIX: use JWT sessions (no adapter required)
  session: {
    strategy: "jwt",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google") return false;

      const existingUser = await postgres.user.findUnique({
        where: {
          provider_providerAccountId: {
            provider: "google",
            providerAccountId: account.providerAccountId!,
          },
        },
      });

      if (!existingUser) {
        await postgres.user.create({
          data: {
            email: user.email!,
            name: user.name,
            avatar: user.image,
            provider: "google",
            providerAccountId: account.providerAccountId!,
          },
        });
      }

      return true;
    },

    async jwt({ token, account }) {
      // First login only
      if (account) {
        token.provider = account.provider;
        token.providerAccountId = account.providerAccountId;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};