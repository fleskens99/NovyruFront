
import "../../Styling/RecipeCard.css";

function RecipeCard({ recipe, onClose }) {
  return (
    <div className="card-overlay" onClick={onClose}>
      <div
        className="card-content"
        role="dialog"
        aria-modal="true"
        aria-label={recipe.name}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        {/* Recipe image */}
        {recipe.image_url && (
          <img
            className="card-hero"
            src={recipe.image_url}
            alt={recipe.name}
          />
        )}

        <div className="card-body">
          {/* Category */}
          <span className="card-category">
            {recipe.meal_type}
          </span>

          {/* Name and description */}
          <h2 className="card-title">{recipe.name}</h2>

          <p className="card-description">
            {recipe.description}
          </p>

          {/* Recipe information */}
          <div className="card-info">
            <div className="info-box">
              <span className="info-label">◷ PREP TIME</span>
              <span className="info-value">
                {recipe.prep_time} min
              </span>
            </div>

            <div className="info-box">
              <span className="info-label">◇ DIFFICULTY</span>
              <span className="info-value">
                {recipe.difficulty}
              </span>
            </div>

            <div className="info-box">
              <span className="info-label">♧ SERVINGS</span>
              <span className="info-value">
                {recipe.servings}
              </span>
            </div>

            <div className="info-box">
              <span className="info-label">♨ COOK TIME</span>
              <span className="info-value">
                {recipe.cook_time} min
              </span>
            </div>
          </div>

          {/* Ingredients and instructions */}
          <div className="card-details">

            <section className="ingredients-section">
              <h3>INGREDIENTS</h3>

              <ul className="ingredients-list">
                {recipe.ingredients?.map((ingredient, index) => (
                  <li key={ingredient.id ?? index}>
                    {String(ingredient.quantity ?? "")}{" "}
                    {String(ingredient.unit ?? "")}{" "}
                    {String(ingredient.name ?? "")}
                  </li>
                ))}
              </ul>
            </section>

            <section className="instructions-section">
              <h3>INSTRUCTIONS</h3>

              <ol className="instructions-list">
                {recipe.instructions?.map((step, index) => (
                  <li key={index}>
                    <span className="step-number">
                      {index + 1}
                    </span>
                    <span>
                      {typeof step === "string"
                        ? step
                        : JSON.stringify(step)}
                    </span>
                  </li>
                ))}
              </ol>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
