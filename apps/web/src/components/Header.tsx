import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-primary-600">MERN App</div>
        <ul className="flex gap-6">
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
          <li>
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-primary-600 transition"
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
