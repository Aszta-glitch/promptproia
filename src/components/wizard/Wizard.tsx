import { useWizardStore } from '@/store/wizardStore';
import { ProgressBar } from './ProgressBar';
import { AIPlatformStep } from './steps/AIPlatformStep';
import { ProjectTypeStep } from './steps/ProjectTypeStep';
import { ObjectiveStep } from './steps/ObjectiveStep';
import { ContextQuestionsStep } from './steps/ContextQuestionsStep';
import { AudienceStep } from './steps/AudienceStep';
import { ComplexityStep } from './steps/ComplexityStep';
import { ReferenceImagesStep } from './steps/ReferenceImagesStep';
import { VisualStyleStep } from './steps/VisualStyleStep';
import { ResultStep } from './steps/ResultStep';

const TOTAL_STEPS = 9;

const steps = [
  AIPlatformStep,
  ProjectTypeStep,
  ObjectiveStep,
  ContextQuestionsStep,
  AudienceStep,
  ComplexityStep,
  ReferenceImagesStep,
  VisualStyleStep,
  ResultStep,
];

export const Wizard = () => {
  const { currentStep } = useWizardStore();
  const CurrentStepComponent = steps[currentStep];

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {currentStep < TOTAL_STEPS - 1 && (
        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS - 1} />
      )}
      <CurrentStepComponent />
    </div>
  );
};
