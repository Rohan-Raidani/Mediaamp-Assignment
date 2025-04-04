/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 public/models/robot.glb -o src/components/three/Robot.jsx -k -K -r public 
*/

import { Html, useGLTF } from "@react-three/drei";
// import { useAtom } from "jotai";
import React from "react";
// import { degToRad } from "three/src/math/MathUtils";
// import { currentPageAtom } from "./UI";

export function Robot(props) {
  const { nodes, materials } = useGLTF("/models/robot.glb");
  return (
    <group {...props} dispose={null}>
      <group>
        <group name="Node">
          <mesh
            name="Node-Mesh"
            geometry={nodes["Node-Mesh"].geometry}
            material={materials.mat14}
          />
          <mesh
            name="Node-Mesh_1"
            geometry={nodes["Node-Mesh_1"].geometry}
            material={materials.mat16}
          />
          <mesh
            name="Node-Mesh_2"
            geometry={nodes["Node-Mesh_2"].geometry}
            material={materials.mat23}
          />
          <mesh
            name="Node-Mesh_3"
            geometry={nodes["Node-Mesh_3"].geometry}
            material={materials.mat21}
          />
          <mesh
            name="Node-Mesh_4"
            geometry={nodes["Node-Mesh_4"].geometry}
            material={materials.mat2}
          />
          <mesh
            name="Node-Mesh_5"
            geometry={nodes["Node-Mesh_5"].geometry}
            material={materials.mat9}
          />
          <mesh
            name="Node-Mesh_6"
            geometry={nodes["Node-Mesh_6"].geometry}
            material={materials.mat1}
          />
          <mesh
            name="Node-Mesh_7"
            geometry={nodes["Node-Mesh_7"].geometry}
            material={materials.mat19}
          />
          <mesh
            name="Node-Mesh_8"
            geometry={nodes["Node-Mesh_8"].geometry}
            material={materials.mat3}
          />
          <mesh
            name="Node-Mesh_9"
            geometry={nodes["Node-Mesh_9"].geometry}
            material={materials.mat15}
          />
          <mesh
            name="Node-Mesh_10"
            geometry={nodes["Node-Mesh_10"].geometry}
            material={materials.mat22}
          />
          <mesh
            name="Node-Mesh_11"
            geometry={nodes["Node-Mesh_11"].geometry}
            material={materials.mat12}
          />
          <mesh
            name="Node-Mesh_12"
            geometry={nodes["Node-Mesh_12"].geometry}
            material={materials.mat8}
          />
          <mesh
            name="Node-Mesh_13"
            geometry={nodes["Node-Mesh_13"].geometry}
            material={materials.mat5}
          />
          <mesh
            name="Node-Mesh_14"
            geometry={nodes["Node-Mesh_14"].geometry}
            material={materials.mat17}
          />
          <mesh
            name="Node-Mesh_15"
            geometry={nodes["Node-Mesh_15"].geometry}
            material={materials.mat18}
          />
          <mesh
            name="Node-Mesh_16"
            geometry={nodes["Node-Mesh_16"].geometry}
            material={materials.mat7}
          />
          <mesh
            name="Node-Mesh_17"
            geometry={nodes["Node-Mesh_17"].geometry}
            material={materials.mat10}
          />
          <mesh
            name="Node-Mesh_18"
            geometry={nodes["Node-Mesh_18"].geometry}
            material={materials.mat25}
          />
          <mesh
            name="Node-Mesh_19"
            geometry={nodes["Node-Mesh_19"].geometry}
            material={materials.mat24}
          />
          <mesh
            name="Node-Mesh_20"
            geometry={nodes["Node-Mesh_20"].geometry}
            material={materials.mat13}
          />
          <mesh
            name="Node-Mesh_21"
            geometry={nodes["Node-Mesh_21"].geometry}
            material={materials.mat0}
          />
          <mesh
            name="Node-Mesh_22"
            geometry={nodes["Node-Mesh_22"].geometry}
            material={materials.mat11}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/robot.glb");
