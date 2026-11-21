import api from "./axiosApi.js";

export async function getFavorites(userId) {
  const response = await api.get(
    `/users/${userId}/favorites`
  );

  return response.data;
}

export async function getFavoriteRecipes(userId) {
  const response = await api.get(
    `/users/${userId}/favorites/recipes`
  );

  return response.data;
}



export async function addFavorite(userId, recipeId) {
  const id = Number(recipeId);

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error(`Invalid recipe ID: ${recipeId}`);
  }

  try {
    const response = await api.post(
      `/users/${userId}/favorites`,
      {
        recipeId: id,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Favorite API error:", {
      status: error.response?.status,
      data: error.response?.data,
      recipeId: id,
    });

    throw error;
  }
}


export async function removeFavorite(userId, recipeId) {
  await api.delete(
    `/users/${userId}/favorites/${recipeId}`
  );
}

export async function checkFavorite(userId, recipeId) {
  const response = await api.get(
    `/users/${userId}/favorites/${recipeId}/status`
  );

  return response.data.favorite;
}
