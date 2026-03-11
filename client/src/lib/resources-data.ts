export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  url: string;
  type: string;
  category: string;
}

export const RESOURCES_BY_CATEGORY: Record<string, ResourceItem[]> = {
  apoio: [
    {
      id: "cvv",
      title: "Centro de Valorização da Vida (CVV)",
      description: "Apoio emocional e prevenção do suicídio. Atendimento voluntário e gratuito sob total sigilo. Disque 188.",
      url: "https://www.cvv.org.br/",
      type: "hotline",
      category: "apoio"
    },
  ],
  livros: [
    {
      id: "bh-mindfulness",
      title: "Atenção Plena Para Iniciantes",
      description: "Um guia prático para entender mindfulness e incorporar técnicas de meditação no seu dia a dia.",
      url: "https://www.skoob.com.br/livro/411343",
      type: "book",
      category: "livros"
    },
    {
      id: "pensando-rapido",
      title: "Rápido e Devagar",
      description: "Daniel Kahneman explora como nosso cérebro toma decisões e como lidar com vieses cognitivos.",
      url: "https://www.skoob.com.br/livro/77698",
      type: "book",
      category: "livros"
    },
    {
      id: "hábitos-atômicos",
      title: "Hábitos Atômicos",
      description: "James Clear mostra como pequenas mudanças consistentes podem levar a resultados extraordinários.",
      url: "https://www.skoob.com.br/livro/26486",
      type: "book",
      category: "livros"
    },
    {
      id: "coragem-ser",
      title: "A Coragem de Ser",
      description: "Brené Brown explora a vulnerabilidade e como abraçá-la para viver melhor.",
      url: "https://www.skoob.com.br/livro/8395",
      type: "book",
      category: "livros"
    },
  ],
  musica: [
    {
      id: "spotify-relaxamento",
      title: "Spotify - Sleep Sounds",
      description: "Playlist curada com sons relaxantes, natureza e meditação para ajudar você a descansar.",
      url: "https://open.spotify.com/playlist/0pFxNlmyEmMOsqyPVBIULS",
      type: "music",
      category: "musica"
    },
    {
      id: "youtube-meditacao",
      title: "YouTube - Meditação Guiada (Bem-Estar & Cia)",
      description: "Canal dedicado a meditações guiadas, relaxamento e técnicas de respiração.",
      url: "https://www.youtube.com/@bem-estareacia",
      type: "music",
      category: "musica"
    },
    {
      id: "apple-music-mindfulness",
      title: "Apple Music - Mindfulness Mixes",
      description: "Seleção de músicas para focar, relaxar e meditar.",
      url: "https://music.apple.com/",
      type: "music",
      category: "musica"
    },
  ],
  cursos: [
    {
      id: "coursera-mindfulness",
      title: "Coursera - Mindfulness for Wellbeing and Peak Performance",
      description: "Curso online gratuito sobre mindfulness e como usá-lo para melhorar bem-estar e desempenho.",
      url: "https://www.coursera.org/",
      type: "course",
      category: "cursos"
    },
    {
      id: "udemy-autocuidado",
      title: "Udemy - Autocuidado e Saúde Mental",
      description: "Curso prático sobre técnicas de autocuidado, gerenciamento de estresse e saúde emocional.",
      url: "https://www.udemy.com/",
      type: "course",
      category: "cursos"
    },
    {
      id: "alura-meditacao",
      title: "Alura - Meditação e Bem-estar",
      description: "Aprender técnicas de meditação e desenvolvimento pessoal com professores especializados.",
      url: "https://www.alura.com.br/",
      type: "course",
      category: "cursos"
    },
  ],
  videos: [
    {
      id: "psicologia-viva",
      title: "YouTube - Psicologia Viva",
      description: "Canal de psicologia com vídeos educativos sobre saúde mental, ansiedade, depressão e bem-estar.",
      url: "https://www.youtube.com/@psicologiaviva",
      type: "video",
      category: "videos"
    },
    {
      id: "ted-talks-mental",
      title: "TED Talks - Mental Health & Well-being",
      description: "Palestras inspiradoras de especialistas sobre saúde mental, resiliência e bem-estar emocional.",
      url: "https://www.ted.com/",
      type: "video",
      category: "videos"
    },
    {
      id: "meditacao-youtube",
      title: "YouTube - The Honest Guys",
      description: "Meditações guiadas em diversos temas: stress, ansiedade, sono e autoestima.",
      url: "https://www.youtube.com/@thehonesyguys",
      type: "video",
      category: "videos"
    },
  ],
  outros: [
    {
      id: "sus-saude-mental",
      title: "SUS - Serviço de Saúde Mental",
      description: "Acesso a serviços de saúde mental através do Sistema Único de Saúde (SUS). Procure a unidade mais próxima.",
      url: "https://www.gov.br/saude/pt-br",
      type: "gov",
      category: "outros"
    },
    {
      id: "telefone-esperanca",
      title: "Telefone da Esperança",
      description: "Apoio emocional e espiritual com voluntários treinados. Disponível 24h por dia.",
      url: "https://www.telefonedaesperanca.org.br/",
      type: "hotline",
      category: "outros"
    },
    {
      id: "psicologos-brasil",
      title: "CFP - Conselho Federal de Psicologia",
      description: "Encontre psicólogos credenciados e informações sobre saúde mental no Brasil.",
      url: "https://site.cfp.org.br/",
      type: "gov",
      category: "outros"
    },
    {
      id: "bullyingnao",
      title: "Bullying Não",
      description: "Plataforma de denúncia e orientação sobre bullying e cyberbullying.",
      url: "https://www.bullyingnao.com.br/",
      type: "gov",
      category: "outros"
    },
  ],
};

export const CATEGORY_LABELS: Record<string, { name: string; icon: string; description: string }> = {
  apoio: {
    name: "Contatos de Apoio",
    icon: "📞",
    description: "Linhas de apoio direto e atendimento emocional"
  },
  livros: {
    name: "📚 Livros",
    icon: "📚",
    description: "Recomendações de leitura para crescimento pessoal e bem-estar"
  },
  musica: {
    name: "🎵 Música & Playlists",
    icon: "🎵",
    description: "Seleções musicais para relaxamento, meditação e bem-estar"
  },
  cursos: {
    name: "🎓 Cursos",
    icon: "🎓",
    description: "Cursos online sobre saúde mental, mindfulness e desenvolvimento pessoal"
  },
  videos: {
    name: "🎬 Vídeos",
    icon: "🎬",
    description: "Conteúdo educativo e inspirador sobre saúde mental e bem-estar"
  },
  outros: {
    name: "🤝 Onde Procurar Ajuda",
    icon: "🤝",
    description: "Recursos governamentais e organizações oficiais de saúde mental"
  },
};
