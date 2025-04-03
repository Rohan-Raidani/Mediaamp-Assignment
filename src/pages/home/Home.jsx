import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames } from "../../service/redux/gamesSlice";
import { GameCard } from "../../components/GameCard";
import { GameModal } from "../../components/GameModal";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import "./style.css";

export const Home = () => {
  const dispatch = useDispatch();
  const {
    items: games,
    status,
    currentPage,
    totalPages,
  } = useSelector((state) => state.games);
  const [selectedGame, setSelectedGame] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Check if we're on mobile view
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarVisible(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchGames({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage) => {
    dispatch(fetchGames({ page: newPage }));
    // Scroll back to top when changing pages
    document.querySelector(".main-content").scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // const toggleSidebar = () => {
  //   setSidebarVisible(!sidebarVisible);
  // };

  return (
    <div className="home-container">
      {/* Mobile sidebar toggle button */}
      {/* {isMobile && (
        <button
          className="sidebar-toggle"
          onClick={toggleSidebar}
          aria-label={sidebarVisible ? "Close sidebar" : "Open sidebar"}
        >
          {sidebarVisible ? <X size={24} /> : <Menu size={24} />}
        </button>
      )} */}

      {/* Conditional rendering for sidebar based on visibility state */}
      <div
        className={`sidebar-container ${
          sidebarVisible ? "sidebar-visible" : "sidebar-hidden"
        }`}
      >
        <Sidebar />
      </div>

      <main className="main-content">
        {status === "loading" ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            <div className="content-header">
              <div>
                <h1 className="content-title">Game Collection</h1>
                <p className="content-subtitle">
                  Discover new adventures and worlds to explore
                </p>
              </div>
            </div>

            <div className="games-grid">
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onSelect={setSelectedGame}
                />
              ))}
            </div>

            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="nav-btn"
                aria-label="Previous page"
              >
                <ChevronLeft className="nav-icon" />
                Previous
              </button>
              <span className="page-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="nav-btn"
                aria-label="Next page"
              >
                Next
                <ChevronRight className="nav-icon" />
              </button>
            </div>
          </>
        )}
      </main>

      {selectedGame && (
        <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </div>
  );
};

export default Home;
