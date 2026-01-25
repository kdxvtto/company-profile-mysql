import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.local";
dotenv.config({ path: path.resolve(__dirname, `../${envFile}`) });

const PORT = process.env.PORT || 3000;
const MONGOURI = process.env.MONGOURI || "mongodb://127.0.0.1:27017/company";

console.log("Environment:", process.env.NODE_ENV);
console.log("Port:", PORT);
console.log("MongoDB URI exists:", !!process.env.MONGOURI);

// Start server first (for healthcheck)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

// Then connect to MongoDB
mongoose.connect(MONGOURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
  });
