const USER_CACHE = new Map();

export const getUserById = async (userId) => {
  if (USER_CACHE.has(userId)) return USER_CACHE.get(userId);

  try {
    const res = await fetch(`http://localhost:9090/api/users/${userId}`);
    const data = await res.json();
    USER_CACHE.set(userId, data.name || `User #${userId}`);
    return data.name || `User #${userId}`;
  } catch {
    return `User #${userId}`;
  }
};
