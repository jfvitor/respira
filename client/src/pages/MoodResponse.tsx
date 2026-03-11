import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, BookOpen, Share2, Download, Copy, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import { QuoteCard } from "@/components/QuoteCard";
import {
  getStoredQuote,
  saveQuote,
  getDailyQuoteCount,
  getRandomQuote,
  MOOD_QUOTES,
} from "@/lib/quotes";

const MOOD_RESPONSES: Record<string, { title: string; color: string }> = {
  feliz: {
    title: "Que alegria!",
    color: "bg-mood-feliz text-yellow-800",
  },
  neutro: {
    title: "Pausa suave.",
    color: "bg-mood-neutro text-slate-800",
  },
  cansado: {
    title: "Hora de recarregar.",
    color: "bg-mood-cansado text-purple-900",
  },
  ansioso: {
    title: "Respire fundo...",
    color: "bg-mood-ansioso text-orange-900",
  },
  triste: {
    title: "Tudo bem não estar bem.",
    color: "bg-mood-triste text-blue-900",
  },
};

const MOODS_PT: Record<string, string> = {
  feliz: "Feliz",
  neutro: "Neutro",
  cansado: "Cansado",
  ansioso: "Ansioso",
  triste: "Triste",
};

export default function MoodResponse({ params }: { params: { slug: string } }) {
  const slug = params.slug.toLowerCase();
  const [, setLocation] = useLocation();
  const [quote, setQuote] = useState<string>("");
  const [dailyCount, setDailyCount] = useState<number>(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const quoteCardRef = useRef<HTMLDivElement>(null);

  const response = MOOD_RESPONSES[slug] || {
    title: "Estamos aqui por você.",
    color: "bg-secondary text-secondary-foreground",
  };

  const MAX_QUOTES_PER_DAY = 3;
  const hasReachedLimit = dailyCount >= MAX_QUOTES_PER_DAY;

  // Initialize quote on mount
  useEffect(() => {
    const stored = getStoredQuote(slug);
    if (stored) {
      setQuote(stored.quote);
      setDailyCount(stored.dailyCount);
    } else {
      const newQuote = getRandomQuote(slug);
      setQuote(newQuote);
      saveQuote(slug, newQuote, 0, 1);
      setDailyCount(1);
    }
  }, [slug]);

  const handleGenerateNew = () => {
    if (hasReachedLimit) return;

    const quotes = MOOD_QUOTES[slug] || MOOD_QUOTES.neutro;
    let newQuote = getRandomQuote(slug);

    // Ensure we don't get the same quote twice
    while (newQuote === quote && quotes.length > 1) {
      newQuote = getRandomQuote(slug);
    }

    const newCount = dailyCount + 1;
    setQuote(newQuote);
    setDailyCount(newCount);
    saveQuote(slug, newQuote, newCount - 1, newCount);
  };

  const handleDownloadImage = async () => {
    if (!quoteCardRef.current) return;

    try {
      const dataUrl = await toPng(quoteCardRef.current);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `cuidar-mente-${slug}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Erro ao baixar imagem:", err);
    }
  };

  const handleShareWhatsApp = () => {
    const text = `"${quote}" - Cuidar.mente`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handleShareFacebook = () => {
    const url = window.location.href;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, "_blank");
  };

  const handleShareEmail = () => {
    const subject = "Leia esta mensagem inspiradora - Cuidar.mente";
    const body = `"${quote}"\n\nEncontrei esta mensagem no Cuidar.mente e gostaria de compartilhar com você.`;
    const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full pb-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
        className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full ${response.color.split(" ")[0]} opacity-20 blur-2xl absolute top-32 sm:top-40`}
        aria-hidden="true"
      />

      <div className="glass-panel p-6 sm:p-10 md:p-12 rounded-3xl relative z-10 w-full">
        <div className={`w-16 h-2 rounded-full mx-auto mb-8 ${response.color.split(" ")[0]}`} aria-hidden="true" />

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display text-foreground mb-3 text-center">
          {response.title}
        </h1>

        <p className="text-center text-muted-foreground text-base sm:text-lg mb-10">
          Para você, {MOODS_PT[slug] || "amigo"}
        </p>

        {/* Quote Card Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10 w-full max-w-sm mx-auto"
        >
          <QuoteCard ref={quoteCardRef} quote={quote} mood={slug} />
        </motion.div>

        {/* Quote Text */}
        <motion.p
          key={quote}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl sm:text-2xl text-center text-foreground italic mb-8 leading-relaxed px-4"
        >
          "{quote}"
        </motion.p>

        {/* Limit Message */}
        {hasReachedLimit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-8 p-4 sm:p-6 bg-muted/50 rounded-2xl"
            role="status"
            aria-live="polite"
          >
            <p className="text-muted-foreground text-sm sm:text-base">
              É tudo que temos para você hoje. Volte amanhã para mais palavras 💛
            </p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mb-8">
          <button
            onClick={handleGenerateNew}
            disabled={hasReachedLimit}
            aria-label={hasReachedLimit ? "Limite de mensagens atingido" : "Gerar nova mensagem"}
            className={`w-full px-6 py-3 sm:py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all outline-none focus-visible:ring-2 text-base sm:text-lg ${
              hasReachedLimit
                ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                : "bg-primary text-primary-foreground hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-primary/30"
            }`}
          >
            ✨ Gerar Nova Mensagem
          </button>

          {/* Share Menu Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              aria-expanded={showShareMenu}
              aria-label="Abrir menu de compartilhamento"
              className="w-full px-6 py-3 sm:py-4 rounded-xl font-medium flex items-center justify-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-secondary/30 text-base sm:text-lg"
            >
              <Share2 className="w-5 h-5" />
              Compartilhar Mensagem
            </button>

            {/* Share Options */}
            {showShareMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 left-0 right-0 bg-card border border-card-border rounded-2xl shadow-lg z-50 overflow-hidden"
                role="menu"
              >
                <button
                  onClick={handleShareWhatsApp}
                  role="menuitem"
                  className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-3 border-b border-card-border last:border-b-0 transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/30 outline-none"
                >
                  <MessageCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Compartilhar no WhatsApp</span>
                </button>

                <button
                  onClick={handleShareFacebook}
                  role="menuitem"
                  className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-3 border-b border-card-border last:border-b-0 transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/30 outline-none"
                >
                  <Share2 className="w-5 h-5 flex-shrink-0" />
                  <span>Compartilhar no Facebook</span>
                </button>

                <button
                  onClick={handleShareEmail}
                  role="menuitem"
                  className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-3 border-b border-card-border last:border-b-0 transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/30 outline-none"
                >
                  <Share2 className="w-5 h-5 flex-shrink-0" />
                  <span>Enviar por Email</span>
                </button>

                <button
                  onClick={handleDownloadImage}
                  role="menuitem"
                  className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-3 border-b border-card-border last:border-b-0 transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/30 outline-none"
                >
                  <Download className="w-5 h-5 flex-shrink-0" />
                  <span>Baixar Imagem</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  role="menuitem"
                  className="w-full px-4 py-3 text-left hover:bg-muted flex items-center gap-3 transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/30 outline-none"
                >
                  <Copy className="w-5 h-5 flex-shrink-0" />
                  <span>{copied ? "Copiado!" : "Copiar Link"}</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setLocation("/")}
            className="w-full sm:w-auto px-6 py-3 sm:py-4 rounded-xl font-medium flex items-center justify-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors focus-visible:ring-2 focus-visible:ring-secondary/30 outline-none text-base sm:text-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar ao Início
          </button>

          <button
            onClick={() => setLocation("/resources")}
            className="w-full sm:w-auto px-6 py-3 sm:py-4 rounded-xl font-medium flex items-center justify-center gap-2 bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary/30 text-base sm:text-lg"
          >
            <BookOpen className="w-5 h-5" />
            Ver Recursos de Apoio
          </button>
        </div>
      </div>
    </div>
  );
}
