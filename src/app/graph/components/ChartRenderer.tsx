import dynamic from "next/dynamic";
import React from "react";
import { SeriesData } from "./useGraphData";

// Dynamically import the Chart component from react-apexcharts
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ChartRendererProps {
  series: SeriesData[];
  chartOptions: any; // Replace `any` with the actual type if known
}

const ChartRenderer: React.FC<ChartRendererProps> = ({
  series,
  chartOptions,
}) => {
  return (
    <div className="w-screen px-20">
      {series.length && series[0]?.data.length ? (
        <Chart
          options={chartOptions}
          series={series}
          type="area"
          width="100%"
          height={600}
        />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default ChartRenderer;
