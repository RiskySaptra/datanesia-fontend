"use client";
import React, { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      setError(null); // Reset error
    } else {
      setError("Please upload a valid CSV file.");
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("No file selected!");
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
        throw new Error("Failed to upload file.");
      }

      setSuccessMessage("File uploaded successfully!");
      setError(null);
      setFile(null); // Clear the file input
    } catch (err) {
      // Handle the error and ensure the type is a string
      const errorMessage =
        (err as Error).message || "An unknown error occurred.";
      console.error("Upload error:", errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center flex-col gap-5">
      <div className="min-w-[800px]">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="multiple_files"
        >
          Upload CSV
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="multiple_files"
          type="file"
          accept=".csv"
          onChange={handleFileChange} // Handle file change
        />
        {error && <p className="text-red-600">{error}</p>}
        {successMessage && <p className="text-green-600">{successMessage}</p>}
      </div>

      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
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
    </div>
  );
}
