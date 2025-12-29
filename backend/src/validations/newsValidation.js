import { z } from "zod";

const newsSchema = z.object({
    title: z.string().min(3, "Judul wajib diisi"),
    content: z.string().min(3, "Isi wajib diisi"),
    image: z.string().min(3, "Gambar wajib diisi").optional(),
    category: z.enum(["Berita", "Pengumuman", "Promosi"]).optional(),
});

export const createNewsSchema = newsSchema;
export const updateNewsSchema = newsSchema.partial();
