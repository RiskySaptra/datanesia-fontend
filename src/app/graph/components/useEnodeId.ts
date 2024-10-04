import { useState, useEffect } from "react";
import useCellEnodeMap from "./useCellEnodeMap";

const useEnodeIds = () => {
  const [selectedCellId, setSelectedCellId] = useState<string>("");
  const [selectedEnodeId, setSelectedEnodeId] = useState<string>("");
  const [enodeIds, setEnodeIds] = useState<string[]>([]);

  const {
    cellEnodeMap,
    error: cellEnodeMapError,
    isLoading: isCellEnodeLoading,
  } = useCellEnodeMap();

  useEffect(() => {
    if (!selectedCellId) {
      setSelectedEnodeId("");
      setEnodeIds([]);
      return;
    }

    const ids = cellEnodeMap[selectedCellId] || [];
    setEnodeIds(ids);
  }, [selectedCellId, cellEnodeMap]);

  return {
    cellEnodeMap,
    selectedCellId,
    setSelectedCellId,
    selectedEnodeId,
    setSelectedEnodeId,
    enodeIds,
    cellEnodeMapError,
    isCellEnodeLoading,
  };
};

export default useEnodeIds;
