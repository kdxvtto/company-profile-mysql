import app from "./app.js";
import { pool } from "./config/database.js";

const PORT = process.env.PORT || 3000;

console.log("Environment:", process.env.NODE_ENV);
console.log("Port:", PORT);
console.log("MySQL DB:", process.env.DB_NAME || "company");

// Start server first (for healthcheck), then ping DB
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);

    pool.query("SELECT 1")
        .then(() => console.log("Connected to MySQL"))
        .catch((err) => {
            console.error("Failed to connect to MySQL:", err.message);
        });
});
