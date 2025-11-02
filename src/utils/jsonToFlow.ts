import type { Edge } from "reactflow";
import type { JSONValue, NodeType } from "../type/types";

let nodeId = 0;

const jsonToFlow = (
  data: JSONValue,
  parentId: string = "",
  level: number = 0,
  path: string = "$"
): { nodes: NodeType[]; edges: Edge[] } => {
  const nodes: NodeType[] = [];
  const edges: Edge[] = [];

  const currentId = `node-${nodeId++}` as string;

  const type = Array.isArray(data)
    ? "array"
    : typeof data === "object" && data !== null
    ? "object"
    : "primitive";

  nodes.push({
    id: currentId,
    data: { label: type === "primitive" ? String(data) : type, path },
    position: { x: level * 180, y: nodeId * 40 },
    style: {
      background:
        type === "object"
          ? "#7C3AED"
          : type === "array"
          ? "#16A34A"
          : "#F59E0B",
      color: "white",

      borderRadius: "8px",
      padding: "4px 8px",
    },
  });

  if (parentId)
    edges.push({ id: `edge-${nodeId++}`, source: parentId, target: currentId });

  if (typeof data === "object" && data !== null) {
    Object.entries(data).forEach(([key, value]) => {
      const newPath = Array.isArray(data)
        ? `${path}[${key}]`
        : `${path}.${key}`;

      const sub = jsonToFlow(value, currentId, level + 1, newPath);

      nodes.push(...sub.nodes);
      edges.push(...sub.edges);
    });
  }

  return { nodes, edges };
};

export { jsonToFlow };
