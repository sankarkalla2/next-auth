
import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: 'email is required'
  }),
  password: z.string().min(1, {
    message: "Password required",
  }),
});
