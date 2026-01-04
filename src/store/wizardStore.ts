import { create } from 'zustand';

export type ProjectType = 'crud' | 'dashboard' | 'saas' | 'landing' | 'tool';
export type ComplexityLevel = 'mvp' | 'intermediate' | 'advanced';
export type VisualStyle = 'minimalist' | 'modern' | 'bold';

export interface WizardState {
  currentStep: number;
  projectType: ProjectType | null;
  objective: string;
  targetAudience: string;
  complexity: ComplexityLevel | null;
  visualStyle: VisualStyle | null;
  generatedPrompt: string | null;
  
  // Actions
  setStep: (step: number) => void;
  setProjectType: (type: ProjectType) => void;
  setObjective: (objective: string) => void;
  setTargetAudience: (audience: string) => void;
  setComplexity: (level: ComplexityLevel) => void;
  setVisualStyle: (style: VisualStyle) => void;
  setGeneratedPrompt: (prompt: string) => void;
  reset: () => void;
  nextStep: () => void;
  prevStep: () => void;
}

const initialState = {
  currentStep: 0,
  projectType: null,
  objective: '',
  targetAudience: '',
  complexity: null,
  visualStyle: null,
  generatedPrompt: null,
};

export const useWizardStore = create<WizardState>((set) => ({
  ...initialState,
  
  setStep: (step) => set({ currentStep: step }),
  setProjectType: (type) => set({ projectType: type }),
  setObjective: (objective) => set({ objective }),
  setTargetAudience: (audience) => set({ targetAudience: audience }),
  setComplexity: (level) => set({ complexity: level }),
  setVisualStyle: (style) => set({ visualStyle: style }),
  setGeneratedPrompt: (prompt) => set({ generatedPrompt: prompt }),
  reset: () => set(initialState),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
}));
