"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const TOAST_CONFIG: any = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
    } else {
      toast.error("Please upload a valid CSV file.", TOAST_CONFIG);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("No file selected!", TOAST_CONFIG);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:4000/api/v1/upload/csv", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload file.");
      }

      const data = await response.json();
      toast.success(
        `${data.data.message}, inserted: ${data.data.insertedCount}`,
        TOAST_CONFIG
      );
    } catch (err) {
      const errorMessage =
        (err as Error).message || "An unknown error occurred.";
      console.error("Upload error:", errorMessage);
      toast.error(errorMessage, TOAST_CONFIG);
    }
  };

  const handleClearData = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/graphs", {
        method: "Delete",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload file.");
      }

      const data = await response.json();
      toast.success(data.message, TOAST_CONFIG);
    } catch (err) {
      const errorMessage =
        (err as Error).message || "An unknown error occurred.";
      console.error("Upload error:", errorMessage);
      toast.error(errorMessage, TOAST_CONFIG);
    }
  };

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

      <button
        onClick={handleClearData}
        className="mt-4 px-4 py-2 text-white bg-red-700 rounded-lg opacity-0 hover:opacity-100 transition-all duration-700 delay-500"
      >
        Clear Graph Data
      </button>
    </div>
  );
}
