import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-primary-600">MERN App</div>
        <ul className="flex gap-6 items-center">
          <li>
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-gray-700 hover:text-primary-600 transition"
            >
              About
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-primary-600 transition"
              >
                Dashboard
              </Link>
            </li>
          )}
          <li>
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700">
                  {user?.name || user?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded transition"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
