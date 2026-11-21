import { Link } from "react-router-dom";
import Recipes from "../components/BasicRecipeInformation/Recipes";
import "../Styling/Favorite.css";

export default function FavoritePage() {
  return (
    <div className="page-shell">
      <div className="page-container">
        <div className="eyebrow">
          <span aria-hidden="true">☆</span> KEPT CLOSE
        </div>

        <header className="page-header">
          <h1>Your favorites</h1>
          <p>
            The recipes you starred live here,
            saved to your account.
          </p>
        </header>

        <Recipes
          onlyFavorites
          emptyState={
            <section className="empty-state">
              <span
                className="empty-state__icon"
                aria-hidden="true"
              >
                ☆
              </span>

              <h2>No favorites yet</h2>

              <p>
                Browse the recipes and tap the star
                on any card to keep it here.
              </p>

              <Link className="primary-button" to="/">
                Browse recipes
              </Link>
            </section>
          }
        />
      </div>
    </div>
  );
}
