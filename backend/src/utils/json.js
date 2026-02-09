export const parseJsonArray = (value) => {
  if (value == null) return [];
  if (Array.isArray(value)) return value;
  if (typeof value !== "string") return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const stringifyJsonArray = (value) => {
  if (value == null) return JSON.stringify([]);
  if (Array.isArray(value)) return JSON.stringify(value);
  return JSON.stringify([value]);
};

