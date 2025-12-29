// Wrong before: facebook/instagram diwajibkan dan nama field salah (photo), jadi payload normal ditolak.
import { z } from "zod";

const teamProfileSchema = z.object({
    name: z.string().min(3, "Nama tim wajib diisi"),
    position: z.string().min(3, "Posisi wajib diisi"),
    image: z.string().min(3, "Gambar wajib diisi").optional(),
    facebook: z.string().optional().refine((val) => !val || val === "" || /^https?:\/\//.test(val), {
        message: "Facebook harus berupa URL valid atau kosong"
    }),
    instagram: z.string().optional().refine((val) => !val || val === "" || /^https?:\/\//.test(val), {
        message: "Instagram harus berupa URL valid atau kosong"
    }),
});

export const createTeamProfileSchema = teamProfileSchema;
export const updateTeamProfileSchema = teamProfileSchema.partial();
