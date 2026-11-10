import api from "./axiosApi"; 

export async function getRecipes() {
  try {
    const response = await api.get("/recipes");

    const result = response.data;

    const recipes = Array.isArray(result)
      ? result
      : result?.data;

    if (!Array.isArray(recipes)) {
      throw new Error("Invalid recipe response");
    }

    return recipes;

  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    throw error;
  }
}