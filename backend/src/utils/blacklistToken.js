import jwt from "jsonwebtoken";

const blacklistedTokens = new Map();

// In-memory blacklist with TTL based on the token's exp claim.
export const blacklistToken = (token) => {
  if (!token) return;

  const decoded = jwt.decode(token);
  const expiresAt = decoded?.exp
    ? decoded.exp * 1000
    : Date.now() + 60 * 60 * 1000; // default 1h if no exp
  const ttl = Math.max(expiresAt - Date.now(), 0);

  const existingTimer = blacklistedTokens.get(token);
  if (existingTimer) {
    clearTimeout(existingTimer);
  }

  const timer = setTimeout(() => {
    blacklistedTokens.delete(token);
  }, ttl);

  blacklistedTokens.set(token, timer);
};

export const isBlacklisted = (token) => blacklistedTokens.has(token);
