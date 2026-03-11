import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";

interface MoodButtonProps {
  label: string;
  icon: LucideIcon;
  colorClass: string;
  onClick: () => void;
  disabled?: boolean;
}

export function MoodButton({ label, icon: Icon, colorClass, onClick, disabled }: MoodButtonProps) {
  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative group flex flex-col items-center justify-center gap-4 
        p-6 sm:p-8 rounded-3xl w-full
        bg-white border border-border/50
        shadow-sm shadow-black/5 hover:shadow-xl
        transition-all duration-300 ease-out outline-none
        focus-visible:ring-4 focus-visible:ring-primary/20
        disabled:opacity-60 disabled:cursor-not-allowed
      `}
    >
      {/* Soft color glow effect in background on hover */}
      <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${colorClass}`} />
      
      <div className={`
        p-4 rounded-2xl ${colorClass} text-foreground/80
        shadow-sm shadow-black/5 group-hover:shadow-md
        transition-all duration-300
      `}>
        <Icon className="w-8 h-8 sm:w-10 sm:h-10" strokeWidth={2} />
      </div>
      
      <span className="font-display font-semibold text-base sm:text-lg text-foreground/80 group-hover:text-foreground transition-colors">
        {label}
      </span>
    </motion.button>
  );
}
