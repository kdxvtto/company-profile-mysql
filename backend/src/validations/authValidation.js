// Wrong before: import {email, z} from "zod"; registerSchemaValidation name mismatched with router
import { z } from "zod";

// Regex untuk email: hanya huruf, angka, titik, underscore, dan dash sebelum @
// Mencegah email dengan simbol aneh seperti !#$%^&*()
const safeEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const loginSchema = z.object({
  email: z
    .string()
    .email("Format email tidak valid")
    .regex(safeEmailRegex, "Email hanya boleh mengandung huruf, angka, titik, underscore, dan dash")
    .transform((val) => val.toLowerCase()),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(3, "Nama wajib diisi"),
});
