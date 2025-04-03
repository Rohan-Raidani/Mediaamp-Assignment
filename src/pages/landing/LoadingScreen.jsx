import { Html } from "@react-three/drei";
import "./loading.css";

export const LoadingScreen = () => {
  return (
    <Html center>
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading Experience...</p>
      </div>
    </Html>
  );
};
