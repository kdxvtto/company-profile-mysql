export const parseId = (value) => {
  const id = Number.parseInt(String(value), 10);
  if (!Number.isFinite(id) || id <= 0) return null;
  return id;
};

