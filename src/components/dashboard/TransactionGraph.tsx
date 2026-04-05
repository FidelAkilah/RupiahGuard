"use client";

import { useState, useCallback, useMemo } from "react";
import { AlertTriangle, X } from "lucide-react";
import clsx from "clsx";
import {
  GRAPH_NODES,
  GRAPH_EDGES,
  CIRCULAR_FLOW_EDGES,
  CIRCULAR_FLOW_NODES,
  type GraphNode,
  type GraphEdge,
} from "@/lib/graph-data";

function getRiskColor(score: number): string {
  if (score <= 25) return "#10B981";
  if (score <= 50) return "#06B6D4";
  if (score <= 75) return "#F59E0B";
  return "#EF4444";
}

function getEdgeColor(status: GraphEdge["status"]): string {
  if (status === "critical") return "#EF4444";
  if (status === "suspicious") return "#F59E0B";
  return "#334155";
}

interface TransactionGraphProps {
  filter: "all" | "suspicious" | "critical";
}

export default function TransactionGraph({ filter }: TransactionGraphProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    content: string;
  } | null>(null);

  const filteredEdges = GRAPH_EDGES.filter((e) => {
    if (filter === "all") return true;
    if (filter === "suspicious")
      return e.status === "suspicious" || e.status === "critical";
    return e.status === "critical";
  });

  const visibleNodeIds = new Set<string>();
  if (filter === "all") {
    GRAPH_NODES.forEach((n) => visibleNodeIds.add(n.id));
  } else {
    filteredEdges.forEach((e) => {
      visibleNodeIds.add(e.source);
      visibleNodeIds.add(e.target);
    });
  }

  const filteredNodes = GRAPH_NODES.filter((n) => visibleNodeIds.has(n.id));

  const nodeMap = useMemo(
    () => new Map(GRAPH_NODES.map((n) => [n.id, n])),
    []
  );

  const connectedEdges = hoveredNode
    ? new Set(
        GRAPH_EDGES.filter(
          (e) => e.source === hoveredNode || e.target === hoveredNode
        ).map((e) => e.id)
      )
    : null;

  const connectedNodes = hoveredNode
    ? new Set(
        GRAPH_EDGES.filter(
          (e) => e.source === hoveredNode || e.target === hoveredNode
        ).flatMap((e) => [e.source, e.target])
      )
    : null;

  const handleNodeHover = useCallback(
    (node: GraphNode | null, event?: React.MouseEvent) => {
      setHoveredNode(node?.id ?? null);
      if (node && event) {
        const rect = (
          event.currentTarget as SVGElement
        ).ownerSVGElement?.getBoundingClientRect();
        if (rect) {
          setTooltip({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top - 16,
            content: `${node.label} | Risk: ${node.riskScore}/100 | Vol: ${(node.volume / 1000).toFixed(0)}K`,
          });
        }
      } else {
        setTooltip(null);
      }
    },
    []
  );

  const handleEdgeHover = useCallback(
    (edge: GraphEdge | null, event?: React.MouseEvent) => {
      setHoveredEdge(edge?.id ?? null);
      if (edge && event) {
        const src = nodeMap.get(edge.source);
        const tgt = nodeMap.get(edge.target);
        const rect = (
          event.currentTarget as SVGElement
        ).ownerSVGElement?.getBoundingClientRect();
        if (rect && src && tgt) {
          setTooltip({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top - 16,
            content: `${src.abbr} \u2192 ${tgt.abbr}: ${edge.label} | ${edge.status === "normal" ? "Normal" : edge.status === "suspicious" ? "Mencurigakan" : "Kritis"}`,
          });
        }
      } else {
        setTooltip(null);
      }
    },
    [nodeMap]
  );

  // Get top corridors for selected node
  const getTopCorridors = (nodeId: string) => {
    return GRAPH_EDGES.filter(
      (e) => e.source === nodeId || e.target === nodeId
    )
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 3)
      .map((e) => {
        const src = nodeMap.get(e.source);
        const tgt = nodeMap.get(e.target);
        return {
          route: `${src?.abbr} \u2192 ${tgt?.abbr}`,
          volume: e.label,
          status: e.status,
        };
      });
  };

  // Circular flow annotation position (midpoint of the triangle)
  const circularMidX =
    CIRCULAR_FLOW_NODES.reduce(
      (sum, id) => sum + (nodeMap.get(id)?.x ?? 0),
      0
    ) / 3;
  const circularMidY =
    CIRCULAR_FLOW_NODES.reduce(
      (sum, id) => sum + (nodeMap.get(id)?.y ?? 0),
      0
    ) /
      3 -
    60;

  return (
    <div className="relative h-full w-full">
      <svg
        viewBox="0 0 1000 500"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Arrowhead markers */}
          <marker
            id="arrow-normal"
            viewBox="0 0 10 7"
            refX="10"
            refY="3.5"
            markerWidth="8"
            markerHeight="6"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#334155" />
          </marker>
          <marker
            id="arrow-suspicious"
            viewBox="0 0 10 7"
            refX="10"
            refY="3.5"
            markerWidth="8"
            markerHeight="6"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#F59E0B" />
          </marker>
          <marker
            id="arrow-critical"
            viewBox="0 0 10 7"
            refX="10"
            refY="3.5"
            markerWidth="8"
            markerHeight="6"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#EF4444" />
          </marker>

          {/* Glow filter for critical nodes */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {filteredEdges.map((edge) => {
          const src = nodeMap.get(edge.source);
          const tgt = nodeMap.get(edge.target);
          if (!src || !tgt) return null;

          const isCircular = CIRCULAR_FLOW_EDGES.includes(edge.id);
          const dimmed =
            hoveredNode !== null &&
            connectedEdges &&
            !connectedEdges.has(edge.id);
          const highlighted = hoveredEdge === edge.id;

          // Offset the line end so it stops at the node border
          const dx = tgt.x - src.x;
          const dy = tgt.y - src.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const srcR = src.radius + 2;
          const tgtR = tgt.radius + 8;
          const x1 = src.x + (dx / dist) * srcR;
          const y1 = src.y + (dy / dist) * srcR;
          const x2 = tgt.x - (dx / dist) * tgtR;
          const y2 = tgt.y - (dy / dist) * tgtR;

          return (
            <line
              key={edge.id}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={getEdgeColor(edge.status)}
              strokeWidth={highlighted ? edge.thickness + 1.5 : edge.thickness}
              strokeOpacity={dimmed ? 0.1 : highlighted ? 1 : 0.7}
              strokeDasharray={
                edge.status === "critical" ? "8 4" : undefined
              }
              className={clsx(
                edge.status === "critical" && "graph-edge-flow",
                isCircular && "graph-edge-circular"
              )}
              markerEnd={`url(#arrow-${edge.status})`}
              onMouseEnter={(e) => handleEdgeHover(edge, e)}
              onMouseLeave={() => handleEdgeHover(null)}
              style={{ cursor: "pointer", transition: "stroke-opacity 0.15s" }}
            />
          );
        })}

        {/* Circular flow annotation */}
        {filter !== "critical" || filteredEdges.some((e) => CIRCULAR_FLOW_EDGES.includes(e.id)) ? (
          <g>
            <line
              x1={circularMidX}
              y1={circularMidY + 14}
              x2={circularMidX}
              y2={circularMidY + 40}
              stroke="#EF4444"
              strokeWidth={1}
              strokeDasharray="3 2"
              opacity={0.6}
            />
            <rect
              x={circularMidX - 105}
              y={circularMidY - 18}
              width={210}
              height={32}
              rx={6}
              fill="#1e293b"
              stroke="#EF4444"
              strokeWidth={1}
              opacity={0.95}
            />
            <text
              x={circularMidX}
              y={circularMidY + 3}
              textAnchor="middle"
              fill="#FCA5A5"
              fontSize={11}
              fontWeight={600}
            >
              <tspan dx="-4">Potensi Layering Terdeteksi</tspan>
            </text>
          </g>
        ) : null}

        {/* Nodes */}
        {filteredNodes.map((node) => {
          const dimmed =
            hoveredNode !== null &&
            connectedNodes &&
            !connectedNodes.has(node.id);
          const isCritical = node.riskScore > 75;
          const color = getRiskColor(node.riskScore);

          return (
            <g
              key={node.id}
              style={{
                cursor: "pointer",
                transition: "opacity 0.15s",
                opacity: dimmed ? 0.15 : 1,
              }}
              onMouseEnter={(e) => handleNodeHover(node, e)}
              onMouseLeave={() => handleNodeHover(null)}
              onClick={() =>
                setSelectedNode(selectedNode?.id === node.id ? null : node)
              }
            >
              {/* Outer glow ring for critical */}
              {isCritical && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.radius + 6}
                  fill="none"
                  stroke={color}
                  strokeWidth={1.5}
                  strokeOpacity={0.3}
                  className="graph-node-pulse"
                />
              )}

              <circle
                cx={node.x}
                cy={node.y}
                r={node.radius}
                fill={color}
                fillOpacity={0.15}
                stroke={color}
                strokeWidth={2}
                filter={isCritical ? "url(#glow)" : undefined}
              />

              {/* Inner fill circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.radius * 0.6}
                fill={color}
                fillOpacity={0.35}
              />

              {/* Abbreviation */}
              <text
                x={node.x}
                y={node.y + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#F8FAFC"
                fontSize={node.radius > 30 ? 13 : 10}
                fontWeight={700}
              >
                {node.abbr}
              </text>

              {/* Label below */}
              <text
                x={node.x}
                y={node.y + node.radius + 14}
                textAnchor="middle"
                fill="#64748B"
                fontSize={9}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* SVG tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-20 rounded-md border border-slate-700 bg-slate-900/95 px-3 py-1.5 text-xs text-slate-300 shadow-lg backdrop-blur-sm"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%)",
          }}
        >
          {tooltip.content}
        </div>
      )}

      {/* Selected node side panel */}
      {selectedNode && (
        <div className="absolute right-4 top-4 z-20 w-72 rounded-xl border border-slate-700 bg-slate-900/95 p-5 shadow-xl backdrop-blur-sm">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-bold text-white">
              {selectedNode.label}
            </h4>
            <button
              onClick={() => setSelectedNode(null)}
              className="cursor-pointer rounded p-0.5 text-slate-500 transition-colors hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Risk Score</span>
              <span
                className="font-semibold"
                style={{ color: getRiskColor(selectedNode.riskScore) }}
              >
                {selectedNode.riskScore}/100
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Inflow</span>
              <span className="text-slate-300">
                Rp {(selectedNode.inflow / 1000).toFixed(0)}M
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Outflow</span>
              <span className="text-slate-300">
                Rp {(selectedNode.outflow / 1000).toFixed(0)}M
              </span>
            </div>

            <div className="border-t border-slate-800 pt-2">
              <p className="mb-1.5 text-xs font-medium text-slate-400">
                Top Koridor
              </p>
              {getTopCorridors(selectedNode.id).map((c, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-1 text-xs"
                >
                  <span className="text-slate-400">{c.route}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-300">{c.volume}</span>
                    <span
                      className={clsx(
                        "h-1.5 w-1.5 rounded-full",
                        c.status === "critical"
                          ? "bg-red-500"
                          : c.status === "suspicious"
                            ? "bg-amber-500"
                            : "bg-slate-600"
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>

            {selectedNode.riskScore > 75 && (
              <div className="flex items-start gap-2 rounded-lg bg-red-500/10 p-2.5 text-xs text-red-300">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>
                  Node ini menunjukkan konsentrasi aliran dana tinggi. Perlu
                  investigasi lebih lanjut.
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 rounded-lg border border-slate-700 bg-slate-900/90 p-3 text-xs backdrop-blur-sm">
        <div className="mb-1.5 font-semibold text-slate-300">Aliran Dana</div>
        <div className="space-y-1 text-slate-400">
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-5 bg-slate-500" />
            Normal
          </div>
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-5 bg-amber-500" />
            Mencurigakan
          </div>
          <div className="flex items-center gap-2">
            <span
              className="h-0.5 w-5 border-t-2 border-dashed border-red-500"
            />
            Kritis
          </div>
        </div>
      </div>
    </div>
  );
}
