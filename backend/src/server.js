import mongoose from "mongoose";
import express from "express";
import compression from "compression";
import { globalRateLimiter } from "./middlewares/rateLimiter.js";
import { corsMiddleware } from "./middlewares/cors.js";
import { helmetMiddleware } from "./middlewares/helmet.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
// Wrong before: dotenv.config() dipanggil sebelum import (ESM error), sekarang di bawah import.
// Also ensure .env is loaded from backend/.env even if process.cwd() bukan direktori backend.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.local";
dotenv.config({ path: path.resolve(__dirname, `../${envFile}`) });

import userRoutes from "./routes/userRouter.js";
import serviceRoutes from "./routes/serviceRouter.js";
import newsRoutes from "./routes/newsRouter.js";
import creditUserRoutes from "./routes/creditUserRouter.js";
import teamProfileRoutes from "./routes/teamProfileRouter.js";
import authRoutes from "./routes/authRouter.js";
import searchRoutes from "./routes/searchRouter.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

const app = express();

// Compression middleware for Gzip responses
app.use(compression());

app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(globalRateLimiter);

// Static files with cache headers
const cacheOptions = { maxAge: '7d', etag: true };
const uploadsDir = path.join(__dirname, "../public/uploads");
const laporanDir = path.join(__dirname, "../public/laporan");
const manualDir = path.join(__dirname, "../public/manual");
app.use("/uploads", express.static(uploadsDir, cacheOptions));
app.use("/laporan", express.static(laporanDir, cacheOptions));
app.use("/manual", express.static(manualDir, cacheOptions));

app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/credit-users", creditUserRoutes);
app.use("/api/team-profiles", teamProfileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/search", searchRoutes);

// Health check endpoint for Railway/Render
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const MONGOURI = process.env.MONGOURI || "mongodb://127.0.0.1:27017/company";

mongoose.connect(MONGOURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
  });

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
