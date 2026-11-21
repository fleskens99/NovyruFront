import api from "./axiosApi";

// Reuse the recipe request when switching between Home and Favorites.
let recipesPromise;

export function getRecipes() {
  if (!recipesPromise) {
    recipesPromise = api.get('/recipes').then(({ data }) => {
      const recipes = Array.isArray(data) ? data : data?.data;
      if (!Array.isArray(recipes)) throw new Error('Invalid recipe response');
      return recipes;
    }).catch((error) => {
      recipesPromise = null; // A failed request can be retried next time.
      throw error;
    });
  }
  return recipesPromise;
}
  