import React from "react";

interface CellEnodeSelectProps {
  cellId: string;
  cellEnodeMap: Record<string, string[]>;
  enodeIds: string[];
  selectedEnodeId: string;
  isCellEnodeLoading: boolean;
  onCellIdChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onEnodeIdChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CellEnodeSelect: React.FC<CellEnodeSelectProps> = ({
  cellId,
  cellEnodeMap,
  enodeIds,
  selectedEnodeId,
  isCellEnodeLoading,
  onCellIdChange,
  onEnodeIdChange,
}) => {
  const cellOptions = Object.keys(cellEnodeMap).map((cell) => (
    <option key={cell} value={cell}>
      Cell ID {cell}
    </option>
  ));

  const enodeOptions = enodeIds.map((enodeId) => (
    <option key={enodeId} value={enodeId}>
      eNodeB ID {enodeId}
    </option>
  ));

  return (
    <div className="flex items-center gap-5">
      <select
        value={cellId}
        onChange={onCellIdChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
      >
        <option value="">
          {isCellEnodeLoading ? "Loading Cell ID..." : "Select Cell ID"}{" "}
        </option>
        {cellOptions}
      </select>

      <select
        value={selectedEnodeId}
        onChange={onEnodeIdChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
        disabled={isCellEnodeLoading || !cellId}
      >
        <option value="">
          {isCellEnodeLoading
            ? "Loading eNodeB IDs..."
            : enodeIds.length === 0
            ? "Select Cell ID first"
            : "Select eNodeB ID"}
        </option>
        {enodeOptions}
      </select>
    </div>
  );
};

export default CellEnodeSelect;
