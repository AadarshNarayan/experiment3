import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { cart } = useContext(CartContext);

  return (
    <header>
      <div className="logo">
        <img
          src="/image/logo.jpg"
          alt="TechFest Logo"
          style={{ width: 50, height: "auto", borderRadius: 4 }}
        />
        <h1>TechFest 2026</h1>
      </div>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/events">Events</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/gallery">Gallery</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <Link to="/cart" className="cart-link">
          🛒 Cart{cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </Link>
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
