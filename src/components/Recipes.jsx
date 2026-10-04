import { useEffect, useState } from "react";
import { getRecipes } from "../api/recipeApi";

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
          <h2>{recipe.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default Recipes;