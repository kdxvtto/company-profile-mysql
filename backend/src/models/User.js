import bcrypt from "bcryptjs";
import pool from "../config/database.js";

const TABLE = "users";
const UPDATABLE_FIELDS = new Set([
  "name",
  "email",
  "role",
  "password",
  "refreshToken",
]);

const SAFE_SELECT = "id AS _id, name, email, role, createdAt, updatedAt";
const INTERNAL_SELECT =
  "id AS _id, name, email, role, password, refreshToken, createdAt, updatedAt";

const normalizeEmail = (email) =>
  typeof email === "string" ? email.trim().toLowerCase() : email;

const normalizeRole = (role) =>
  typeof role === "string" ? role.trim().toLowerCase() : role;

const validateRole = (role) => {
  const normalized = normalizeRole(role);
  if (!normalized) return "admin";
  if (normalized !== "admin" && normalized !== "staff") {
    throw new Error("Role tidak valid");
  }
  return normalized;
};

const hashPassword = async (password) => {
  const saltRounds = Number.parseInt(process.env.SALT_ROUND, 10) || 10;
  return bcrypt.hash(password, saltRounds);
};

const User = {
  async getAll() {
    const [rows] = await pool.query(
      `SELECT ${SAFE_SELECT} FROM ${TABLE} ORDER BY createdAt DESC`,
    );
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query(
      `SELECT ${SAFE_SELECT} FROM ${TABLE} WHERE id = ?`,
      [id],
    );
    return rows[0] ?? null;
  },

  async getByIdWithPassword(id) {
    const [rows] = await pool.query(
      `SELECT ${INTERNAL_SELECT} FROM ${TABLE} WHERE id = ?`,
      [id],
    );
    return rows[0] ?? null;
  },

  async findByEmail(email) {
    const [rows] = await pool.query(
      `SELECT ${INTERNAL_SELECT} FROM ${TABLE} WHERE email = ?`,
      [normalizeEmail(email)],
    );
    return rows[0] ?? null;
  },

  async findByName(name) {
    const [rows] = await pool.query(
      `SELECT ${SAFE_SELECT} FROM ${TABLE} WHERE name = ?`,
      [name],
    );
    return rows[0] ?? null;
  },

  async findByRefreshToken(refreshToken) {
    const [rows] = await pool.query(
      `SELECT ${SAFE_SELECT} FROM ${TABLE} WHERE refreshToken = ?`,
      [refreshToken],
    );
    return rows[0] ?? null;
  },

  async create(data) {
    const { name, password } = data;
    const email = normalizeEmail(data.email);
    const role = validateRole(data.role);

    if (!password || password.length < 6) {
      throw new Error("Password minimal 6 karakter");
    }

    const hashedPassword = await hashPassword(password);
    const refreshToken = data.refreshToken ?? null;

    const [result] = await pool.query(
      `INSERT INTO ${TABLE} (name, email, role, password, refreshToken) VALUES (?, ?, ?, ?, ?)`,
      [name, email, role, hashedPassword, refreshToken],
    );

    return this.getById(result.insertId);
  },

  async update(id, data = {}) {
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(data)) {
      if (!UPDATABLE_FIELDS.has(key) || value === undefined) continue;

      if (key === "email") {
        fields.push("email = ?");
        values.push(normalizeEmail(value));
        continue;
      }

      if (key === "role") {
        fields.push("role = ?");
        values.push(validateRole(value));
        continue;
      }

      if (key === "password") {
        if (typeof value !== "string" || value.length < 6) {
          throw new Error("Password minimal 6 karakter");
        }
        fields.push("password = ?");
        values.push(await hashPassword(value));
        continue;
      }

      fields.push(`\`${key}\` = ?`);
      values.push(value);
    }

    if (fields.length === 0) return this.getById(id);

    values.push(id);
    await pool.query(
      `UPDATE ${TABLE} SET ${fields.join(", ")} WHERE id = ?`,
      values,
    );
    return this.getById(id);
  },

  async updateRefreshToken(id, refreshToken) {
    const [result] = await pool.query(
      `UPDATE ${TABLE} SET refreshToken = ? WHERE id = ?`,
      [refreshToken, id],
    );
    return result.affectedRows;
  },

  async clearRefreshTokenByToken(refreshToken) {
    const [result] = await pool.query(
      `UPDATE ${TABLE} SET refreshToken = NULL WHERE refreshToken = ?`,
      [refreshToken],
    );
    return result.affectedRows;
  },

  async count() {
    const [rows] = await pool.query(`SELECT COUNT(*) as total FROM ${TABLE}`);
    return rows[0]?.total ?? 0;
  },

  async deleteById(id) {
    const existing = await this.getById(id);
    if (!existing) return null;

    await pool.query(`DELETE FROM ${TABLE} WHERE id = ?`, [id]);
    return existing;
  },
};

export default User;
