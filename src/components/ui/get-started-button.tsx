import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GetStartedButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function GetStartedButton({ children = "Get Started", onClick, className }: GetStartedButtonProps) {
  return (
    <Button 
      className={cn(
        "group relative overflow-hidden bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 hover:from-blue-600 hover:via-blue-700 hover:to-cyan-600 text-white border-0 shadow-lg shadow-blue-500/30 rounded-md",
        className
      )} 
      size="xl"
      onClick={onClick}
    >
      <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0">
        {children}
      </span>
      <i className="absolute right-1 top-1 bottom-1 rounded-sm z-10 grid w-1/4 place-items-center transition-all duration-500 bg-primary-foreground/15 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95">
        <ChevronRight size={20} strokeWidth={2} aria-hidden="true" />
      </i>
    </Button>
  );
}
