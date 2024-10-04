import React from "react";

const BackButton: React.FC = () => {
  return (
    <div>
      <a
        href="/"
        className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        <svg
          className="w-4 h-4 mr-2 rotate-180"
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
        Back To Upload
      </a>
    </div>
  );
};

export default BackButton;
