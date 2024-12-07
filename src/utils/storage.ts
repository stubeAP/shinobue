import { HoleState, SavedChart } from '../types';

const STORAGE_KEY = 'flute-chart-state';
const SAVED_CHARTS_KEY = 'saved-flute-charts';

export const saveState = (state: HoleState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const loadState = (): HoleState | null => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return null;
};

export const saveChart = (chart: SavedChart) => {
  const savedCharts = getSavedCharts();
  savedCharts.push(chart);
  localStorage.setItem(SAVED_CHARTS_KEY, JSON.stringify(savedCharts));
};

export const deleteChart = (id: string) => {
  const savedCharts = getSavedCharts();
  const filteredCharts = savedCharts.filter(chart => chart.id !== id);
  localStorage.setItem(SAVED_CHARTS_KEY, JSON.stringify(filteredCharts));
  return filteredCharts;
};

export const getSavedCharts = (): SavedChart[] => {
  const saved = localStorage.getItem(SAVED_CHARTS_KEY);
  return saved ? JSON.parse(saved) : [];
};

export const loadChart = (id: string): SavedChart | null => {
  const charts = getSavedCharts();
  return charts.find(chart => chart.id === id) || null;
};