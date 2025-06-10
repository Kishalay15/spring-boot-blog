import axios from "axios";

const USER_CACHE = new Map();
export const API_BASE_URL = "http://localhost:9090/api";

export const getUserById = async (userId) => {
  if (USER_CACHE.has(userId)) return USER_CACHE.get(userId);

  try {
    const res = await fetch(`${API_BASE_URL}/users/${userId}`);
    const data = await res.json();
    USER_CACHE.set(userId, data.name || `User #${userId}`);
    return data.name || `User #${userId}`;
  } catch {
    return `User #${userId}`;
  }
};

export async function getCategoryById(categoryId) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.warn(`Failed to fetch category ${categoryId}`);
    return { categoryTitle: "Unknown" };
  }

  return await res.json();
}

export const fetchCategories = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_BASE_URL}/categories/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchPostsByUserId = async (userId) => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No token found");

  const response = await axios.get(`${API_BASE_URL}/user/${userId}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteComment = async (commentId) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE_URL}/comment/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to delete comment");
  }

  return true;
};

export const createComment = async ({ postId, userId, content }) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${API_BASE_URL}/users/${userId}/posts/${postId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create comment");
  }

  return await res.json();
};
