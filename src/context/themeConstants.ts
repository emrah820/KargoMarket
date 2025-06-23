// Ortak tema tipleri ve sabitleri
export type TransportMode = 'road' | 'sea' | 'air' | 'rail' | '';

export interface ThemeConfig {
  bgColor: string;
  bgImage: string;
  primary: string;
  secondary: string;
  accent: string;
}

export const modeThemes: Record<TransportMode, ThemeConfig> = {
  road: {
    bgColor: '#e0f7fa',
    bgImage: 'https://cdn-icons-png.flaticon.com/512/1995/1995476.png',
    primary: '#0288d1',
    secondary: '#26c6da',
    accent: '#ffb300',
  },
  sea: {
    bgColor: '#e3f2fd',
    bgImage: 'https://cdn-icons-png.flaticon.com/512/1995/1995526.png',
    primary: '#1976d2',
    secondary: '#64b5f6',
    accent: '#00bcd4',
  },
  air: {
    bgColor: '#e0f2f1',
    bgImage: 'https://cdn-icons-png.flaticon.com/512/1995/1995502.png',
    primary: '#00bcd4',
    secondary: '#4dd0e1',
    accent: '#ffd600',
  },
  rail: {
    bgColor: '#f3e5f5',
    bgImage: 'https://cdn-icons-png.flaticon.com/512/1995/1995486.png',
    primary: '#8e24aa',
    secondary: '#ce93d8',
    accent: '#ff7043',
  },
  '': {
    bgColor: '#f9fafb',
    bgImage: '',
    primary: '#3B82F6',
    secondary: '#10B981',
    accent: '#f59e42',
  },
};
