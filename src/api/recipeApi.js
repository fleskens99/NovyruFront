export async function getRecipes() {
  const response = await fetch("http://localhost:8080/api/recipes");

  if (!response.ok) {
    const error = new Error(
      `Failed to fetch recipes: HTTP ${response.status}`
    );

    error.status = response.status;
    throw error;
  }

  const result = await response.json();

  const recipes = Array.isArray(result)
    ? result
    : result?.data;

  if (!Array.isArray(recipes)) {
    throw new Error("Invalid recipe response");
  }

  return recipes;
}
