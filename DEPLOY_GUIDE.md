# 📖 Guia de Deploy - Cuidar.mente

Aqui estão as opções para fazer deploy do seu projeto.

---

## **Opção 1: GitHub Pages (Recomendado para Começar) 🚀**

### Pré-requisitos:
- Conta no GitHub
- Git instalado na sua máquina
- Node.js instalado

### Passo a Passo:

#### 1. **Clonar o Projeto Localmente**
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

#### 2. **Instalar Dependências**
```bash
npm install
```

#### 3. **Build do Frontend**
```bash
npm run build
```

Isto cria uma pasta `dist/public` com os ficheiros estáticos.

#### 4. **Configurar GitHub Pages**

No seu repositório GitHub:
- Vai para **Settings** → **Pages**
- Source: `Deploy from a branch`
- Branch: escolhe `main` (ou a branch que usa)
- Folder: `/` (raiz) 

OU se quer usar `/dist/public`:
- Folder: `/dist/public`

#### 5. **Fazer Push para GitHub**
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

#### 6. **GitHub Actions (Automático)**
O repositório já inclui workflow automático. A cada push:
- ✅ Faz build automaticamente
- ✅ Publica em GitHub Pages
- ✅ Disponível em `https://seu-usuario.github.io/seu-repositorio`

---

## **Opção 2: Vercel (Fullstack - Recomendado para Máxima Funcionalidade) ⚡**

Vercel suporta frontend + backend Node.js automaticamente.

### Passo a Passo:

#### 1. **Push para GitHub**
```bash
git push origin main
```

#### 2. **Ir a vercel.com**
- Faz login com GitHub
- Clica "Add New..." → "Project"
- Seleciona o repositório

#### 3. **Configurar**
- Framework: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist/public`
- Environment Variables: (deixa em branco por enquanto)

#### 4. **Deploy**
- Clica "Deploy"
- Aguarda alguns segundos
- App live em `seu-projeto.vercel.app`

---

## **Opção 3: Railway (Backend com Base de Dados) 🚂**

Railway permite hospedar frontend + backend + PostgreSQL grátis.

### Passo a Passo:

#### 1. **Ir a railway.app**
- Faz login com GitHub
- Clica "Create New Project"
- Seleciona "GitHub Repo"
- Escolhe o repositório

#### 2. **Configurar Variables**
- Adiciona `DATABASE_URL` (Railway cria automático)
- Adiciona `SESSION_SECRET` (uma string aleatória)

#### 3. **Deploy**
- Railway faz build + deploy automático
- App live em `seu-projeto.railway.app`

---

## **Opção 4: Netlify (Apenas Frontend) 🎨**

Para frontend estático no Netlify.

### Passo a Passo:

#### 1. **Ir a netlify.com**
- Faz login com GitHub
- "Add new site" → "Import an existing project"
- Seleciona repositório GitHub

#### 2. **Configurar Build**
- Build command: `npm run build`
- Publish directory: `dist/public`

#### 3. **Deploy**
- Netlify faz deploy automático
- App live em `seu-site.netlify.app`

---

## **Qual Escolher?**

| Opção | Custo | Complexidade | Base de Dados | Best For |
|-------|-------|--------------|---------------|----------|
| GitHub Pages | Grátis | Muito Fácil | Não | Protótipo, Portfolio |
| Vercel | Grátis | Fácil | Sim (separado) | Produção Fullstack |
| Railway | Grátis | Média | Sim (incluído) | Produção com DB |
| Netlify | Grátis | Fácil | Não | Frontend estático |

**Recomendação:** Comece com **Vercel** (mais rápido) ou **Railway** (mais completo).

---

## **Estrutura de Ficheiros para Build**

Depois de `npm run build`, a estrutura fica:

```
dist/
└── public/
    ├── index.html
    ├── favicon.png
    └── assets/
        ├── index-[hash].js
        └── index-[hash].css
```

Estes são os ficheiros que GitHub Pages/Vercel servem.

---

## **Variáveis de Ambiente para Deploy**

Se usar Firebase (futuramente), adicione as variáveis em:

**GitHub Pages:** Não precisa (usa localStorage)

**Vercel:** Settings → Environment Variables
```
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_PROJECT_ID=xxx
...
```

**Railway:** Variables no dashboard
```
DATABASE_URL=postgres://...
SESSION_SECRET=your-secret-here
```

---

## **Troubleshooting**

### "Erro 404 em rotas secundárias"
**Solução:** Adicionar redirecionamento para `index.html`
- GitHub Pages: cria `_redirects` com conteúdo:
  ```
  /* /index.html 200
  ```

### "Blank page / JavaScript não carrega"
**Solução:** Verificar base path em `vite.config.ts`
```typescript
export default defineConfig({
  base: '/seu-repositorio/', // Para GitHub Pages
  // ou
  base: '/', // Para domínio próprio/Vercel
})
```

### "Dados não persistem após refresh"
**Solução Esperada:** Para Opção 1 (GitHub Pages), é normal. Use localStorage ou Firebase.

---

## **Próximos Passos**

1. ✅ Escolha uma opção acima
2. ✅ Siga os passos
3. ✅ Teste o deploy
4. ✅ Partilhe a URL! 🎉

**Dúvidas?** Refira-se aos guias oficiais:
- [GitHub Pages Docs](https://pages.github.com/)
- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app/)
