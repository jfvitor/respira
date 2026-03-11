export const MOOD_QUOTES: Record<string, string[]> = {
  feliz: [
    "A felicidade é a maior forma de riqueza.",
    "Continue sorrindo, o mundo precisa do seu brilho.",
    "Cada dia é uma nova oportunidade para ser grato.",
    "A alegria é contagiosa, espalhe-a por onde vai.",
    "Você merece toda a felicidade do mundo.",
    "Sua energia positiva inspira quem está ao seu redor.",
    "Continue celebrando as pequenas vitórias da vida.",
    "A felicidade não é um destino, é uma jornada.",
    "Você é mais forte do que pensa e mais capaz do que imagina.",
    "Que este momento de alegria perdure em seu coração.",
    "A vida é mais bonita quando compartilhamos alegria.",
    "Você nasceu para brilhar, continue assim.",
  ],
  neutro: [
    "Tudo bem estar em paz consigo mesmo.",
    "Os momentos de tranquilidade são sagrados.",
    "A calma é o reflexo de uma mente sábia.",
    "Você não precisa sentir tudo ao mesmo tempo.",
    "A neutralidade permite que você veja claro.",
    "Respire fundo e aprecie a serenidade do momento.",
    "Estar bem consigo é o primeiro passo para estar bem com o mundo.",
    "A paz interior não precisa de motivos, só de aceitação.",
    "Você é suficiente exatamente como está.",
    "O silêncio interno é onde mora a verdadeira sabedoria.",
    "Cada momento de calma é uma bênção.",
    "Equilibre-se, o caminho se revelará.",
  ],
  cansado: [
    "Descanso é resistência, não fraqueza.",
    "Seu corpo está pedindo o que você merece: repouso.",
    "Durma bem, amanhã é um novo dia.",
    "Você não é máquina, você é humano.",
    "Está tudo bem diminuir o ritmo.",
    "Cuide de si como cuidaria de alguém que ama.",
    "O descanso não é preguiça, é autocuidado.",
    "Permita-se recuperar as energias.",
    "Você já fez o suficiente por hoje.",
    "A fadiga diz que você trabalhou bem, agora é hora de repousar.",
    "Feche os olhos e deixe o corpo relaxar.",
    "Dê ao seu corpo o repouso que merece.",
  ],
  ansioso: [
    "Respire: você está seguro neste momento.",
    "Ansiedade é apenas uma emoção, não é a verdade.",
    "Você já superou 100% das piores situações.",
    "Controle o que está em seu controle, deixe o resto ir.",
    "Cada respiração te traz de volta ao presente.",
    "Você é mais bravo do que sua ansiedade.",
    "O medo diminui quando você respira fundo.",
    "Um passo de cada vez, você consegue.",
    "Grounding: nome 5 coisas que você vê, 4 que toca, 3 que ouve, 2 que cheira, 1 que sente.",
    "Sua mente está tentando protegê-lo, obrigado mente, mas está tudo bem.",
    "Ansiedade é preocupação sobre o futuro, você está seguro AGORA.",
    "Você não está sozinho, essa emoção é passageira.",
  ],
  triste: [
    "Está tudo bem chorar, as lágrimas curam.",
    "Sua tristeza é válida e importante.",
    "Dias mais claros virão, prometo.",
    "Você é forte porque continua tentando.",
    "A tristeza faz parte da vida, e você está vivo.",
    "Cada noite tem seu amanhecer.",
    "Você não está abandonado, mesmo que se sinta só.",
    "Está tudo bem não estar bem.",
    "Sua dor importa, você importa.",
    "O sofrimento é temporário, você é permanente.",
    "Busque ajuda se precisar, não é fraqueza.",
    "Este sentimento vai passar, mas sua força permanece.",
  ],
};

export interface QuoteState {
  mood: string;
  quote: string;
  index: number;
  savedDate: string;
  dailyCount: number;
}

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

export function getStoredQuote(mood: string): QuoteState | null {
  const stored = localStorage.getItem(`mood_quote_${mood}`);
  if (!stored) return null;

  const state = JSON.parse(stored) as QuoteState;
  const today = getTodayDate();

  // Reset if date has changed
  if (state.savedDate !== today) {
    return null;
  }

  return state;
}

export function saveQuote(mood: string, quote: string, index: number, dailyCount: number): void {
  const state: QuoteState = {
    mood,
    quote,
    index,
    savedDate: getTodayDate(),
    dailyCount,
  };
  localStorage.setItem(`mood_quote_${mood}`, JSON.stringify(state));
}

export function getDailyQuoteCount(mood: string): number {
  const stored = getStoredQuote(mood);
  if (!stored) {
    return 0;
  }
  return stored.dailyCount;
}

export function incrementDailyCount(mood: string): number {
  const current = getDailyQuoteCount(mood);
  const newCount = current + 1;
  const quote = MOOD_QUOTES[mood][(current) % MOOD_QUOTES[mood].length];
  saveQuote(mood, quote, current, newCount);
  return newCount;
}

export function getRandomQuote(mood: string): string {
  const quotes = MOOD_QUOTES[mood] || MOOD_QUOTES.neutro;
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}
