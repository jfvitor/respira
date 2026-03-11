import { forwardRef } from "react";

interface QuoteCardProps {
  quote: string;
  mood: string;
}

const moodGradients: Record<string, string> = {
  feliz: "from-yellow-100 via-orange-50 to-rose-100",
  neutro: "from-slate-100 via-blue-50 to-slate-100",
  cansado: "from-purple-100 via-indigo-50 to-purple-100",
  ansioso: "from-orange-100 via-amber-50 to-orange-100",
  triste: "from-blue-100 via-cyan-50 to-blue-100",
};

const moodColors: Record<string, string> = {
  feliz: "text-yellow-700",
  neutro: "text-slate-700",
  cansado: "text-purple-700",
  ansioso: "text-orange-700",
  triste: "text-blue-700",
};

export const QuoteCard = forwardRef<HTMLDivElement, QuoteCardProps>(
  ({ quote, mood }, ref) => {
    const gradient = moodGradients[mood] || moodGradients.neutro;
    const color = moodColors[mood] || moodColors.neutro;

    return (
      <div
        ref={ref}
        className={`w-full aspect-square bg-gradient-to-br ${gradient} rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-xl`}
      >
        {/* Abstract shapes */}
        <div className="absolute top-8 right-8 w-24 h-24 rounded-full opacity-20 blur-xl bg-white" />
        <div className="absolute bottom-12 left-8 w-32 h-32 rounded-full opacity-10 blur-2xl bg-black" />
        <div className="absolute top-1/3 left-1/4 w-20 h-20 rounded-full opacity-15 blur-lg bg-current" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8">
          <div className="text-center flex-1 flex items-center justify-center">
            <p className={`text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight ${color}`}>
              "{quote}"
            </p>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm opacity-60 font-medium tracking-wide">
              Cuidar.mente
            </p>
          </div>
        </div>
      </div>
    );
  }
);

QuoteCard.displayName = "QuoteCard";
