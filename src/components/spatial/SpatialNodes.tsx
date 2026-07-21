"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { GraphNode3D, SPATIAL_GRAPH_NODES } from "@/lib/graphData";

interface SpatialNodesProps {
  activeLayer: string; // "all" | "engineering" | "ai" | "creative" | "ventures" | "leadership"
  searchQuery: string;
  selectedNode: GraphNode3D | null;
  hoveredNode: GraphNode3D | null;
  onSelectNode: (node: GraphNode3D) => void;
  onHoverNode: (node: GraphNode3D | null) => void;
}

export default function SpatialNodes({
  activeLayer,
  searchQuery,
  selectedNode,
  hoveredNode,
  onSelectNode,
  onHoverNode,
}: SpatialNodesProps) {
  const { camera } = useThree();

  // Filter nodes matching layer & search
  const filteredNodes = useMemo(() => {
    return SPATIAL_GRAPH_NODES.filter((node) => {
      const matchesLayer = activeLayer === "all" || node.layer === activeLayer;
      const matchesSearch =
        searchQuery === "" ||
        node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesLayer && matchesSearch;
    });
  }, [activeLayer, searchQuery]);

  // Compute unique line connections between nodes
  const connectionLines = useMemo(() => {
    const lines: { start: THREE.Vector3; end: THREE.Vector3; color: string; active: boolean }[] = [];
    const processed = new Set<string>();

    SPATIAL_GRAPH_NODES.forEach((node) => {
      node.connections.forEach((targetId) => {
        const pairKey = [node.id, targetId].sort().join("-");
        if (processed.has(pairKey)) return;
        processed.add(pairKey);

        const targetNode = SPATIAL_GRAPH_NODES.find((n) => n.id === targetId);
        if (targetNode) {
          const isActive =
            selectedNode && (selectedNode.id === node.id || selectedNode.id === targetId);
          lines.push({
            start: new THREE.Vector3(...node.position),
            end: new THREE.Vector3(...targetNode.position),
            color: isActive ? node.color : "#334155",
            active: !!isActive,
          });
        }
      });
    });

    return lines;
  }, [selectedNode]);

  return (
    <group>
      {/* 3D Connection Ray Lines */}
      {connectionLines.map((line, idx) => {
        const points = [line.start, line.end];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
          color: line.color,
          linewidth: line.active ? 2.5 : 1,
          transparent: true,
          opacity: line.active ? 0.9 : 0.25,
        });
        const lineMesh = new THREE.Line(geometry, material);
        return <primitive key={idx} object={lineMesh} />;
      })}

      {/* 3D Interactive Nodes */}
      {filteredNodes.map((node) => {
        const isSelected = selectedNode?.id === node.id;
        const isHovered = hoveredNode?.id === node.id;

        return (
          <group key={node.id} position={node.position}>
            {/* Core Sphere Mesh */}
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                onSelectNode(node);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                onHoverNode(node);
              }}
              onPointerOut={() => onHoverNode(null)}
            >
              <sphereGeometry args={[isSelected ? 0.9 : isHovered ? 0.75 : 0.55, 32, 32]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={isSelected ? 1.5 : isHovered ? 0.9 : 0.35}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>

            {/* Glowing Ring Effect for Selected Node */}
            {isSelected && (
              <mesh>
                <ringGeometry args={[1.1, 1.3, 32]} />
                <meshBasicMaterial color={node.color} side={THREE.DoubleSide} transparent opacity={0.6} />
              </mesh>
            )}

            {/* Floating 3D HTML Label */}
            <Html
              position={[0, 1.1, 0]}
              center
              distanceFactor={22}
              style={{ pointerEvents: "none" }}
            >
              <div
                className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all duration-200 shadow-xl ${
                  isSelected
                    ? "bg-white text-slate-950 border-2 border-white scale-110 z-30"
                    : isHovered
                    ? "bg-slate-900 text-white border border-indigo-400 z-20"
                    : "bg-slate-950/80 text-slate-300 border border-white/10 opacity-80"
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full inline-block mr-1.5"
                  style={{ backgroundColor: node.color }}
                />
                {node.label}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
