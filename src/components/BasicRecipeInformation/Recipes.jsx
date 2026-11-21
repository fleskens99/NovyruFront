
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { getRecipes } from "../../api/recipeApi";

import {
  getFavorites,
  getFavoriteRecipes,
  addFavorite,
  removeFavorite,
} from "../../api/favoriteRecipeApi";


import { getCurrentUser } from "../../api/helper/auth";
import RecipeCard from "./RecipeCard";

import "../../Styling/Recipe.css";

function Recipes({ onlyFavorites = false, emptyState = null }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [recipes, setRecipes] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [busyIds, setBusyIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favoritesLoadError, setFavoritesLoadError] = useState(false);

  // Load recipes and the logged-in user's favorites.

useEffect(() => {
  let active = true;

  async function loadRecipes() {
    setLoading(true);
    setError("");
    setFavoritesLoadError(false);

    try {
      const user = getCurrentUser();

      if (onlyFavorites) {
        // Favorites page: load complete recipes
        // directly from your MySQL database.
        if (!user) {
          if (active) {
            setRecipes([]);
            setFavoriteIds([]);
          }
          return;
        }

        const savedRecipes = await getFavoriteRecipes(
          user.id
        );

        if (!active) return;

        setRecipes(savedRecipes);

        setFavoriteIds(
          savedRecipes.map((recipe) => Number(recipe.id))
        );
      } else {
        // Homepage: load recipes from external API.
        const recipeData = await getRecipes();

        if (!active) return;

        setRecipes(recipeData);

        // Load the logged-in user's saved IDs
        // to display the correct filled stars.
        if (user) {
          try {
            const savedIds = await getFavorites(user.id);

            if (active) {
              setFavoriteIds(savedIds.map(Number));
            }
          } catch (err) {
            console.error(
              "Failed to load favorite IDs:",
              err
            );

            if (active) {
              setFavoritesLoadError(true);
            }
          }
        } else {
          setFavoriteIds([]);
        }
      }
    } catch (err) {
      console.error("Failed to load recipes:", err);

      if (active) {
        setError(
          onlyFavorites
            ? "Could not load saved favorites."
            : "Could not load recipes."
        );
      }
    } finally {
      if (active) {
        setLoading(false);
      }
    }
  }

  loadRecipes();

  return () => {
    active = false;
  };
}, [onlyFavorites]);


  // Add or remove a favorite.
  async function toggleFavorite(recipeId) {
    const user = getCurrentUser();

    // Ask the user to log in before saving favorites.
    if (!user) {
      navigate("/login", {
        state: {
          message: "Please log in to save your favorite recipes.",
          from: location.pathname,
        },
      });
      return;
    }

    if (busyIds.includes(recipeId) || favoritesLoadError) {
      return;
    }

    const isFavorite = favoriteIds.includes(recipeId);

    setBusyIds((current) => [...current, recipeId]);
    setError("");

    try {
      
    if (isFavorite) {
      await removeFavorite(user.id, recipeId);

      setFavoriteIds((current) =>
        current.filter((id) => id !== recipeId)
      );

      if (onlyFavorites) {
        setRecipes((current) =>
          current.filter(
            (recipe) => Number(recipe.id) !== recipeId
          )
        );
      }
      } else {
        await addFavorite(user.id, recipeId);

        setFavoriteIds((current) =>
          current.includes(recipeId)
            ? current
            : [...current, recipeId]
        );
      }
    } catch (err) {
      console.error("Failed to update favorite:", err);

      setError(
        "Could not update this favorite. Please try again."
      );
    } finally {
      setBusyIds((current) =>
        current.filter((id) => id !== recipeId)
      );
    }
  }

  if (loading) {
    return (
      <div className="recipe-message" role="status">
        Loading recipes...
      </div>
    );
  }

  if (error && recipes.length === 0) {
    return (
      <div className="recipe-message" role="alert">
        {error}
      </div>
    );
  }

  if (onlyFavorites && favoritesLoadError) {
    return (
      <div className="recipe-message" role="alert">
        Could not load your favorites. Please try again.
      </div>
    );
  }

  const visibleRecipes = recipes;

  const selectedRecipe = recipes.find(
    (recipe) => Number(recipe.id) === selectedRecipeId
  );

  return (
    <>
      {error && (
        <p className="recipe-error" role="alert">
          {error}
        </p>
      )}

      {favoritesLoadError && (
        <p className="recipe-error" role="alert">
          Could not load your saved favorites.
          Please refresh the page to try again.
        </p>
      )}

      {visibleRecipes.length === 0 ? (
        onlyFavorites ? (
          emptyState
        ) : (
          <div className="recipe-message">
            No recipes found.
          </div>
        )
      ) : (
        <section
          className="recipe-grid"
          aria-label={
            onlyFavorites ? "Favorite recipes" : "Recipes"
          }
        >
          {visibleRecipes.map((recipe) => {
            const recipeId = Number(recipe.id);
            const favorited = favoriteIds.includes(recipeId);

            return (
              <article
                className="recipe-card"
                key={recipe.id}
                onClick={() => setSelectedRecipeId(recipeId)}
              >
                <button
                  type="button"
                  className={`recipe-star${
                    favorited ? " recipe-star--active" : ""
                  }`}
                  aria-label={`${
                    favorited ? "Remove" : "Add"
                  } ${recipe.name} ${
                    favorited ? "from" : "to"
                  } favorites`}
                  aria-pressed={favorited}
                  disabled={
                    busyIds.includes(recipeId) ||
                    favoritesLoadError
                  }
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleFavorite(recipeId);
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    aria-hidden="true"
                  >
                    <path d="m12 2.8 2.87 5.81 6.41.93-4.64 4.52 1.1 6.38L12 17.43l-5.74 3.01 1.1-6.38L2.72 9.54l6.41-.93L12 2.8Z" />
                  </svg>
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
                    {recipe.prep_time} min
                  </span>

                  <h3 className="recipe-title">
                    {recipe.name}
                  </h3>
                </div>
              </article>
            );
          })}
        </section>
      )}

      {selectedRecipe && (
        <RecipeCard
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipeId(null)}
        />
      )}
    </>
  );
}

export default Recipes;
