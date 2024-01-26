import * as z from "zod";

export const registerSchema = z.object({
  email: z.string().email({
    message: "Email required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(5, {
    message: "Name is required",
  }),
});
