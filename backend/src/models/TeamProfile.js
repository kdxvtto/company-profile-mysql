import { pool } from "../config/database.js";

const TABLE = "team_profiles";
const UPDATABLE_FIELDS = new Set([
  "name",
  "position",
  "image",
  "facebook",
  "instagram",
]);

const TeamProfile = {
  async getAll({ page = 1, limit = 10 } = {}) {
    const safePage = Number.isFinite(Number(page)) ? Math.max(1, Number(page)) : 1;
    const safeLimit = Number.isFinite(Number(limit))
      ? Math.min(100, Math.max(1, Number(limit)))
      : 10;
    const offset = (safePage - 1) * safeLimit;

    const [rows] = await pool.query(
      `SELECT id AS _id, name, position, image, facebook, instagram, createdAt, updatedAt
       FROM ${TABLE}
       ORDER BY createdAt DESC
       LIMIT ? OFFSET ?`,
      [safeLimit, offset]
    );
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query(
      `SELECT id AS _id, name, position, image, facebook, instagram, createdAt, updatedAt
       FROM ${TABLE}
       WHERE id = ?`,
      [id]
    );
    return rows[0] ?? null;
  },

  async findByName(name) {
    const [rows] = await pool.query(
      `SELECT id AS _id, name, position, image, facebook, instagram, createdAt, updatedAt
       FROM ${TABLE}
       WHERE LOWER(name) = LOWER(?)`,
      [name]
    );
    return rows[0] ?? null;
  },

  async create(data) {
    const { name, position, image, facebook = null, instagram = null } = data;
    const [result] = await pool.query(
      `INSERT INTO ${TABLE} (name, position, image, facebook, instagram) VALUES (?, ?, ?, ?, ?)`,
      [name, position, image, facebook, instagram]
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

  async updateImage(id, image) {
    return this.update(id, { image });
  },

  async updateFacebook(id, facebook) {
    return this.update(id, { facebook });
  },

  async updateInstagram(id, instagram) {
    return this.update(id, { instagram });
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

export default TeamProfile;
