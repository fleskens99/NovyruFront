import axios from "./axiosApi";

export const getRecipes = async () => {
  try {
    const response = await axios.get("/recipes");
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};