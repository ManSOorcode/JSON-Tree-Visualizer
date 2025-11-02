import { useCallback, useEffect, useState } from "react";

import { useReactFlow } from "reactflow";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import type { SearchFilterProps } from "../type/types";

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  const handleSearch = () => {
    onSearch(query.trim());
  };

  const { fitView } = useReactFlow();

  const handleDownload = useCallback(
    async (type: "png" | "pdf") => {
      fitView({ padding: 0.3 });
      await new Promise((r) => setTimeout(r, 300));

      const flowElement = document.querySelector(
        ".react-flow__viewport"
      ) as HTMLElement | null;

      if (!flowElement) {
        console.error("Flow element not found");
        return;
      }

      const dataUrl = await htmlToImage.toPng(flowElement, {
        backgroundColor: "#fff",
        quality: 1,
        pixelRatio: 2,
      });

      if (type === "png") {
        const link = document.createElement("a");
        link.download = "flowchart.png";
        link.href = dataUrl;
        link.click();
      } else if (type === "pdf") {
        const pdf = new jsPDF("l", "pt", "a4");
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        const pageHeight = pdf.internal.pageSize.getHeight();

        if (pdfHeight < pageHeight) {
          pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
        } else {
          let remainingHeight = pdfHeight;
          let imgY = 0;

          while (remainingHeight > 0) {
            pdf.addImage(dataUrl, "PNG", 0, imgY, pdfWidth, pdfHeight);
            remainingHeight -= pageHeight;
            imgY -= pageHeight;
            if (remainingHeight > 0) pdf.addPage();
          }
        }

        pdf.save("flowchart.pdf");
      }
    },
    [fitView]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".relative")) {
        setShowDownloadMenu(false);
      }
    };

    if (showDownloadMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDownloadMenu]);

  return (
    <div className="flex items-center gap-2 p-3 light:bg-gray-50 dark:bg-gray-800 border-b light:border-gray-200 dark:border-gray-700">
      <input
        type="text"
        name="json"
        placeholder="Search by JSON path e.g. $.user.address.city"
        className="flex-1 border light:border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 light:bg-white dark:bg-gray-900 light:text-gray-900 dark:text-gray-100 light:placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 light:focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="light:bg-blue-600 dark:bg-blue-600 text-white px-4 py-2 rounded-lg light:hover:bg-blue-700 dark:hover:bg-blue-700 font-medium shadow-sm hover:shadow-md transition-all"
      >
        Search
      </button>

      <div className="relative">
        <button
          onClick={() => setShowDownloadMenu(!showDownloadMenu)}
          className="light:bg-emerald-500 dark:bg-emerald-600 text-white p-2 rounded-lg light:hover:bg-emerald-600 dark:hover:bg-emerald-700 shadow-sm hover:shadow-md transition-all"
          title="Download"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </button>

        {showDownloadMenu && (
          <div className="absolute right-0 mt-2 w-48 light:bg-white dark:bg-gray-800 border light:border-gray-200 dark:border-gray-600 rounded-lg shadow-xl z-10 overflow-hidden">
            <button
              onClick={() => {
                handleDownload("png");
                setShowDownloadMenu(false);
              }}
              className="w-full px-4 py-3 light:hover:bg-purple-50 dark:hover:bg-purple-900/30 flex items-center gap-3 transition-colors group"
            >
              <div className="light:bg-purple-100 dark:bg-purple-900/50 p-2 rounded-lg light:group-hover:bg-purple-200 dark:group-hover:bg-purple-800/70 transition-colors">
                <svg
                  className="w-5 h-5 light:text-purple-600 dark:text-purple-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="light:text-gray-700 dark:text-gray-200 font-medium">
                Image
              </span>
            </button>

            <button
              onClick={() => {
                handleDownload("pdf");
                setShowDownloadMenu(false);
              }}
              className="w-full px-4 py-3 light:hover:bg-rose-50 dark:hover:bg-rose-900/30 flex items-center gap-3 transition-colors group border-t light:border-gray-100 dark:border-gray-700"
            >
              <div className="light:bg-rose-100 dark:bg-rose-900/50 p-2 rounded-lg light:group-hover:bg-rose-200 dark:group-hover:bg-rose-800/70 transition-colors">
                <svg
                  className="w-5 h-5 light:text-rose-600 dark:text-rose-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="light:text-gray-700 dark:text-gray-200 font-medium">
                PDF
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
