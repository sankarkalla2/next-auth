import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./schemas/form-schema";
import { getUserByEmail } from "./data/user-service";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFiels = loginSchema.safeParse(credentials);
        if (validatedFiels.success) {
          const { email, password } = validatedFiels.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            return null;
          }

          const passwordMath = await bcrypt.compare(password, user.password);
          if (passwordMath) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
