
import api from "./axios";

// Get all favorite recipe IDs
export const getFavorites = async (userId) => {
  const response = await api.get(`/users/${userId}/favorites`);
  return response.data;
};

// Add a recipe to favorites
export const addFavorite = async (userId, recipeId) => {
  await api.post(`/users/${userId}/favorites`, {
    recipeId: recipeId,
  });
};

// Remove a recipe from favorites
export const removeFavorite = async (userId, recipeId) => {
  await api.delete(`/users/${userId}/favorites/${recipeId}`);
};

// Check if a recipe is favorited
export const checkFavorite = async (userId, recipeId) => {
  const response = await api.get(
    `/users/${userId}/favorites/${recipeId}/status`
  );
  return response.data.favorite;
};
