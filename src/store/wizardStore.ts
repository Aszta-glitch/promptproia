import { create } from 'zustand';

export type ProjectType = 'crud' | 'dashboard' | 'saas' | 'landing' | 'tool' | 'mobile' | 'ecommerce' | 'portfolio' | 'chatbot';
export type ComplexityLevel = 'mvp' | 'intermediate' | 'advanced';
export type VisualStyle = 'minimalist' | 'modern' | 'bold';
export type AIPlatform = 'lovable' | 'cursor' | 'bolt' | 'v0' | 'replit' | 'chatgpt' | 'claude' | 'gemini' | 'copilot' | 'other';

export interface WizardState {
  currentStep: number;
  aiPlatform: AIPlatform | null;
  projectType: ProjectType | null;
  objective: string;
  contextAnswers: Record<string, string>;
  targetAudience: string;
  complexity: ComplexityLevel | null;
  visualStyle: VisualStyle | null;
  referenceImages: string[];
  generatedPrompt: string | null;
  
  // Actions
  setStep: (step: number) => void;
  setAIPlatform: (platform: AIPlatform) => void;
  setProjectType: (type: ProjectType) => void;
  setObjective: (objective: string) => void;
  setContextAnswers: (answers: Record<string, string>) => void;
  setTargetAudience: (audience: string) => void;
  setComplexity: (level: ComplexityLevel) => void;
  setVisualStyle: (style: VisualStyle) => void;
  setReferenceImages: (images: string[]) => void;
  setGeneratedPrompt: (prompt: string) => void;
  reset: () => void;
  nextStep: () => void;
  prevStep: () => void;
}

const initialState = {
  currentStep: 0,
  aiPlatform: null,
  projectType: null,
  objective: '',
  contextAnswers: {},
  targetAudience: '',
  complexity: null,
  visualStyle: null,
  referenceImages: [],
  generatedPrompt: null,
};

export const useWizardStore = create<WizardState>((set) => ({
  ...initialState,
  
  setStep: (step) => set({ currentStep: step }),
  setAIPlatform: (platform) => set({ aiPlatform: platform }),
  setProjectType: (type) => set({ projectType: type }),
  setObjective: (objective) => set({ objective }),
  setContextAnswers: (answers) => set({ contextAnswers: answers }),
  setTargetAudience: (audience) => set({ targetAudience: audience }),
  setComplexity: (level) => set({ complexity: level }),
  setVisualStyle: (style) => set({ visualStyle: style }),
  setReferenceImages: (images) => set({ referenceImages: images }),
  setGeneratedPrompt: (prompt) => set({ generatedPrompt: prompt }),
  reset: () => set(initialState),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
}));
