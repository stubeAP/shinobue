export interface HoleState {
  holes: boolean[][];
  title: string;
}

export interface SavedChart {
  id: string;
  title: string;
  holes: boolean[][];
  createdAt: string;
}