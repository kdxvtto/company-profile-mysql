import { z } from "zod";

const roleSchema = z.enum(["admin", "staff"]);

const userSchema = z.object({
  name: z.string().trim().min(3, "Nama wajib diisi"),
  email: z
    .string()
    .trim()
    .email("Format email tidak valid")
    .transform((val) => val.toLowerCase()),
  password: z.string().min(6, "Password minimal 6 karakter"),
  role: roleSchema.optional(),
});

export const createUserSchema = userSchema.extend({
  role: roleSchema.default("admin"),
});
export const updateUserSchema = userSchema.partial();
