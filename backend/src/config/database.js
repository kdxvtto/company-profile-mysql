import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envFile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env.local";

// Load env from backend root (backend/.env.*)
dotenv.config({ path: path.resolve(__dirname, `../../${envFile}`) });

const poolConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "company",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

if (process.env.DB_PORT) {
  poolConfig.port = Number(process.env.DB_PORT);
}

export const pool = mysql.createPool(poolConfig);
export default pool;
