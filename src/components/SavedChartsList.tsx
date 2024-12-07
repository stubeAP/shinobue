import React from 'react';
import { SavedChart } from '../types';
import { FileText, Trash2 } from 'lucide-react';

interface SavedChartsListProps {
  charts: SavedChart[];
  onChartSelect: (chart: SavedChart) => void;
  onChartDelete: (id: string) => void;
}

export const SavedChartsList: React.FC<SavedChartsListProps> = ({ 
  charts, 
  onChartSelect,
  onChartDelete 
}) => {
  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('この運指表を削除してもよろしいですか？')) {
      onChartDelete(id);
    }
  };

  return (
    <div className="h-full p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 mt-12 md:mt-0">保存された運指表</h2>
      {charts.length === 0 ? (
        <p className="text-gray-500 text-sm">保存された運指表はありません</p>
      ) : (
        <ul className="space-y-2">
          {charts.map((chart) => (
            <li key={chart.id}>
              <button
                onClick={() => onChartSelect(chart)}
                className="w-full text-left p-2 hover:bg-gray-100 rounded-md flex items-center gap-2 group"
              >
                <FileText size={16} />
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{chart.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(chart.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={(e) => handleDelete(e, chart.id)}
                  className="p-1 hover:bg-red-100 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  title="削除"
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};