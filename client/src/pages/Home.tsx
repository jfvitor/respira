import { useLocation } from "wouter";
import { useCreateMoodLog } from "@/hooks/use-mood-logs";
import { MoodButton } from "@/components/MoodButton";
import { Sun, Meh, BatteryLow, Wind, CloudRain } from "lucide-react";

const MOODS = [
  { slug: "feliz", label: "Feliz", icon: Sun, colorClass: "bg-mood-feliz" },
  { slug: "neutro", label: "Neutro", icon: Meh, colorClass: "bg-mood-neutro" },
  { slug: "cansado", label: "Cansado", icon: BatteryLow, colorClass: "bg-mood-cansado" },
  { slug: "ansioso", label: "Ansioso", icon: Wind, colorClass: "bg-mood-ansioso" },
  { slug: "triste", label: "Triste", icon: CloudRain, colorClass: "bg-mood-triste" },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const createMoodLog = useCreateMoodLog();

  const handleMoodSelect = (slug: string) => {
    // Record the mood asynchronously, but navigate immediately for a snappy feel
    createMoodLog.mutate({ mood: slug });
    setLocation(`/mood/${slug}`);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full text-center">
      <div className="space-y-4 sm:space-y-6 mb-12 sm:mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display text-foreground">
          Olá, bem-vindo.
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto px-4">
          Este é o seu espaço seguro. Um momento para pausar e refletir.
        </p>
      </div>

      <div className="glass-panel p-8 sm:p-12 rounded-[2rem] w-full">
        <h2 className="text-2xl sm:text-3xl font-display text-foreground mb-8">
          Como você está se sentindo hoje?
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {MOODS.map((mood) => (
            <MoodButton
              key={mood.slug}
              label={mood.label}
              icon={mood.icon}
              colorClass={mood.colorClass}
              onClick={() => handleMoodSelect(mood.slug)}
              disabled={createMoodLog.isPending}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
