import pool from "../config/database.js";

const TABLE = "activity_logs";

const ActivityLog = {
  async create({ action, resource, resourceName, resourceId, userId, userName }) {
    const [result] = await pool.query(
      `INSERT INTO ${TABLE} (action, resource, resourceName, resourceId, userId, userName)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [action, resource, resourceName, resourceId, userId, userName]
    );

    const [rows] = await pool.query(
      `SELECT id AS _id, action, resource, resourceName, resourceId, userId, userName, createdAt, updatedAt
       FROM ${TABLE}
       WHERE id = ?`,
      [result.insertId]
    );
    return rows[0] ?? null;
  },

  async getAll({ limit = 10 } = {}) {
    const safeLimit = Number.isFinite(Number(limit))
      ? Math.min(100, Math.max(1, Number(limit)))
      : 10;

    const [rows] = await pool.query(
      `SELECT id AS _id, action, resource, resourceName, resourceId, userId, userName, createdAt, updatedAt
       FROM ${TABLE}
       ORDER BY createdAt DESC
       LIMIT ?`,
      [safeLimit]
    );
    return rows;
  },
};

export default ActivityLog;
