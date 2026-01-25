/**
 * =========================================
 * AUTH API TEST FILE
 * =========================================
 * 
 * File ini untuk testing endpoint authentication (login, register, dll)
 * 
 * KONSEP PENTING:
 * 1. Jest - Testing framework untuk JavaScript
 * 2. Supertest - Library untuk test HTTP requests
 * 3. describe() - Mengelompokkan test yang berhubungan
 * 4. it() - Satu test case individual
 * 5. expect() - Assertion untuk cek hasil
 * 
 * LIFECYCLE HOOKS:
 * - beforeAll() - Dijalankan SEKALI sebelum SEMUA test
 * - afterAll() - Dijalankan SEKALI setelah SEMUA test
 * - beforeEach() - Dijalankan SEBELUM setiap test
 * - afterEach() - Dijalankan SETELAH setiap test
 */

// ============ IMPORTS ============

// Supertest - untuk membuat HTTP request ke Express app
import request from "supertest";

// Import Express app (BUKAN server.js karena kita tidak mau start server)
import app from "../app.js";

// Mongoose - untuk connect dan manipulasi MongoDB
import mongoose from "mongoose";

// User model - untuk create/delete user di database
import User from "../models/User.js";

// Dotenv - untuk load environment variables (.env file)
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ============ SETUP ============

// __dirname tidak ada di ES Modules, jadi harus dibuat manual
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env.local file untuk mendapat MONGOURI, JWT_SECRET, dll
dotenv.config({ path: path.resolve(__dirname, "../../.env.local") });

// MongoDB URI - pakai dari .env atau fallback ke local
const MONGOURI = process.env.MONGOURI || "mongodb://127.0.0.1:27017/company_test";

// ============ TEST SUITE ============

/**
 * describe() mengelompokkan test yang berhubungan
 * Nama "Auth API" akan muncul di output test
 */
describe("Auth API", () => {

    /**
     * beforeAll() - Dijalankan SEKALI sebelum semua test dimulai
     * Gunakan untuk setup yang mahal (seperti koneksi database)
     */
    beforeAll(async () => {
        // Cek apakah sudah terkoneksi ke MongoDB
        // readyState: 0 = disconnected, 1 = connected
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(MONGOURI);
        }
    });

    /**
     * afterAll() - Dijalankan SEKALI setelah semua test selesai
     * Gunakan untuk cleanup (tutup koneksi, hapus temp files, dll)
     */
    afterAll(async () => {
        // Tutup koneksi MongoDB supaya Jest bisa exit
        await mongoose.connection.close();
    });

    /**
     * beforeEach() - Dijalankan SEBELUM setiap test
     * Gunakan untuk reset state supaya setiap test independent
     */
    beforeEach(async () => {
        // Hapus test user supaya setiap test mulai dengan kondisi bersih
        await User.deleteMany({ email: "test@mail.com" });
    });

    /**
     * afterEach() - Dijalankan SETELAH setiap test
     * Gunakan untuk cleanup setelah test
     */
    afterEach(async () => {
        // Hapus test user untuk cleanup
        await User.deleteMany({ email: "test@mail.com" });
    });

    // ============ TEST CASES ============

    /**
     * TEST 1: Login Sukses
     * 
     * Skenario:
     * 1. Buat user di database
     * 2. Kirim POST request ke /api/freyabpr/login
     * 3. Cek response status 200 dan ada token
     */
    it("should login successfully", async () => {
        // ARRANGE (Persiapan)
        // =====================
        // Buat user di database
        // PENTING: Jangan hash password manual!
        // User model punya pre-save hook yang otomatis hash password
        await User.create({
            name: "Kevin Test",
            email: "test@mail.com",
            password: "password123"  // Plain password - model akan hash
        });

        // ACT (Aksi)
        // =====================
        // Kirim POST request ke endpoint login
        const res = await request(app)
            .post("/api/freyabpr/login")     // HTTP method dan endpoint
            .send({                       // Request body (JSON)
                email: "test@mail.com",
                password: "password123"
            });

        // ASSERT (Verifikasi)
        // =====================
        // Cek apakah hasilnya sesuai ekspektasi
        expect(res.statusCode).toBe(200);          // Status harus 200 OK
        expect(res.body.success).toBe(true);       // success harus true
        expect(res.body.token).toBeDefined();      // token harus ada
    });

    /**
     * TEST 2: Login Gagal - Credentials Salah
     * 
     * Skenario: User tidak ada di database
     * Expected: Status 401 Unauthorized
     */
    it("should fail with 401 if credentials wrong", async () => {
        // Tidak perlu create user - kita test dengan email yang tidak ada
        const res = await request(app)
            .post("/api/freyabpr/login")
            .send({
                email: "nonexistent@mail.com",  // Email tidak terdaftar
                password: "wrongpassword123"    // Password 6+ chars (lolos validasi)
            });

        // 401 = Unauthorized - auth gagal setelah validasi lolos
        expect(res.statusCode).toBe(401);
    });

    /**
     * TEST 3: Login Gagal - Validasi Error
     * 
     * Skenario: Password terlalu pendek (kurang dari 6 karakter)
     * Expected: Status 422 Unprocessable Entity (validation error)
     */
    it("should fail with 422 if validation fails", async () => {
        const res = await request(app)
            .post("/api/freyabpr/login")
            .send({
                email: "wrong@mail.com",
                password: "123"  // Terlalu pendek! Minimal 6 karakter
            });

        // 422 = Validation error - request tidak valid
        expect(res.statusCode).toBe(422);
    });
});

/**
 * =========================================
 * TIPS TESTING
 * =========================================
 * 
 * 1. AAA Pattern: Arrange → Act → Assert
 *    - Arrange: Siapkan data dan kondisi
 *    - Act: Lakukan aksi yang di-test
 *    - Assert: Verifikasi hasilnya
 * 
 * 2. Test harus INDEPENDENT
 *    - Setiap test tidak boleh bergantung pada test lain
 *    - Gunakan beforeEach untuk reset state
 * 
 * 3. Test harus DETERMINISTIC
 *    - Hasil harus sama setiap kali di-run
 *    - Hindari random data atau timestamp
 * 
 * 4. Test EDGE CASES
 *    - Happy path (sukses)
 *    - Error cases (gagal)
 *    - Boundary cases (batas minimum/maximum)
 * 
 * 5. Run tests:
 *    npm test
 * 
 * 6. Run specific test file:
 *    npm test -- auth.test.js
 */
