import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WizardStep } from '../WizardStep';
import { useWizardStore } from '@/store/wizardStore';
import { Button } from '@/components/ui/button';
import { ArrowRight, Upload, X, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MAX_IMAGES = 3;
const MAX_SIZE_MB = 5;

export const ReferenceImagesStep = () => {
  const { referenceImages, setReferenceImages, nextStep, prevStep } = useWizardStore();
  const [images, setImages] = useState<string[]>(referenceImages);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Arquivo inválido",
        description: "Por favor, selecione apenas imagens.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: `O tamanho máximo é ${MAX_SIZE_MB}MB.`,
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setImages((prev) => {
        if (prev.length >= MAX_IMAGES) {
          toast({
            title: "Limite atingido",
            description: `Máximo de ${MAX_IMAGES} imagens de referência.`,
            variant: "destructive",
          });
          return prev;
        }
        return [...prev, base64];
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(processFile);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    Array.from(files).forEach(processFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    setReferenceImages(images);
    nextStep();
  };

  return (
    <WizardStep
      stepKey="reference-images"
      title="Imagens de referência"
      subtitle="Adicione prints ou designs que servirão de inspiração (opcional)"
    >
      <div className="space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          
          <div
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`
              relative cursor-pointer border-2 border-dashed rounded-2xl p-8
              transition-all duration-300 flex flex-col items-center justify-center gap-4
              ${isDragging 
                ? 'border-primary bg-primary/10' 
                : 'border-border hover:border-primary/50 hover:bg-card/50'
              }
              ${images.length >= MAX_IMAGES ? 'opacity-50 pointer-events-none' : ''}
            `}
          >
            <div className={`
              p-4 rounded-full transition-colors duration-300
              ${isDragging ? 'bg-primary/20' : 'bg-muted'}
            `}>
              <Upload className={`w-8 h-8 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
            </div>
            <div className="text-center">
              <p className="font-medium text-foreground">
                Clique ou arraste imagens aqui
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                PNG, JPG ou WEBP (máx. {MAX_SIZE_MB}MB cada)
              </p>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="popLayout">
          {images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-3 gap-3"
            >
              {images.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative aspect-video rounded-xl overflow-hidden bg-muted group"
                >
                  <img
                    src={img}
                    alt={`Referência ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/80"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {images.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-muted-foreground text-center"
          >
            {images.length} de {MAX_IMAGES} imagens adicionadas
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4 pt-2"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={prevStep}
            className="flex-1"
          >
            Voltar
          </Button>
          <Button
            variant="gradient"
            size="lg"
            onClick={handleContinue}
            className="flex-1"
          >
            {images.length > 0 ? 'Continuar' : 'Pular'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </WizardStep>
  );
};
