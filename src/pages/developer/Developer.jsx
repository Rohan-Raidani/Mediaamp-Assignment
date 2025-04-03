import React, { useRef } from "react";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import "./new.css";

export const Developer = () => {
  const riveContainerRef = useRef(null);
  const STATE_MACHINE_NAME = "State Machine 1";
  const RIVE_FILE = "/rive/socials.riv";

  const urls = {
    linkedin: "https://www.linkedin.com/in/rohan-raidani/",
    github: "https://github.com/Rohan-Raidani",
    resume:
      "https://drive.google.com/file/d/1uoOpliWPYC3TQtXX249qBAg_2zah2HPb/view",
  };

  // This is where you'll load your Rive animation
  const { RiveComponent } = useRive({
    src: RIVE_FILE,
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
    onStateChange: (event) => {
      // Handle state change events from Rive
      console.log("State change:", event);

      // Check which click state was triggered
      if (event.data.includes("linkdin-click")) {
        window.open(urls.linkedin, "_blank");
      } else if (event.data.includes("github-click")) {
        window.open(urls.github, "_blank");
      } else if (event.data.includes("resume-click")) {
        window.open(urls.resume, "_blank");
      }
    },
  });

  return (
    <div className="developer-container">
      <section className="hero-section">
        <div className="content-wrapper">
          <div className="left-content">
            <h1>Developer Profile</h1>
            <p>
              Hello! I'm a passionate software developer with expertise in
              modern web technologies. My journey in coding began with a
              curiosity about how digital experiences are created, and has
              evolved into a professional career building robust applications. I
              specialize in React, JavaScript, and responsive UI design, always
              striving to create intuitive and impactful user experiences.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, or sharing knowledge with
              the developer community. I believe in continuous learning and
              pushing the boundaries of what's possible with code.
            </p>
          </div>
          <div className="right-content">
            <div className="model-container" ref={riveContainerRef}>
              <RiveComponent />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
