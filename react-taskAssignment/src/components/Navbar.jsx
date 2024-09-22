import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle the mobile menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
    toggleMenu(); // Close the menu after navigation
  };

  return (
    <nav className="bg-zinc-800 py-4 px-5 md:px-10 shadow-md relative">
      <div className="flex justify-between items-center">
        {/* Logo or brand name */}
        <div className="text-2xl font-bold text-white">Task Assignment</div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Links for desktop view */}
        <ul className="hidden md:flex items-center gap-x-6">
          {isAuthenticated && user?.roleName === "Administrator" ? (
            <>
              <li className="text-white">Welcome, {user?.name}</li>
              <li>
                <button
                  onClick={() => handleNavigation("/users")}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-200"
                >
                  Users
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/tasks")}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-200"
                >
                  Tasks
                </button>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Logout
                </button>
              </li>
            </>
          ) : isAuthenticated &&
            (user?.roleName === "Supervisor" ||
              user?.roleName === "Employee") ? (
            <>
              <li className="text-white">Welcome, {user?.name}</li>
              <li>
                <button
                  onClick={() => handleNavigation("/tasks")}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-200"
                >
                  Tasks
                </button>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={() => handleNavigation("/login")}
                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-200"
              >
                Login
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <ul className="md:hidden mt-4 flex flex-col items-center gap-y-3 bg-zinc-700 p-4 rounded-lg shadow-lg w-full">
          {isAuthenticated && user?.roleName === "Administrator" ? (
            <>
              <li className="text-white mb-3 text-center">
                Welcome, {user?.name}
              </li>
              <li className="w-full">
                <button
                  onClick={() => handleNavigation("/users")}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-md w-full text-center hover:bg-indigo-600"
                >
                  Users
                </button>
              </li>
              <li className="w-full mt-2">
                <button
                  onClick={() => handleNavigation("/tasks")}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-md w-full text-center hover:bg-indigo-600"
                >
                  Tasks
                </button>
              </li>
              <li className="w-full mt-4">
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-md w-full text-center hover:bg-red-600"
                >
                  Logout
                </button>
              </li>
            </>
          ) : isAuthenticated &&
            (user?.roleName === "Supervisor" ||
              user?.roleName === "Employee") ? (
            <>
              <li className="text-white mb-3 text-center">
                Welcome, {user?.name}
              </li>
              <li className="w-full">
                <button
                  onClick={() => handleNavigation("/tasks")}
                  className="bg-indigo-500 text-white px-4 py-2 rounded-md w-full text-center hover:bg-indigo-600"
                >
                  Tasks
                </button>
              </li>
              <li className="w-full mt-4">
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-md w-full text-center hover:bg-red-600"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="w-full">
              <button
                onClick={() => handleNavigation("/login")}
                className="bg-indigo-500 text-white px-4 py-2 rounded-md w-full text-center hover:bg-indigo-600"
              >
                Login
              </button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
