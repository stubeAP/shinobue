import React, { useState, useEffect } from 'react';
import { FluteSVG } from './components/FluteSVG';
import { TitleInput } from './components/TitleInput';
import { SavedChartsList } from './components/SavedChartsList';
import { saveState, loadState, saveChart, getSavedCharts, deleteChart } from './utils/storage';
import { exportToPDF } from './utils/pdf';
import { HoleState, SavedChart } from './types';
import { Save, Menu } from 'lucide-react';

function App() {
  const [title, setTitle] = useState('');
  const [holes, setHoles] = useState<boolean[][]>([Array(8).fill(false)]);
  const [savedCharts, setSavedCharts] = useState<SavedChart[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const savedState = loadState();
    if (savedState) {
      setTitle(savedState.title);
      setHoles(savedState.holes);
    }
    setSavedCharts(getSavedCharts());
  }, []);

  useEffect(() => {
    saveState({ holes, title });
  }, [holes, title]);

  const handleToggleHole = (fluteIndex: number, holeIndex: number) => {
    const newHoles = holes.map((row, i) =>
      i === fluteIndex
        ? row.map((filled, j) => (j === holeIndex ? !filled : filled))
        : row
    );

    if (fluteIndex === holes.length - 1) {
      newHoles.push(Array(8).fill(false));
    }

    setHoles(newHoles);
  };

  const handleSaveChart = async () => {
    if (!title) {
      alert('タイトルを入力してください');
      return;
    }

    const newChart: SavedChart = {
      id: Date.now().toString(),
      title,
      holes,
      createdAt: new Date().toISOString(),
    };

    saveChart(newChart);
    setSavedCharts(getSavedCharts());
    await exportToPDF('chart-container', title);
  };

  const handleChartSelect = (chart: SavedChart) => {
    setTitle(chart.title);
    setHoles(chart.holes);
    setIsSidebarOpen(false);
  };

  const handleChartDelete = (id: string) => {
    const updatedCharts = deleteChart(id);
    setSavedCharts(updatedCharts);
  };

  return (
    <div className="flex h-screen relative">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-200 ease-in-out z-30 bg-gray-50 w-64 border-r border-gray-200`}
      >
        <SavedChartsList 
          charts={savedCharts} 
          onChartSelect={handleChartSelect} 
          onChartDelete={handleChartDelete}
        />
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <div className="flex-1 p-4 md:p-6 overflow-hidden flex flex-col h-full">
        <div className="flex-grow overflow-y-auto">
          <TitleInput title={title} onChange={setTitle} />
          
          <div id="chart-container" className="bg-white border border-gray-300 rounded-lg p-2 md:p-4">
            {holes.map((row, i) => (
              <FluteSVG
                key={i}
                index={i}
                holes={row}
                onToggleHole={(holeIndex) => handleToggleHole(i, holeIndex)}
              />
            ))}
          </div>
        </div>

        {/* Fixed bottom bar for save button */}
        <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 mt-4">
          <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-gray-600 text-sm">穴をクリックすると色が切り替わります</p>
            <button
              onClick={handleSaveChart}
              className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-full md:w-auto"
            >
              <Save size={16} />
              運指表を保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
