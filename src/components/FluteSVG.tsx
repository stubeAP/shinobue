import React from 'react';
import { FluteHole } from './FluteHole';

interface FluteSVGProps {
  index: number;
  holes: boolean[];
  onToggleHole: (holeIndex: number) => void;
}

export const FluteSVG: React.FC<FluteSVGProps> = ({ index, holes, onToggleHole }) => {
  const holePositions = [100, 300, 350, 400, 550, 600, 650, 700];
  const dividerPositions = [[150, 170], [450, 470]];

  return (
    <div className="flex items-center mb-2 min-w-[300px]">
      <div className="w-10 md:w-12 text-right pr-2 text-gray-500 text-sm">
        {(index + 1).toString().padStart(3, '0')}
      </div>
      <div className="overflow-x-auto">
        <svg viewBox="0 0 800 60" width="100%" height="32" className="min-w-[600px]">
          {/* Flute body */}
          <rect
            x="50"
            y="10"
            width="700"
            height="40"
            fill="white"
            stroke="black"
            strokeWidth="2"
          />
          
          {/* Divider lines */}
          {dividerPositions.flat().map((x, i) => (
            <line
              key={i}
              x1={x}
              y1="10"
              x2={x}
              y2="50"
              stroke="blue"
              strokeWidth="2"
            />
          ))}
          
          {/* Holes */}
          {holePositions.map((x, i) => (
            <FluteHole
              key={i}
              x={x}
              filled={holes[i]}
              onClick={() => onToggleHole(i)}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};