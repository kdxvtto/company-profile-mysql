import { z } from "zod";

export const ppidSchema = z.object({
    nama: z.string().min(2, "Nama minimal 2 karakter").max(100, "Nama maksimal 100 karakter"),
    nomorIdentitas: z.string().min(5, "Nomor identitas minimal 5 karakter").max(30, "Nomor identitas maksimal 30 karakter"),
    informasiDiminta: z.string().min(10, "Informasi yang diminta minimal 10 karakter").max(1000, "Informasi yang diminta maksimal 1000 karakter"),
    tujuan: z.string().min(5, "Tujuan penggunaan minimal 5 karakter").max(500, "Tujuan penggunaan maksimal 500 karakter"),
    kontak: z.string().min(5, "Kontak minimal 5 karakter").max(100, "Kontak maksimal 100 karakter"),
});
