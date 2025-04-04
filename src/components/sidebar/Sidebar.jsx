import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../service/redux/filtersSlice";
import { fetchGames } from "../../service/redux/gamesSlice";
import { useState } from "react";
import {
  ChevronDown,
  Star,
  Calendar,
  Tag,
  Monitor,
  Award,
  Clock,
  Filter,
} from "lucide-react";
import "./Sidebar.css";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const [expandedSection, setExpandedSection] = useState("platforms");

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? "" : section);
  };

  const handlePlatformChange = (platformId) => {
    let updatedPlatforms = [...(filters.platforms || [])];

    if (updatedPlatforms.includes(platformId)) {
      updatedPlatforms = updatedPlatforms.filter((id) => id !== platformId);
    } else {
      updatedPlatforms.push(platformId);
    }

    const updatedFilters = { ...filters, platforms: updatedPlatforms };
    dispatch(setFilters(updatedFilters));
    dispatch(fetchGames({ page: 1, filters: updatedFilters }));
  };

  const handleSortChange = (value) => {
    const updatedFilters = { ...filters, ordering: value };
    dispatch(setFilters(updatedFilters));
    dispatch(fetchGames({ page: 1, filters: updatedFilters }));
  };

  const handleRatingChange = (value) => {
    const updatedFilters = { ...filters, metacritic: value };
    dispatch(setFilters(updatedFilters));
    dispatch(fetchGames({ page: 1, filters: updatedFilters }));
  };

  const clearAllFilters = () => {
    const clearedFilters = { ordering: "-rating" };
    dispatch(setFilters(clearedFilters));
    dispatch(fetchGames({ page: 1, filters: clearedFilters }));
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Filters</h2>
      </div>

      <div className="sidebar-content">
        <div className="sidebar-section">
          <button
            className="sidebar-section-header"
            onClick={() => toggleSection("platforms")}
          >
            <div className="sidebar-section-title-wrapper">
              <Monitor size={18} />
              <h3 className="sidebar-section-title">Platforms</h3>
            </div>
            <ChevronDown
              className={`sidebar-section-icon ${
                expandedSection === "platforms" ? "rotate" : ""
              }`}
            />
          </button>

          {expandedSection === "platforms" && (
            <div className="sidebar-section-content">
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={(filters.platforms || []).includes("1")}
                    onChange={() => handlePlatformChange("1")}
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  PC
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={(filters.platforms || []).includes("18")}
                    onChange={() => handlePlatformChange("18")}
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  PlayStation
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={(filters.platforms || []).includes("7")}
                    onChange={() => handlePlatformChange("7")}
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  Nintendo
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={(filters.platforms || []).includes("3")}
                    onChange={() => handlePlatformChange("3")}
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  Xbox
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={(filters.platforms || []).includes("21")}
                    onChange={() => handlePlatformChange("21")}
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  Android
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={(filters.platforms || []).includes("4")}
                    onChange={() => handlePlatformChange("4")}
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  iOS
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="sidebar-section">
          <button
            className="sidebar-section-header"
            onClick={() => toggleSection("sort")}
          >
            <div className="sidebar-section-title-wrapper">
              <Star size={18} />
              <h3 className="sidebar-section-title">Sort By</h3>
            </div>
            <ChevronDown
              className={`sidebar-section-icon ${
                expandedSection === "sort" ? "rotate" : ""
              }`}
            />
          </button>

          {expandedSection === "sort" && (
            <div className="sidebar-section-content">
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="sort"
                    value="-rating"
                    checked={(filters.ordering || "-rating") === "-rating"}
                    onChange={() => handleSortChange("-rating")}
                    className="radio-input"
                  />
                  <span className="radio-custom"></span>
                  Rating (High to Low)
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="sort"
                    value="rating"
                    checked={(filters.ordering || "-rating") === "rating"}
                    onChange={() => handleSortChange("rating")}
                    className="radio-input"
                  />
                  <span className="radio-custom"></span>
                  Rating (Low to High)
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="sort"
                    value="-released"
                    checked={(filters.ordering || "-rating") === "-released"}
                    onChange={() => handleSortChange("-released")}
                    className="radio-input"
                  />
                  <span className="radio-custom"></span>
                  Release Date (Newest)
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="sort"
                    value="-added"
                    checked={(filters.ordering || "-rating") === "-added"}
                    onChange={() => handleSortChange("-added")}
                    className="radio-input"
                  />
                  <span className="radio-custom"></span>
                  Recently Added
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="sidebar-section">
          <button
            className="sidebar-section-header"
            onClick={() => toggleSection("ratings")}
          >
            <div className="sidebar-section-title-wrapper">
              <Award size={18} />
              <h3 className="sidebar-section-title">Metacritic Rating</h3>
            </div>
            <ChevronDown
              className={`sidebar-section-icon ${
                expandedSection === "ratings" ? "rotate" : ""
              }`}
            />
          </button>

          {expandedSection === "ratings" && (
            <div className="sidebar-section-content">
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="metacritic"
                    value="90,100"
                    checked={(filters.metacritic || "") === "90,100"}
                    onChange={() => handleRatingChange("90,100")}
                    className="radio-input"
                  />
                  <span className="radio-custom"></span>
                  Exceptional (90-100)
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="metacritic"
                    value="75,89"
                    checked={(filters.metacritic || "") === "75,89"}
                    onChange={() => handleRatingChange("75,89")}
                    className="radio-input"
                  />
                  <span className="radio-custom"></span>
                  Great (75-89)
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="metacritic"
                    value="60,74"
                    checked={(filters.metacritic || "") === "60,74"}
                    onChange={() => handleRatingChange("60,74")}
                    className="radio-input"
                  />
                  <span className="radio-custom"></span>
                  Good (60-74)
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="metacritic"
                    value="1,59"
                    checked={(filters.metacritic || "") === "1,59"}
                    onChange={() => handleRatingChange("1,59")}
                    className="radio-input"
                  />
                  <span className="radio-custom"></span>
                  Mixed or Poor (1-59)
                </label>
              </div>
            </div>
          )}
        </div>

        <button onClick={clearAllFilters} className="clear-filters-btn">
          <Filter size={16} />
          Clear All Filters
        </button>
      </div>
    </div>
  );
};
