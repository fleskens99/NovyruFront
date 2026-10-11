
import { useEffect, useState } from "react";
import { getRecipes } from "../api/recipeApi";
import "../Styling/Recipe.css";

function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes()
      .then((data) => {
        setRecipes(data);
      })
      .catch((error) => {
        console.error("Failed to fetch recipes:", error);
      });
  }, []);

  return (
    <section className="recipe-grid">
      {recipes.map((recipe) => (
        <article className="recipe-card" key={recipe.id}>
          <button
            type="button"
            className="recipe-star"
            aria-label={`Favorite ${recipe.name}`}
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
  );
}

export default Recipes;
