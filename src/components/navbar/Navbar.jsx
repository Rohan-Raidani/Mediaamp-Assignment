import {
  Search,
  GamepadIcon,
  ChevronDown,
  LogOut,
  Heart,
  Library,
  User,
  Home,
  Settings,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchGames } from "../../service/redux/gamesSlice";
import { clearFavorites } from "../../service/redux/favoritesSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";

import "./style.css";

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Handle search input change with debounce
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set a new timeout to delay the API call
    searchTimeoutRef.current = setTimeout(() => {
      if (value.trim()) {
        dispatch(fetchGames({ search: value }));
      }
    }, 2000);
  };

  // Form submission is still possible but optional
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(fetchGames({ search: searchQuery }));
    }
  };

  const handleLogout = async () => {
    await signOut();
    dispatch(clearFavorites());
    navigate("/");
  };

  // const handleClickOutside = (event) => {
  //   if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //     setShowDropdown(false);
  //   }
  // };

  useEffect(() => {
    // document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // document.removeEventListener("mousedown", handleClickOutside);
      // Clean up any pending timeouts
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo">
          <GamepadIcon className="logo-icon" />
          <span className="logo-text">GameVault</span>
        </Link>

        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span
            className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
          ></span>
        </button>

        <form
          onSubmit={handleSearch}
          className={`search-form ${isMobileMenuOpen ? "show-mobile" : ""}`}
        >
          <div className="search-container">
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={handleSearchChange} // Changed to new handler
              className="search-input"
            />
            <button type="submit" className="search-button">
              <Search className="search-icon" />
            </button>
          </div>
        </form>

        <div
          className={`navbar-actions ${isMobileMenuOpen ? "show-mobile" : ""}`}
        >
          {isSignedIn ? (
            <div className="relative" ref={dropdownRef}>
              <div className="navbar-user">
                <Link
                  to="/home"
                  className={`nav-btn nav-link ${
                    isActive("/home") ? "active" : ""
                  }`}
                >
                  <Home size={16} />
                  <span className="nav-text">Home</span>
                </Link>

                <Link
                  to="/library"
                  className={`nav-btn nav-link ${
                    isActive("/library") ? "active" : ""
                  }`}
                >
                  <Heart size={16} />
                  <span className="nav-text">Favorites/Bookmarks</span>
                </Link>
                <button
                  onClick={handleLogout}
                  // className="dropdown-item dropdown-item-danger"
                  className="nav-btn nav-link"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/sign-in" className="nav-btn">
                Log In
              </Link>
              <Link to="/sign-up" className="nav-btn nav-btn-primary">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
