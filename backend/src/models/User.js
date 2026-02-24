import bcrypt from "bcryptjs";
import pool from "../config/database.js";

const TABLE = "users";
const UPDATABLE_FIELDS = new Set([
  "name",
  "email",
  "role",
  "password",
]);

const SAFE_SELECT = "id AS _id, name, email, role, createdAt, updatedAt";
const INTERNAL_SELECT =
  "id AS _id, name, email, role, password, refreshTokenHash, lastLogoutAt, lastLoginAt, lastRefreshAt, createdAt, updatedAt";
const AUTH_SELECT =
  "id AS _id, name, email, role, refreshTokenHash, lastLogoutAt, lastLoginAt, lastRefreshAt, createdAt, updatedAt";
const AUTH_VERIFY_SELECT = "id AS _id, role, lastLogoutAt";

const normalizeEmail = (email) =>
  typeof email === "string" ? email.trim().toLowerCase() : email;

const normalizeRole = (role) =>
  typeof role === "string" ? role.trim().toLowerCase() : role;

const validateRole = (role) => {
  const normalized = normalizeRole(role);
  if (!normalized) return "staff";
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

  async getByIdWithRefreshTokenHash(id) {
    const [rows] = await pool.query(
      `SELECT ${AUTH_SELECT} FROM ${TABLE} WHERE id = ?`,
      [id],
    );
    return rows[0] ?? null;
  },

  async getByIdForAuth(id) {
    const [rows] = await pool.query(
      `SELECT ${AUTH_VERIFY_SELECT} FROM ${TABLE} WHERE id = ?`,
      [id],
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
    const [result] = await pool.query(
      `INSERT INTO ${TABLE} (name, email, role, password) VALUES (?, ?, ?, ?)`,
      [name, email, role, hashedPassword],
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

  async updateRefreshTokenHash(id, refreshTokenHash) {
    const [result] = await pool.query(
      `UPDATE ${TABLE} SET refreshTokenHash = ? WHERE id = ?`,
      [refreshTokenHash, id],
    );
    return result.affectedRows;
  },

  async clearRefreshTokenHashById(id) {
    const [result] = await pool.query(
      `UPDATE ${TABLE} SET refreshTokenHash = NULL WHERE id = ?`,
      [id],
    );
    return result.affectedRows;
  },

  async setLastLogoutAt(id, lastLogoutAt = new Date()) {
    const [result] = await pool.query(
      `UPDATE ${TABLE} SET lastLogoutAt = ? WHERE id = ?`,
      [lastLogoutAt, id],
    );
    return result.affectedRows;
  },

  async setLastLoginAt(id, lastLoginAt = new Date()) {
    const [result] = await pool.query(
      `UPDATE ${TABLE} SET lastLoginAt = ? WHERE id = ?`,
      [lastLoginAt, id],
    );
    return result.affectedRows;
  },

  async setLastRefreshAt(id, lastRefreshAt = new Date()) {
    const [result] = await pool.query(
      `UPDATE ${TABLE} SET lastRefreshAt = ? WHERE id = ?`,
      [lastRefreshAt, id],
    );
    return result.affectedRows;
  },

  async count() {
    const [rows] = await pool.query(`SELECT COUNT(*) as total FROM ${TABLE}`);
    return rows[0]?.total ?? 0;
  },

  async countByRole(role) {
    const normalized = normalizeRole(role);
    if (!normalized) return 0;
    const [rows] = await pool.query(
      `SELECT COUNT(*) as total FROM ${TABLE} WHERE role = ?`,
      [normalized],
    );
    return rows[0]?.total ?? 0;
  },

  async deleteById(id) {
    const existing = await this.getById(id);
    if (!existing) return null;

    await pool.query(`DELETE FROM ${TABLE} WHERE id = ?`, [id]);
    return existing;
  },

  async deleteByEmail(email) {
    const [result] = await pool.query(
      `DELETE FROM ${TABLE} WHERE email = ?`,
      [normalizeEmail(email)],
    );
    return result.affectedRows;
  },
};

export default User;
