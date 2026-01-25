/**
 * =========================================
 * USER PROFILE API TEST FILE
 * =========================================
 * 
 * File ini untuk testing endpoint yang butuh AUTHENTICATION
 * Contoh: GET /api/freyabpr/profile (harus login dulu)
 * 
 * PERBEDAAN DENGAN AUTH TEST:
 * - auth.test.js = test login/register (tanpa token)
 * - user.test.js = test endpoint yang butuh token
 * 
 * KONSEP PENTING:
 * 1. JWT Token - Bukti bahwa user sudah login
 * 2. Authorization Header - Cara kirim token ke server
 * 3. Protected Routes - Endpoint yang butuh autentikasi
 */

// ============ IMPORTS ============

import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import User from "../models/User.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env.local") });

const MONGOURI = process.env.MONGOURI || "mongodb://127.0.0.1:27017/company_test";

// ============ TEST SUITE ============

describe("User Profile API", () => {
    /**
     * Variable untuk menyimpan token
     * Karena kita perlu login dulu sebelum test endpoint lain
     */
    let token = null;

    // Connect ke database sekali di awal
    beforeAll(async () => {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(MONGOURI);
        }
    });

    // Tutup koneksi di akhir
    afterAll(async () => {
        await mongoose.connection.close();
    });

    /**
     * beforeEach - Jalankan sebelum SETIAP test
     * 
     * Di sini kita:
     * 1. Hapus test user (cleanup)
     * 2. Buat user baru
     * 3. Login untuk dapat token
     * 
     * Ini memastikan setiap test punya kondisi awal yang sama
     */
    beforeEach(async () => {
        // STEP 1: Cleanup - hapus user lama
        await User.deleteMany({ email: "test@mail.com" });

        // STEP 2: Buat user baru
        // Password akan di-hash otomatis oleh model
        await User.create({
            name: "Kevin Test",
            email: "test@mail.com",
            password: "password123"
        });

        // STEP 3: Login untuk dapat token
        const login = await request(app)
            .post("/api/freyabpr/login")
            .send({
                email: "test@mail.com",
                password: "password123"
            });

        // Simpan token untuk dipakai di test
        token = login.body.token;
    });

    // Cleanup setelah setiap test
    afterEach(async () => {
        await User.deleteMany({ email: "test@mail.com" });
    });

    // ============ TEST CASES ============

    /**
     * TEST 1: Akses Profile dengan Token Valid
     * 
     * Skenario:
     * 1. Sudah login di beforeEach (punya token)
     * 2. Kirim GET request dengan token di header
     * 3. Seharusnya dapat data profile
     * 
     * PENTING: Cara kirim token:
     * Authorization: Bearer <token>
     */
    it("should access profile with valid token", async () => {
        const res = await request(app)
            .get("/api/freyabpr/profile")
            // set() untuk menambahkan HTTP header
            // Format: "Bearer <token>" adalah standar JWT
            .set("Authorization", `Bearer ${token}`);

        // Dengan token valid, harus dapat akses
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });

    /**
     * TEST 2: Akses Profile Tanpa Token
     * 
     * Skenario:
     * - Tidak kirim Authorization header
     * - Server harus reject dengan 401
     * 
     * Ini test bahwa endpoint MEMANG protected
     */
    it("should fail without token", async () => {
        const res = await request(app)
            .get("/api/freyabpr/profile");
            // Tidak ada .set("Authorization", ...) = tanpa token

        // Tanpa token = Unauthorized
        expect(res.statusCode).toBe(401);
    });

    /**
     * TEST TAMBAHAN YANG BISA DIBUAT:
     * 
     * 1. Test dengan token invalid/expired
     *    it("should fail with invalid token", async () => {
     *        const res = await request(app)
     *            .get("/api/freyabpr/profile")
     *            .set("Authorization", "Bearer invalid_token_here");
     *        expect(res.statusCode).toBe(401);
     *    });
     * 
     * 2. Test update profile
     *    it("should update profile", async () => {
     *        const res = await request(app)
     *            .put("/api/freyabpr/profile")
     *            .set("Authorization", `Bearer ${token}`)
     *            .send({ name: "New Name" });
     *        expect(res.statusCode).toBe(200);
     *    });
     * 
     * 3. Test change password
     *    it("should change password", async () => { ... });
     */
});

/**
 * =========================================
 * FLOW AUTENTIKASI
 * =========================================
 * 
 *         CLIENT                          SERVER
 *           |                               |
 *           |--- POST /login ------------->|
 *           |    (email, password)         |
 *           |                               |
 *           |<-- 200 OK -------------------|
 *           |    (token)                   |
 *           |                               |
 *           |--- GET /profile ------------>|
 *           |    Header: Authorization:    |
 *           |    Bearer eyJhbGc...         |
 *           |                               |
 *           |<-- 200 OK -------------------|
 *           |    (user data)               |
 *           
 * =========================================
 * HTTP STATUS CODES
 * =========================================
 * 
 * 200 - OK (sukses)
 * 201 - Created (data baru dibuat)
 * 400 - Bad Request (request tidak valid)
 * 401 - Unauthorized (tidak ada/invalid token)
 * 403 - Forbidden (punya token tapi tidak boleh akses)
 * 404 - Not Found (resource tidak ditemukan)
 * 422 - Unprocessable Entity (validasi gagal)
 * 500 - Internal Server Error (error di server)
 */
