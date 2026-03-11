# 💚 Cuidar.mente

Uma plataforma web acolhedora para bem-estar emocional, com mensagens motivacionais personalizadas por humor, recursos de apoio, e compartilhamento social.

**🔗 Demo:** [Veja o projeto em ação](https://seu-dominio.com)

---

## ✨ Funcionalidades

- 🎭 **Seletor de Humor**: Escolha entre 5 humores (Feliz, Neutro, Cansado, Ansioso, Triste)
- 💬 **Mensagens Personalizadas**: 60 mensagens motivacionais pré-definidas e revisadas
- 📱 **Design Responsivo**: Mobile-first, funciona em todos os dispositivos
- 🎨 **UI Acolhedora**: Paleta de cores suaves e design calmo
- 🔄 **Limite Diário**: Máximo 3 mensagens por dia, reseta automaticamente
- 💾 **Persistência**: Guarda preferências em localStorage
- 📊 **Cartão Compartilhável**: Gere imagens para compartilhar no WhatsApp, Facebook, Email
- 📚 **Recursos de Apoio**: +25 links de linhas de apoio, livros, cursos, vídeos
- ♿ **Acessibilidade**: ARIA labels, navegação por teclado, suporte a motion reduzido

---

## 🚀 Quick Start

### Localmente

```bash
# Clonar
git clone https://github.com/seu-usuario/cuidar-mente.git
cd cuidar-mente

# Instalar
npm install

# Desenvolvimento
npm run dev
# Abrir http://localhost:5000

# Build
npm run build
```

### Deploy

Veja **[DEPLOY_GUIDE.md](DEPLOY_GUIDE.md)** para 4 opções:
1. **GitHub Pages** - Grátis, simples (apenas frontend)
2. **Vercel** - Grátis, rápido (fullstack)
3. **Railway** - Grátis, completo (fullstack + DB)
4. **Netlify** - Grátis, fácil (frontend)

---

## 📁 Estrutura do Projeto

```
cuidar-mente/
├── client/                    # Frontend React + Vite
│   └── src/
│       ├── pages/            # Páginas (Home, MoodResponse, Resources)
│       ├── components/       # Componentes reutilizáveis (Header, Footer, QuoteCard)
│       ├── hooks/            # React hooks customizados
│       ├── lib/              # Lógica compartilhada (quotes, firebase-config)
│       └── index.css         # Estilos globais + Tailwind
├── server/                    # Backend Express + Node.js
│   ├── index.ts             # Servidor Express
│   ├── routes.ts            # Endpoints API
│   ├── storage.ts           # Interface de armazenamento
│   └── db.ts                # Conexão PostgreSQL (Drizzle)
├── shared/                    # Código compartilhado (tipos, schemas)
│   ├── schema.ts            # Drizzle + Zod schemas
│   └── routes.ts            # Contrato de API
├── DEPLOY_GUIDE.md          # Guia de deployment
├── FIREBASE_README.md       # Instruções Firebase
└── package.json

```

---

## 🎓 Arquitetura

### Frontend
- **React 18** com hooks
- **Vite** para bundling rápido
- **Framer Motion** para animações suaves
- **Tailwind CSS** para styling
- **Wouter** para routing
- **TanStack Query** para estado/cache
- **Zod** para validação

### Backend
- **Express** para API
- **PostgreSQL** para persistência
- **Drizzle ORM** para tipo-segurança
- **Zod** para validação

### Features Prontas para Futuro
- 🔥 Firebase integrado (pronto, não ativado)
- 📊 Estrutura para analytics
- 🛒 Campos para links afiliados

---

## 📖 Como Funciona

### Geração de Mensagens

As mensagens **NÃO são geradas por IA**. Temos uma base de dados local com 60 mensagens pré-definidas e revisadas manualmente:

```typescript
// client/src/lib/quotes.ts
MOOD_QUOTES = {
  feliz: [12 mensagens], 
  neutro: [12 mensagens],
  cansado: [12 mensagens],
  ansioso: [12 mensagens],
  triste: [12 mensagens],
}
```

**Fluxo:**
1. Utilizador seleciona um humor
2. Sistema escolhe uma mensagem aleatória
3. Guardada em localStorage (com data)
4. Se recarregar a página, mostra a MESMA mensagem
5. Pode gerar até 3 novas por dia
6. Reseta automaticamente no próximo dia

### Persistência de Dados

| Dado | Onde? | Persistência |
|------|-------|--------------|
| Mensagens favoritas | localStorage | Por navegador |
| Histórico de humores | Será: Firebase | Cloud |
| Recursos | Backend API | PostgreSQL |
| Preferências de usuário | Será: Firebase | Cloud |

---

## 🔧 Variáveis de Ambiente (Opcional)

Para ativar Firebase (futuramente):

```bash
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx
VITE_FIREBASE_PROJECT_ID=xxx
VITE_FIREBASE_STORAGE_BUCKET=xxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=xxx
```

Veja `FIREBASE_README.md` para instruções completas.

---

## 🧪 Desenvolvimento

```bash
# TypeScript check
npm run check

# Lint (se configurado)
npm run lint

# Teste
npm test

# Build
npm run build

# Preview do build
npm run preview
```

---

## 📱 Testes de Navegador

- ✅ Chrome/Edge (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## ♿ Acessibilidade

- ARIA labels em todos os elementos interativos
- Suporte a navegação por teclado (Tab, Enter, Escape)
- Contraste adequado (WCAG AA)
- Suporte a `prefers-reduced-motion`
- Sem dependência de cor para comunicar informação

---

## 🤝 Contribuir

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/melhoria`)
3. Commit suas mudanças (`git commit -m 'Adiciona melhoria'`)
4. Push para a branch (`git push origin feature/melhoria`)
5. Abra um Pull Request

---

## 📄 Licença

MIT - Veja LICENSE.md

---

## 💙 Apoio & Contatos

Se está em crise:
- 📞 **CVV** (Brasil): **188** ou https://www.cvv.org.br
- 📞 **Telefone da Esperança**: https://www.telefonedaesperanca.org.br

---

## 🙏 Créditos

Desenvolvido com cuidado para ajudar pessoas a cuidarem do seu bem-estar emocional.

---

**Questões? Abra uma issue no GitHub ou contacte-nos.** 💚
