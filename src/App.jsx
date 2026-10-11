import './Styling/App.css'
import './Styling/General.css'
import favoritesIcon from './assets/Layout/Favorite-Layout.png'
import shoppingListIcon from './assets/Layout/Shopping-Cart-Layout.png'
import accountIcon from './assets/Layout/Account-Layout.png'
import Layout from './components/Layout'
import Recipes from './components/Recipes'

function App() {
  return (
    <Layout>
      
       {/* First part of the page with title and description */}

        <div className="first-part-section">
          <p className="general-h2">THE HOME COOK’S COMPANION</p>

          <h1 className="general-h1">Recipes worth cooking twice.</h1>

          <p className="general-h3">
            Ten hand-picked dishes with clear times, honest difficulty ratings and
            ingredients you can actually find. Star the ones you love and we will
            build your shopping list for the week.
          </p>
        </div>

        {/* Second part of the page with navigation buttons to different sections */}

      <div className="nav-buttons">
        <div className="nav-card">
          <img src={favoritesIcon} alt="Favorites Icon" className="logo-icon" />
          <p className="nav-title">
            Your favorites <span className="nav-arrow">→</span>
          </p>
          <p className="nav-desc">
            Every recipe you have starred, kept in one cozy place.
          </p>
        </div>

        <div className="nav-card">
          <img src={shoppingListIcon} alt="Shopping List Icon" className="logo-icon" />
          <p className="nav-title">
            Weekly shopping list <span className="nav-arrow">→</span>
          </p>
          <p className="nav-desc">
            Ingredients from your favorite recipes, ready for the shop.
          </p>
        </div>

        <div className="nav-card">
          <img src={accountIcon} alt="User Icon" className="logo-icon" />
          <p className="nav-title">
            Your account <span className="nav-arrow">→</span>
          </p>
          <p className="nav-desc">
            Your profile, cooking stats and kitchen preferences.
          </p>
        </div>
      </div>

      <Recipes />

    </Layout>
  )
}

export default App
