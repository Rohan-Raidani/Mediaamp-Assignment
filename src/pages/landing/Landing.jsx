import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense } from "react";
import { Experience } from "../../components/three/Experience";
import { UI } from "../../components/three/UI";

const Landing = () => {
  return (
    <>
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 42 }}
        style={{ overflow: "hidden" }}
      >
        <color attach="background" args={["#171720"]} />
        <fog attach="fog" args={["#171720", 10, 30]} />
        <Suspense>
          <Experience />
        </Suspense>
        <EffectComposer>
          <Bloom mipmapBlur intensity={1.2} />
        </EffectComposer>
      </Canvas>
      <UI />
    </>
  );
};

export default Landing;
