import { z } from "zod";

export const createPublicationSchema = z.object({
    name: z.string().min(3, "Nama wajib diisi minimal 3 karakter"),
    category: z.enum(["Laporan", "Manual Book"]).optional(),
});

export const updatePublicationSchema = z.object({
    name: z.string().min(3, "Nama wajib diisi minimal 3 karakter").optional(),
    category: z.enum(["Laporan", "Manual Book"]).optional(),
});