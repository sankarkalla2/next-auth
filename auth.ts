import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import authConfig from "./auth.config";
import db from "./lib/db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async jwt({ token, user, account, profile, session }) {
      // if (token.sub && session.user) {
      //   session.user.id = token.sub;
      // }

      console.log({ userToken: token });
      console.log({ userSession: session });
      return token;
    },
    async session({ session }) {
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
