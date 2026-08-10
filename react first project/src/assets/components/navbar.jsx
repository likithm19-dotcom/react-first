import { Link, useNavigate } from "react-router-dom";
import "../../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="navbar-logo">
        Nawabs Restaurant
      </div>

      {/* Navigation Links */}
      <ul className="navbar-links">

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          <Link to="/contact">Contact Us</Link>
        </li>

        <li>
          <Link to="/menu">Menu</Link>
        </li>

        <li>
          <Link to="/reservation">Reservation</Link>
        </li>

        <li>
          <Link to="/myreservations">
            My Reservations
          </Link>
        </li>

        {!token ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <li>
            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        )}

      </ul>

    </nav>
  );
}

export default Navbar;