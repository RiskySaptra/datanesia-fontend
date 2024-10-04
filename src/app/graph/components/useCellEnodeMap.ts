import { useState, useEffect, useCallback } from "react";

interface CellEnodeMapResponse {
  status: string;
  data: Array<{
    [key: string]: string[];
  }>;
}

const useCellEnodeMap = () => {
  const [cellEnodeMap, setCellEnodeMap] = useState<Record<string, string[]>>(
    {}
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchCellEnodeMap = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/graphs/filter`
      );
      if (!response.ok) throw new Error("Failed to fetch cell-enode map");

      const data: CellEnodeMapResponse = await response.json();

      if (data.status !== "success") {
        throw new Error("Failed to fetch valid cell-enode map.");
      }

      const map = data.data.reduce((acc, item) => {
        Object.entries(item).forEach(([cellId, enodeIds]) => {
          acc[cellId] = enodeIds;
        });
        return acc;
      }, {} as Record<string, string[]>);

      setCellEnodeMap(map);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch cell-enode map.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCellEnodeMap();
  }, [fetchCellEnodeMap]);

  return { cellEnodeMap, error, isLoading };
};

export default useCellEnodeMap;
