
import * as z from "zod";

export const resetSchema = z.object({
  email: z.string().email({
    message: 'email is required'
  }),
});