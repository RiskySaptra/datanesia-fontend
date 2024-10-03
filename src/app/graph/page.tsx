"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState, useCallback } from "react";
import { ApexOptions } from "apexcharts";

// Dynamically import the Chart component from react-apexcharts
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Define types for series data
interface DataPoint {
  x: number; // Timestamp
  y: number; // Value
}

interface SeriesData {
  name: string;
  data: DataPoint[];
}

const Graph: React.FC = () => {
  const [series, setSeries] = useState<SeriesData[]>([
    { name: "Series 1", data: [] },
  ]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>("2022-07-01");
  const [endDate, setEndDate] = useState<string>("2022-07-31");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/graphs/date-range?startDate=${startDate}&endDate=${endDate}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSeries([{ name: "Series 1", data: data.data || [] }]);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      id: "apexchart-example",
    },
    xaxis: {
      type: "datetime", // This needs to be a specific type
      tickAmount: 2,
    },
    yaxis: {
      opposite: true,
    },
    legend: {
      horizontalAlign: "left",
    },
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleFetchData = () => {
    fetchData();
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!series[0]?.data.length) return <p>No data available</p>;

  return (
    <div className="h-screen flex justify-center items-center flex-col gap-5">
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
      <div id="date-range-picker" className="flex items-center">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input
            id="datepicker-range-start"
            name="start"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <span className="mx-4 text-gray-500">to</span>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </div>
          <input
            id="datepicker-range-end"
            name="end"
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          onClick={handleFetchData}
          className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Graph
        </button>
      </div>

      <div className="w-screen px-20">
        <Chart
          options={options}
          series={series}
          type="area"
          width="100%"
          height={600}
        />
      </div>
    </div>
  );
};

export default Graph;
