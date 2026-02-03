import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { postgres } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "database",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "google") return false;

      const existingUser = await postgres.user.findUnique({
        where: {
          provider_providerAccountId: {
            provider: "google",
            providerAccountId: account.providerAccountId,
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
            providerAccountId: account.providerAccountId,
          },
        });
      }

      return true;
    },

    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};