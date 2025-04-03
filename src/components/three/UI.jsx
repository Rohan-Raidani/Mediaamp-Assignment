import "./style.css";
import { useNavigate } from "react-router-dom";

export const UI = () => {
  const navigate = useNavigate();
  return (
    <div className="ui">
      <section>
        <h1>Welcome to Game Library</h1>
        <p>Discover and explore your favorite games easily.</p>
        <div className="button-group">
          <button className="nav-btn" onClick={() => navigate("/home")}>
            Home
          </button>
          <button className="nav-btn" onClick={() => navigate("/dev's")}>
            Dev's Profile
          </button>
        </div>
      </section>
    </div>
  );
};
