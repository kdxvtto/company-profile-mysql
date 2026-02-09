import pool from "../config/database.js";

const TABLE = "services";
const UPDATABLE_FIELDS = new Set(["title", "content", "image", "category"]);

const Services = {
  async getAll() {
    const [rows] = await pool.query(
      `SELECT id AS _id, title, content, image, category, createdAt, updatedAt
       FROM ${TABLE}
       ORDER BY createdAt DESC`
    );
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query(
      `SELECT id AS _id, title, content, image, category, createdAt, updatedAt
       FROM ${TABLE}
       WHERE id = ?`,
      [id]
    );
    return rows[0] ?? null;
  },

  async create(data) {
    const { title, content, image } = data;
    const category = data.category || "Kredit";

    const [result] = await pool.query(
      `INSERT INTO ${TABLE} (title, content, image, category) VALUES (?, ?, ?, ?)`,
      [title, content, image, category]
    );

    return this.getById(result.insertId);
  },

  async update(id, data = {}) {
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(data)) {
      if (!UPDATABLE_FIELDS.has(key) || value === undefined) continue;
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

  async count() {
    const [rows] = await pool.query(`SELECT COUNT(*) as total FROM ${TABLE}`);
    return rows[0]?.total ?? 0;
  },
};

export default Services;
