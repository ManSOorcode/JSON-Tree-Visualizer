import { useEffect, useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  useReactFlow,
  useNodesState,
} from "reactflow";
import { jsonToFlow } from "../utils/jsonToFlow";
import "reactflow/dist/style.css";
import SearchFilter from "./SearchFilter";
import findNodeByPath from "../utils/searchNode";
import type { TreeProps } from "../type/types";

const MAX_NODES = 400;

const Tree: React.FC<TreeProps> = ({ json }) => {
  const [showTruncated, setShowTruncated] = useState(false);
  const [searchPath, setSearchPath] = useState("");
  const [highlightedNode, setHighlightedNode] = useState("");
  const { fitView } = useReactFlow();

  const { nodes, edges } = useMemo(() => jsonToFlow(json), [json]);

  const isTooLarge = nodes.length > MAX_NODES;
  const safeNodes = isTooLarge ? nodes.slice(0, MAX_NODES) : nodes;
  const safeEdges = isTooLarge ? edges.slice(0, MAX_NODES - 1) : edges;

  const [rfNodes, setRfNodes, onNodesChange] = useNodesState(safeNodes);

  console.log(rfNodes, edges, safeNodes);

  useEffect(() => {
    setRfNodes(safeNodes);
  }, [safeNodes, setRfNodes]);

  useEffect(() => {
    if (!searchPath) return;

    const matchId = findNodeByPath(rfNodes, searchPath);

    if (!matchId) {
      alert("❌ No match found");
      return;
    }

    setHighlightedNode(matchId);

    setRfNodes((nds) =>
      nds.map((n) =>
        n.id === matchId
          ? {
              ...n,
              style: {
                ...n.style,
                border: "3px solid #ef4444",
                boxShadow: "0 0 12px rgba(239,68,68,0.8)",
              },
            }
          : { ...n, style: { ...n.style, opacity: 0.8 } }
      )
    );

    const target = rfNodes.find((n) => n.id === matchId);
    if (target)
      fitView({ nodes: [target], duration: 800, padding: 0.4, minZoom: 0.5 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchPath]);

  if (!json)
    return (
      <p className="p-4 text-gray-600 dark:text-gray-400">
        Paste JSON and click Visualize
      </p>
    );

  return (
    <section className="flex flex-col flex-1 h-[calc(100vh-4rem)] rounded-lg light:bg-white dark:bg-gray-900 border light:border-gray-200 dark:border-gray-700 overflow-hidden">
      <SearchFilter onSearch={setSearchPath} />

      {isTooLarge && !showTruncated ? (
        <div className="flex flex-col items-center justify-center h-full text-center p-6 light:bg-white dark:bg-gray-900">
          <h2 className="text-2xl font-semibold mb-2 light:text-red-600 dark:text-red-400">
            ⚠️ JSON Too Large
          </h2>
          <p className="light:text-gray-700 dark:text-gray-300 mb-2">
            Your JSON generated{" "}
            <strong className="light:text-gray-900 dark:text-gray-100">
              {nodes.length}
            </strong>{" "}
            nodes and{" "}
            <strong className="light:text-gray-900 dark:text-gray-100">
              {edges.length}
            </strong>{" "}
            edges.
          </p>
          <p className="light:text-gray-600 dark:text-gray-400 mb-4">
            The current visualization limit is{" "}
            <strong className="light:text-gray-900 dark:text-gray-100">
              {MAX_NODES}
            </strong>{" "}
            nodes for optimal performance.
          </p>
          <button
            className="light:bg-blue-600 dark:bg-blue-600 text-white px-6 py-2 rounded-lg light:hover:bg-blue-700 dark:hover:bg-blue-700 font-medium shadow-sm hover:shadow-md transition-all"
            onClick={() => setShowTruncated(true)}
          >
            🔍 Truncate & Visualize First {MAX_NODES}
          </button>
        </div>
      ) : (
        <div className="flex-1 h-full py-4 light:bg-gray-50 dark:bg-gray-900">
          <ReactFlow
            nodes={rfNodes}
            edges={safeEdges}
            onNodesChange={onNodesChange}
            fitView
            className="light:bg-gray-50 dark:bg-gray-900"
          >
            <Background className="light:bg-gray-50 dark:bg-gray-900" />
            <Controls className="light:bg-white dark:bg-gray-800 border light:border-gray-300 dark:border-gray-600" />
          </ReactFlow>

          {isTooLarge && showTruncated && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 light:bg-yellow-100 dark:bg-yellow-900/80 border light:border-yellow-400 dark:border-yellow-600 rounded-lg px-4 py-2 shadow-lg">
              <p className="light:text-yellow-800 dark:text-yellow-200 text-sm font-medium">
                ⚠️ Showing first {MAX_NODES} of {nodes.length} total nodes
              </p>
            </div>
          )}

          {highlightedNode && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 light:bg-green-100 dark:bg-green-900/80 border light:border-green-400 dark:border-green-600 rounded-lg px-4 py-2 shadow-lg">
              <p className="light:text-green-800 dark:text-green-200 text-sm font-medium">
                ✅ Match found for <strong>{searchPath}</strong>
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Tree;
