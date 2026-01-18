import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useProfile } from './useProfile';

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  accent: string;
}

// Predefined color presets
export const colorPresets = {
  crimson: { primary: '0 85% 50%', accent: '0 70% 45%', name: 'Crimson' },
  blue: { primary: '217 91% 60%', accent: '213 94% 50%', name: 'Azul' },
  green: { primary: '142 76% 45%', accent: '142 69% 38%', name: 'Verde' },
  purple: { primary: '271 91% 65%', accent: '263 70% 50%', name: 'Roxo' },
  orange: { primary: '25 95% 53%', accent: '21 90% 48%', name: 'Laranja' },
  pink: { primary: '330 81% 60%', accent: '330 65% 50%', name: 'Rosa' },
  teal: { primary: '174 84% 40%', accent: '180 70% 35%', name: 'Teal' },
  gold: { primary: '45 93% 47%', accent: '38 92% 50%', name: 'Dourado' },
};

export type ColorPresetKey = keyof typeof colorPresets;

interface ThemeContextType {
  mode: ThemeMode;
  colorPreset: ColorPresetKey;
  setMode: (mode: ThemeMode) => void;
  setColorPreset: (preset: ColorPresetKey) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_MODE_KEY = 'theme-mode';
const THEME_COLOR_KEY = 'theme-color';

function applyThemeMode(mode: ThemeMode) {
  const root = document.documentElement;
  
  if (mode === 'dark') {
    root.classList.add('dark');
    // Dark mode colors
    root.style.setProperty('--background', '0 0% 4%');
    root.style.setProperty('--foreground', '0 0% 98%');
    root.style.setProperty('--card', '0 0% 7%');
    root.style.setProperty('--card-foreground', '0 0% 98%');
    root.style.setProperty('--popover', '0 0% 7%');
    root.style.setProperty('--popover-foreground', '0 0% 98%');
    root.style.setProperty('--secondary', '0 0% 12%');
    root.style.setProperty('--secondary-foreground', '0 0% 98%');
    root.style.setProperty('--muted', '0 0% 15%');
    root.style.setProperty('--muted-foreground', '0 0% 60%');
    root.style.setProperty('--border', '0 0% 18%');
    root.style.setProperty('--input', '0 0% 18%');
    root.style.setProperty('--sidebar-background', '0 0% 4%');
    root.style.setProperty('--sidebar-foreground', '0 0% 98%');
    root.style.setProperty('--sidebar-accent', '0 0% 12%');
    root.style.setProperty('--sidebar-accent-foreground', '0 0% 98%');
    root.style.setProperty('--sidebar-border', '0 0% 18%');
  } else {
    root.classList.remove('dark');
    // Light mode colors
    root.style.setProperty('--background', '0 0% 100%');
    root.style.setProperty('--foreground', '0 0% 10%');
    root.style.setProperty('--card', '0 0% 98%');
    root.style.setProperty('--card-foreground', '0 0% 10%');
    root.style.setProperty('--popover', '0 0% 100%');
    root.style.setProperty('--popover-foreground', '0 0% 10%');
    root.style.setProperty('--secondary', '0 0% 96%');
    root.style.setProperty('--secondary-foreground', '0 0% 10%');
    root.style.setProperty('--muted', '0 0% 94%');
    root.style.setProperty('--muted-foreground', '0 0% 45%');
    root.style.setProperty('--border', '0 0% 90%');
    root.style.setProperty('--input', '0 0% 90%');
    root.style.setProperty('--sidebar-background', '0 0% 98%');
    root.style.setProperty('--sidebar-foreground', '0 0% 10%');
    root.style.setProperty('--sidebar-accent', '0 0% 94%');
    root.style.setProperty('--sidebar-accent-foreground', '0 0% 10%');
    root.style.setProperty('--sidebar-border', '0 0% 90%');
  }
}

function applyColorPreset(preset: ColorPresetKey) {
  const root = document.documentElement;
  const colors = colorPresets[preset];
  
  root.style.setProperty('--primary', colors.primary);
  root.style.setProperty('--accent', colors.accent);
  root.style.setProperty('--ring', colors.primary);
  root.style.setProperty('--gradient-start', colors.primary);
  root.style.setProperty('--gradient-mid', colors.accent);
  root.style.setProperty('--gradient-end', colors.accent);
  root.style.setProperty('--glow-primary', colors.primary);
  root.style.setProperty('--glow-accent', colors.accent);
  root.style.setProperty('--sidebar-primary', colors.primary);
  root.style.setProperty('--sidebar-ring', colors.primary);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(THEME_MODE_KEY) as ThemeMode;
      return saved || 'dark';
    }
    return 'dark';
  });

  const [colorPreset, setColorPresetState] = useState<ColorPresetKey>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(THEME_COLOR_KEY) as ColorPresetKey;
      return saved && colorPresets[saved] ? saved : 'crimson';
    }
    return 'crimson';
  });

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem(THEME_MODE_KEY, newMode);
    applyThemeMode(newMode);
  };

  const setColorPreset = (preset: ColorPresetKey) => {
    setColorPresetState(preset);
    localStorage.setItem(THEME_COLOR_KEY, preset);
    applyColorPreset(preset);
  };

  const toggleMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  // Apply theme on mount
  useEffect(() => {
    applyThemeMode(mode);
    applyColorPreset(colorPreset);
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, colorPreset, setMode, setColorPreset, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
