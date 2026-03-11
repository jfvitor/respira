import { Heart, Heart as HeartIcon } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/30 bg-white/30 backdrop-blur-sm mt-16 sm:mt-20" role="contentinfo">
      <div className="max-w-4xl mx-auto px-4 py-8 md:px-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display font-bold text-lg text-foreground">
                Cuidar.mente
              </span>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Uma plataforma dedicada ao seu bem-estar emocional. Aqui você encontra apoio, recursos e mensagens de acolhimento.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Links Úteis</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a 
                  href="/" 
                  className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary/30 rounded px-2 py-1 outline-none"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="/resources" 
                  className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary/30 rounded px-2 py-1 outline-none"
                >
                  Recursos de Apoio
                </a>
              </li>
              <li>
                <a 
                  href="https://www.cvv.org.br/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary/30 rounded px-2 py-1 outline-none"
                >
                  CVV - 188
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border/30 my-6" aria-hidden="true"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-muted-foreground">
          <p>
            © {currentYear} Cuidar.mente. Feito com <HeartIcon className="w-3 h-3 inline text-rose-500" aria-label="amor" /> para seu bem-estar.
          </p>
          <p>
            Se você está em crise, ligue para CVV: <span className="font-semibold text-foreground">188</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
