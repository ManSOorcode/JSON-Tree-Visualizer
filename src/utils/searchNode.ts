import type { NodeType } from "../type/types";

const findNodeByPath = (nodes: NodeType[], path: string): string | null => {
  if (!path) return null;
  const cleanPath = path.trim();

  const exact = nodes.find((n) => n.data?.path === cleanPath);
  if (exact) return exact.id;

  const fuzzy = nodes.find((n) =>
    n.data?.path?.includes(cleanPath.replace(/^\$\./, ""))
  );

  console.log(fuzzy, "from search nodes");
  return fuzzy ? fuzzy.id : null;
};

export default findNodeByPath;
