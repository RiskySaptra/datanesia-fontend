import { useState, useCallback, useEffect } from "react";

export interface DataPoint {
  x: number;
  y: number;
}

export interface SeriesData {
  name: string;
  data: DataPoint[];
}

export interface FetchResponse {
  data: Array<{
    cellId: string;
    resultTime: DataPoint[];
  }>;
}

const useGraphData = (
  startDate: string,
  endDate: string,
  selectedCellId: string,
  selectedEnodeId: string
) => {
  const [series, setSeries] = useState<SeriesData[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!startDate || !endDate) return;

    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate, selectedCellId, selectedEnodeId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { series, isLoading, error };
};

export default useGraphData;
