import { useState, useEffect } from "react";
import useCellEnodeMap from "./useCellEnodeMap";

const useEnodeIds = () => {
  const [selectedCellId, setSelectedCellId] = useState<string>("");
  const [selectedEnodeId, setSelectedEnodeId] = useState<string>("");
  const [enodeIds, setEnodeIds] = useState<string[]>([]);

  const {
    cellEnodeMap,
    error: cellEnodeMapError,
    isLoading: isCellnodeLoading,
  } = useCellEnodeMap();

  useEffect(() => {
    if (!selectedCellId) {
      setEnodeIds([]);
      return;
    }

    const ids = cellEnodeMap[selectedCellId] || [];
    setEnodeIds(ids);
  }, [selectedCellId, cellEnodeMap]);

  return {
    selectedCellId,
    setSelectedCellId,
    selectedEnodeId,
    setSelectedEnodeId,
    enodeIds,
    cellEnodeMapError,
    isCellnodeLoading,
  };
};

export default useEnodeIds;
