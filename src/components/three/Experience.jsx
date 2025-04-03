import {
  CameraControls,
  Environment,
  MeshReflectorMaterial,
  useFont,
} from "@react-three/drei";

import { useEffect, useRef } from "react";
import { Color } from "three";
import { degToRad } from "three/src/math/MathUtils";
import { Robot } from "./Robot";
// import { currentPageAtom } from "./UI";

const bloomColor = new Color("#fff");
bloomColor.multiplyScalar(1.5);

export const Experience = () => {
  const controls = useRef();
  const meshFitCameraHome = useRef();
  const meshFitCameraStore = useRef();
  // const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  const intro = async () => {
    controls.current.dolly(-22);
    controls.current.smoothTime = 1.6;
    setTimeout(() => {
      // setCurrentPage("home");
    }, 1000);
    fitCamera();
  };

  const fitCamera = async () => {
    // if (true) {
    //   controls.current.smoothTime = 0.8;
    //   controls.current.fitToBox(meshFitCameraStore.current, true);
    // } else {
    controls.current.smoothTime = 1.6;
    controls.current.fitToBox(meshFitCameraHome.current, true);
    // }
  };

  useEffect(() => {
    intro();
  }, []);

  useEffect(() => {
    fitCamera();
    window.addEventListener("resize", fitCamera);
    return () => window.removeEventListener("resize", fitCamera);
  }, []);

  return (
    <>
      <CameraControls ref={controls} />
      <mesh
        ref={meshFitCameraHome}
        position-z={2.5}
        position-x={-1.5}
        visible={false}
      >
        <boxGeometry args={[7.5, 3, 2]} />
        <meshBasicMaterial color="orange" transparent opacity={1.5} />
      </mesh>

      <group rotation-y={degToRad(150)} position-x={0}>
        <Robot scale={0.6} html />
        <mesh ref={meshFitCameraStore} visible={false}>
          <boxGeometry args={[2, 1, 2]} />
          <meshBasicMaterial color="red" transparent opacity={0.5} />
        </mesh>
      </group>
      <mesh position-y={-1.48} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[50, 50]}
          resolution={256}
          mixBlur={1}
          mixStrength={10}
          roughness={1}
          depthScale={1}
          opacity={0.5}
          transparent
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#333"
          metalness={0.5}
        />
      </mesh>
      <Environment preset="sunset" />
    </>
  );
};
