
import { useEffect, useState } from "react";
import { getRecipes } from "../../api/recipeApi";
import RecipeCard from "./RecipeCard";
import "../../Styling/Recipe.css";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  // NEW: Error and loading states
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecipes()
      .then((data) => {
        setRecipes(data);
        setError(false);
      })
      .catch((error) => {
        // Developer sees the actual error
        console.error("Failed to fetch recipes:", error);
        console.error("HTTP status:", error.status ?? "Network error");

        // User sees a friendly error page
        setError(true);
        setRecipes([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // NEW: Show loading message
  if (loading) {
    return (
      <div className="recipe-message">
        <h2>Loading recipes...</h2>
      </div>
    );
  }

  // NEW: Show error page if something went wrong
  if (error) {
    return (
      <div className="recipe-message" role="alert">
        <h2>Oops! Something went wrong.</h2>
        <p>
          We couldn't load the recipes right now.
          Please try again later.
        </p>
      </div>
    );
  }

  // NEW: Handle an empty recipe list
  if (recipes.length === 0) {
    return (
      <div className="recipe-message">
        <h2>No recipes found</h2>
        <p>There are currently no recipes available.</p>
      </div>
    );
  }

  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId
  );

  return (
    <>
      <section className="recipe-grid">
        {recipes.map((recipe) => (
          <article
            className="recipe-card"
            key={recipe.id}
            onClick={() => setSelectedRecipeId(recipe.id)}
          >
            <button
              type="button"
              className="recipe-star"
              aria-label={`Favorite ${recipe.name}`}
              onClick={(e) => e.stopPropagation()}
            >
              ★
            </button>

            <div className="recipe-image">
              <img
                src={recipe.image_url}
                alt={recipe.name}
                loading="lazy"
              />
            </div>

            <div className="recipe-content">
              <span className="recipe-category">
                {recipe.meal_type} • {recipe.difficulty} •{" "}
                {recipe.prep_time_min} min
              </span>

              <h3 className="recipe-title">{recipe.name}</h3>
            </div>
          </article>
        ))}
      </section>

      {selectedRecipe && (
        <RecipeCard
          recipe={selectedRecipe}
          recipeId={selectedRecipeId}
          onClose={() => setSelectedRecipeId(null)}
        />
      )}
    </>
  );
}

export default Recipes;
