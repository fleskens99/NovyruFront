
import { useLocation } from "react-router-dom";
import Header from "./Header";

function Layout({ children }) {
  const location = useLocation();

  const hideHeader =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div>
      {!hideHeader && <Header />}

      <main>{children}</main>
    </div>
  );
}

export default Layout;
