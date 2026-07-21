"use client";

import { useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import SpatialNodes from "./SpatialNodes";
import { GraphNode3D } from "@/lib/graphData";

interface CameraRigProps {
  selectedNode: GraphNode3D | null;
}

function CameraRig({ selectedNode }: CameraRigProps) {
  const { camera } = useThree();
  const targetPos = useRef<THREE.Vector3 | null>(null);

  useEffect(() => {
    if (selectedNode) {
      targetPos.current = new THREE.Vector3(
        selectedNode.position[0],
        selectedNode.position[1] + 2,
        selectedNode.position[2] + 12
      );
    }
  }, [selectedNode]);

  useEffect(() => {
    let animId: number;
    const animate = () => {
      if (targetPos.current) {
        camera.position.lerp(targetPos.current, 0.05);
        if (camera.position.distanceTo(targetPos.current) < 0.1) {
          targetPos.current = null;
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [camera]);

  return null;
}

interface AtlasSpatialCanvasProps {
  activeLayer: string;
  searchQuery: string;
  selectedNode: GraphNode3D | null;
  hoveredNode: GraphNode3D | null;
  onSelectNode: (node: GraphNode3D) => void;
  onHoverNode: (node: GraphNode3D | null) => void;
}

export default function AtlasSpatialCanvas({
  activeLayer,
  searchQuery,
  selectedNode,
  hoveredNode,
  onSelectNode,
  onHoverNode,
}: AtlasSpatialCanvasProps) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 32], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full bg-slate-950"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 20, 15]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#6366f1" />

        <CameraRig selectedNode={selectedNode} />

        <SpatialNodes
          activeLayer={activeLayer}
          searchQuery={searchQuery}
          selectedNode={selectedNode}
          hoveredNode={hoveredNode}
          onSelectNode={onSelectNode}
          onHoverNode={onHoverNode}
        />

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxDistance={50}
          minDistance={5}
        />
      </Canvas>
    </div>
  );
}
