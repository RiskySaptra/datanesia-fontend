"use client";
import React, { useState } from "react";
import DateRangePicker from "./DateRangePicker";
import CellEnodeSelect from "./CellEnodeSelect";
import chartOptions from "./ChartOptions";
import ChartRenderer from "./ChartRenderer";
import BackButton from "./BackButton";
import useEnodeIds from "./useEnodeId";
import useGraphData from "./useGraphData";

interface DataPoint {
  x: number;
  y: number;
}

interface SeriesData {
  name: string;
  data: DataPoint[];
}

interface FetchResponse {
  data: Array<{
    cellId: string;
    resultTime: DataPoint[];
  }>;
}

const Graph: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("2022-07-01");
  const [endDate, setEndDate] = useState<string>("2022-07-31");

  const {
    cellEnodeMap,
    selectedCellId,
    setSelectedCellId,
    selectedEnodeId,
    setSelectedEnodeId,
    enodeIds,
    cellEnodeMapError,
    isCellEnodeLoading,
  } = useEnodeIds();

  const { series, error } = useGraphData(
    startDate,
    endDate,
    selectedCellId,
    selectedEnodeId
  );

  if (error || cellEnodeMapError) return <p>{error || cellEnodeMapError}</p>;

  return (
    <div className="h-screen flex justify-center items-center flex-col gap-5">
      <BackButton />

      <div className="flex gap-5">
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={(e) => setStartDate(e.target.value)}
          onEndDateChange={(e) => setEndDate(e.target.value)}
        />

        <CellEnodeSelect
          isCellEnodeLoading={isCellEnodeLoading}
          cellId={selectedCellId}
          cellEnodeMap={cellEnodeMap}
          enodeIds={enodeIds}
          selectedEnodeId={selectedEnodeId}
          onCellIdChange={(e) => setSelectedCellId(e.target.value)}
          onEnodeIdChange={(e) => setSelectedEnodeId(e.target.value)}
        />
      </div>

      <ChartRenderer series={series} chartOptions={chartOptions} />
    </div>
  );
};

export default Graph;
