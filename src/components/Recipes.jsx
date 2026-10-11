import { useEffect, useState } from "react";
import { getRecipes } from "../api/recipeApi";
import "../Styling/Recipe.css";


function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes()
      .then(data => {
        setRecipes(data);
      })
      .catch(error => {
        console.error("Failed to fetch recipes:", error);
      });
  }, []);

  return (
    <div>
      {recipes.map(recipe => (
        <div key={recipe.id}>
          <div class="recipe-card">
            <button class="recipe-star" aria-label="Star recipe">★</button>

            <div class="recipe-image">
          </div>

          <div class="recipe-content">
            <span class="recipe-category">{recipe.meal_type} • {recipe.difficulty} • {recipe.prep_time_min} min</span>
              <h3 class="recipe-title">{recipe.name}</h3>
            </div>
          </div>

          <h2>{recipe.name}</h2>
          <h3>{recipe.meal_type}</h3>
          <h3>{recipe.difficulty}</h3>
        </div>
      ))}
    </div>
  );
}


export default Recipes;