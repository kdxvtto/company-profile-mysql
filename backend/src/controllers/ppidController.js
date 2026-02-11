import nodemailer from "nodemailer";

/**
 * Kirim permohonan informasi PPID via email
 */
const submitPPID = async (req, res) => {
    try {
        const { nama, nomorIdentitas, informasiDiminta, tujuan, kontak } = req.body;

        // Buat transporter nodemailer
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Kirim email ke PPID
        await transporter.sendMail({
            from: `"PPID Bank Wonogiri" <${process.env.SMTP_USER}>`,
            to: process.env.PPID_EMAIL || "info@bankwonogiri.co.id",
            subject: `[PPID] Permohonan Informasi - ${nama}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: #e11d48; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
                        <h2 style="margin: 0;">📋 Permohonan Informasi Publik (PPID)</h2>
                    </div>
                    <div style="padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold; width: 40%; color: #374151;">Nama Pemohon</td>
                                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #4b5563;">${nama}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #374151;">Nomor Identitas</td>
                                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #4b5563;">${nomorIdentitas}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #374151;">Informasi yang Diminta</td>
                                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #4b5563;">${informasiDiminta}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #374151;">Tujuan Penggunaan</td>
                                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #4b5563;">${tujuan}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; font-weight: bold; color: #374151;">Kontak Pemohon</td>
                                <td style="padding: 10px 0; color: #4b5563;">${kontak}</td>
                            </tr>
                        </table>
                        <div style="margin-top: 20px; padding: 16px; background: #fef2f2; border-radius: 8px; color: #991b1b; font-size: 14px;">
                            <strong>⏱️ Catatan:</strong> PPID wajib memberikan tanggapan maksimal <strong>10 hari kerja</strong> sejak permohonan diterima. Perpanjangan maksimal <strong>7 hari kerja</strong> bila diperlukan.
                        </div>
                    </div>
                </div>
            `,
        });

        res.status(200).json({
            success: true,
            message: "Permohonan informasi berhasil dikirim. PPID akan memberikan tanggapan maksimal 10 hari kerja.",
        });
    } catch (error) {
        console.error("PPID email error:", error);
        res.status(500).json({
            success: false,
            message: "Gagal mengirim permohonan. Silakan coba lagi atau hubungi kami langsung.",
        });
    }
};

export { submitPPID };
