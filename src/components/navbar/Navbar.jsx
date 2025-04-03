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
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchGames({ search: searchQuery }));
    setSearchQuery("");
  };

  const handleLogout = async () => {
    await signOut();
    dispatch(clearFavorites());
    navigate("/");
    setShowDropdown(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
              onChange={(e) => setSearchQuery(e.target.value)}
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
                  <Library size={16} />
                  <span className="nav-text">Library</span>
                </Link>
                <Link
                  to="/favorites"
                  className={`nav-btn nav-link ${
                    isActive("/favorites") ? "active" : ""
                  }`}
                >
                  <Heart size={16} />
                  <span className="nav-text">Favorites</span>
                </Link>
                <button
                  className="user-dropdown-btn"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <img
                    src={user.profileImageUrl}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              {showDropdown && (
                <div className="absolute">
                  <div className="dropdown-user-info">
                    <img
                      src={user.profileImageUrl}
                      alt="Profile"
                      className="dropdown-user-img"
                    />
                    <div className="dropdown-user-details">
                      <p className="dropdown-user-name">
                        {user.fullName || "User"}
                      </p>
                      <p className="dropdown-user-email">
                        {user.primaryEmailAddress?.emailAddress}
                      </p>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link to="/profile" className="dropdown-item">
                    <User size={16} />
                    Profile
                  </Link>
                  <Link to="/settings" className="dropdown-item">
                    <Settings size={16} />
                    Settings
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item dropdown-item-danger"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/sign-in" className="nav-btn">
                Sign In
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
