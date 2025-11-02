import type { Node } from "reactflow";

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONObject
  | JSONArray;

export interface JSONObject {
  [key: string]: JSONValue;
}

export type JSONArray = JSONValue[];

export interface SearchFilterProps {
  onSearch: (path: string) => void;
}

export interface TreeProps {
  json: JSONValue;
}

export interface InputSectionProps {
  onVisulizerHandler: React.Dispatch<React.SetStateAction<JSONValue>>;
}

// export interface NodeType {
//   id: string;
//   data: { label: string; path: string };
//   position: { x: number; y: number };
//   style: {
//     background: string;
//     color: string;

//     borderRadius: string;
//     padding: string;
//   };
// }

export type NodeData = {
  label: string;
  path: string;
};

export type NodeType = Node<NodeData>;
