import { useState } from "react";
import type { InputSectionProps } from "../type/types";

const InputSection: React.FC<InputSectionProps> = ({ onVisulizerHandler }) => {
  const [jsonval, setJsonVal] = useState("");
  const [error, setError] = useState("");

  const changehandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonVal(e.target.value);
    setError("");
  };

  const submitHandler = () => {
    try {
      const parsed = JSON.parse(jsonval || "");
      onVisulizerHandler(parsed);
      setError("");
    } catch {
      setError("Invalid JSON format");
    }
  };
  return (
    <section className="light:bg-white dark:bg-gray-900">
      <p className="light:text-gray-600 dark:text-gray-400 pb-2 font-medium">
        Paste or Type JSON Data
      </p>
      <textarea
        className="min-w-40 w-full md:w-96 h-96 p-3 border light:border-gray-300 dark:border-gray-600 rounded-lg light:bg-white dark:bg-gray-800 light:text-gray-900 dark:text-gray-100 light:placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 light:focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
        placeholder="Paste JSON here..."
        value={jsonval || ""}
        onChange={changehandler}
      />
      {error && (
        <p className="light:text-red-600 dark:text-red-400 mt-2 text-sm font-medium">
          {error}
        </p>
      )}
      <button
        className="mt-3 light:bg-blue-600 dark:bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center light:hover:bg-blue-700 dark:hover:bg-blue-700 font-medium shadow-sm hover:shadow-md transition-all"
        onClick={submitHandler}
      >
        Generate Tree
      </button>
    </section>
  );
};

export default InputSection;
