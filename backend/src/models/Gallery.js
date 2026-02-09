import pool from "../config/database.js";
import { parseJsonArray, stringifyJsonArray } from "../utils/json.js";

const TABLE = "gallery";
const UPDATABLE_FIELDS = new Set(["title", "content", "image"]);

const mapRow = (row) => {
  if (!row) return null;
  return {
    ...row,
    image: parseJsonArray(row.image),
  };
};

const Gallery = {
  async getAll({ page = 1, limit = 10 } = {}) {
    const safePage = Number.isFinite(Number(page)) ? Math.max(1, Number(page)) : 1;
    const safeLimit = Number.isFinite(Number(limit))
      ? Math.min(100, Math.max(1, Number(limit)))
      : 10;
    const offset = (safePage - 1) * safeLimit;

    const [rows] = await pool.query(
      `SELECT id AS _id, title, content, image, createdAt, updatedAt
       FROM ${TABLE}
       ORDER BY createdAt DESC
       LIMIT ? OFFSET ?`,
      [safeLimit, offset]
    );

    return rows.map(mapRow);
  },

  async count() {
    const [rows] = await pool.query(`SELECT COUNT(*) as total FROM ${TABLE}`);
    return rows[0]?.total ?? 0;
  },

  async getById(id) {
    const [rows] = await pool.query(
      `SELECT id AS _id, title, content, image, createdAt, updatedAt
       FROM ${TABLE}
       WHERE id = ?`,
      [id]
    );
    return mapRow(rows[0]);
  },

  async create(data) {
    const { title, content } = data;
    const image = stringifyJsonArray(data.image);

    const [result] = await pool.query(
      `INSERT INTO ${TABLE} (title, content, image) VALUES (?, ?, ?)`,
      [title, content, image]
    );

    return this.getById(result.insertId);
  },

  async update(id, data = {}) {
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(data)) {
      if (!UPDATABLE_FIELDS.has(key) || value === undefined) continue;

      if (key === "image") {
        fields.push("image = ?");
        values.push(stringifyJsonArray(value));
        continue;
      }

      fields.push(`\`${key}\` = ?`);
      values.push(value);
    }

    if (fields.length === 0) return this.getById(id);

    values.push(id);
    await pool.query(
      `UPDATE ${TABLE} SET ${fields.join(", ")} WHERE id = ?`,
      values
    );

    return this.getById(id);
  },

  async deleteById(id) {
    const existing = await this.getById(id);
    if (!existing) return null;

    await pool.query(`DELETE FROM ${TABLE} WHERE id = ?`, [id]);
    return existing;
  },

  async search(q, limit = 5) {
    const term = `%${q}%`;
    const safeLimit = Number.isFinite(Number(limit))
      ? Math.min(20, Math.max(1, Number(limit)))
      : 5;

    const [rows] = await pool.query(
      `SELECT id AS _id, title, content, image, createdAt
       FROM ${TABLE}
       WHERE title LIKE ? OR content LIKE ?
       ORDER BY createdAt DESC
       LIMIT ?`,
      [term, term, safeLimit]
    );
    return rows.map(mapRow);
  },
};

export default Gallery;
