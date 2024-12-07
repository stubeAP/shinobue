import React from 'react';

interface FluteHoleProps {
  x: number;
  filled: boolean;
  onClick: () => void;
}

export const FluteHole: React.FC<FluteHoleProps> = ({ x, filled, onClick }) => {
  return (
    <circle
      cx={x}
      cy="30"
      r="12"
      fill={filled ? "red" : "white"}
      stroke="black"
      strokeWidth="2"
      style={{ cursor: "pointer" }}
      onClick={onClick}
    />
  );
};