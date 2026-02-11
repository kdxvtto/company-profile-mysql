import express from "express";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { globalRateLimiter } from "./middlewares/rateLimiter.js";
import { corsMiddleware } from "./middlewares/cors.js";
import { helmetMiddleware } from "./middlewares/helmet.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.local";
dotenv.config({ path: path.resolve(__dirname, `../${envFile}`) });

import userRoutes from "./routes/userRouter.js";
import serviceRoutes from "./routes/serviceRouter.js";
import newsRoutes from "./routes/newsRouter.js";
import teamProfileRoutes from "./routes/teamProfileRouter.js";
import authRoutes from "./routes/authRouter.js";
import searchRoutes from "./routes/searchRouter.js";
import publicationRoutes from "./routes/publicationRouter.js";
import galleryRoutes from "./routes/galleryRouter.js";  
import activityRoutes from "./routes/activityRouter.js";
import ppidRoutes from "./routes/ppidRouter.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";
import swaggerDocs from "./document/swagger.js";

const app = express();

// Trust proxy for Railway/Vercel/Render (behind reverse proxy)
app.set('trust proxy', 1);

// Compression middleware for Gzip responses
app.use(compression());

// Request logging (disable in test)
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Disable rate limiter in test
if (process.env.NODE_ENV !== 'test') {
    app.use(globalRateLimiter);
}

// Static files with cache headers
const cacheOptions = { maxAge: '7d', etag: true };
const uploadsDir = path.join(__dirname, "../public/uploads");
app.use("/uploads", express.static(uploadsDir, cacheOptions));

app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/team-profiles", teamProfileRoutes);
app.use("/api/freyabpr", authRoutes);
app.use("/api/baldurbpr", authRoutes); // Separate route for register (admin only)
app.use("/api/search", searchRoutes);
app.use("/api/publications", publicationRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/ppid", ppidRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Swagger API Documentation
swaggerDocs(app);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
