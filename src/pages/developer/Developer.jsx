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
              I am an aspiring Full Stack Developer with a solid foundation in
              web and app development. I am actively building my knowledge in
              Data Structures and Algorithms (DSA), exploring 3D web development
              with Three.js, and developing various projects. My goal is to
              leverage my technical skills to create innovative solutions and
              enhance user experiences.
            </p>
            <p>
              My goal is to leverage my technical skills to create innovative
              solutions and enhance user experiences.
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
