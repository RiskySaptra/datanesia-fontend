// Home.tsx
"use client";
import React from "react";
import { useFileUpload } from "./useFileUpload";
import { handleClearData } from "./useClearData";

export default function Home() {
  const { handleFileChange, handleUpload } = useFileUpload();

  return (
    <div className="h-screen flex justify-center items-center flex-col gap-5">
      <div className="min-w-[800px]">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="csv_file_input"
        >
          Upload CSV
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="csv_file_input"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
        />
      </div>

      <button
        onClick={handleUpload}
        className="mt-4 px-20 py-2 text-white bg-gray-900 rounded-lg hover:bg-gray-700"
      >
        Upload
      </button>

      <div>
        <p className="text-gray-500 dark:text-gray-400">
          Data Available{" "}
          <a
            href="/graph"
            className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Display Graph
            <svg
              className="w-4 h-4 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </p>
      </div>
      <div className="flex items-center flex-col group cursor-pointer">
        <p className="text-[10px] text-gray-400">Hover here to clear data</p>
        <button
          onClick={handleClearData}
          className="px-4 py-2 text-white bg-red-700 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 delay-300"
        >
          Clear All Data
        </button>
      </div>
    </div>
  );
}
