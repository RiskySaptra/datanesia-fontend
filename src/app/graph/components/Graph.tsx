"use client";
import React, { useEffect, useState, useCallback } from "react";
import DateRangePicker from "./DateRangePicker";
import CellEnodeSelect from "./CellEnodeSelect";
import useCellEnodeMap from "./useCellEnodeMap";
import chartOptions from "./ChartOptions";
import ChartRenderer from "./ChartRenderer";
import BackButton from "./BackButton";

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
  const [series, setSeries] = useState<SeriesData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>("2022-07-01");
  const [endDate, setEndDate] = useState<string>("2022-07-31");
  const [selectedCellId, setSelectedCellId] = useState<string>("");
  const [selectedEnodeId, setSelectedEnodeId] = useState<string>("");
  const [enodeIds, setEnodeIds] = useState<string[]>([]);

  const {
    cellEnodeMap,
    error: cellEnodeMapError,
    isLoading: isCellEnodeLoading,
  } = useCellEnodeMap();

  const fetchData = useCallback(async () => {
    if (!startDate || !endDate) return;
    setError(null);

    try {
      const queryParams = new URLSearchParams({ startDate, endDate });
      if (selectedCellId) queryParams.append("cellId", selectedCellId);
      if (selectedEnodeId) queryParams.append("enodebId", selectedEnodeId);

      const response = await fetch(
        `http://localhost:4000/api/v1/graphs/date-range?${queryParams.toString()}`
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const data: FetchResponse = await response.json();
      const parsedData: SeriesData[] = data.data.map((itm) => ({
        name: `Cell ID (${itm.cellId})`,
        data: itm.resultTime || [],
      }));

      setSeries(parsedData);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch data.");
    }
  }, [startDate, endDate, selectedCellId, selectedEnodeId]);

  useEffect(() => {
    if (!selectedCellId) {
      setEnodeIds([]);
      return;
    }

    const ids = cellEnodeMap[selectedCellId] || [];
    setEnodeIds(ids);
  }, [selectedCellId, cellEnodeMap]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
