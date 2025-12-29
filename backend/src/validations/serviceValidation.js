import { z } from "zod";

const servicesSchema = z.object({
    title: z.string().min(3, "Judul wajib diisi"),
    content: z.string().min(3, "Konten wajib diisi"),
    image: z.string().min(3, "Gambar wajib diisi").optional(),
    category: z.enum(["Kredit", "Tabungan", "Deposito"]).optional(),
});

export const createServicesSchema = servicesSchema;
export const updateServicesSchema = servicesSchema.partial();

