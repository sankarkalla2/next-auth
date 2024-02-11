import * as z from "zod";

export const newPasswordSchema = z.object({
  newPassword: z.string().min(6, {
    message: "Field Required",
  }),
  confirmPassword: z.string().min(6, {
    message: "Field Required",
  }),
});
