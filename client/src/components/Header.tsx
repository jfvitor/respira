import { Link, useLocation } from "wouter";
import { Heart, BookOpen, Leaf } from "lucide-react";
import { motion } from "framer-motion";

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  ariaLabel: string;
}

export function Header() {
  const [location] = useLocation();

  const navItems: NavItem[] = [
    { path: "/", label: "Início", icon: <Heart className="w-4 h-4 sm:w-5 sm:h-5" />, ariaLabel: "Ir para página inicial" },
    { path: "/resources", label: "Recursos", icon: <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />, ariaLabel: "Ver recursos de apoio" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 px-4 py-4 md:px-8" role="banner">
      <nav className="max-w-4xl mx-auto glass-panel rounded-2xl px-6 py-3 flex items-center justify-between" aria-label="Navegação principal">
        <Link href="/" className="flex items-center gap-3 group outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg p-1" aria-label="Cuidar.mente - Ir para início">
          <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
            <Leaf className="w-5 h-5 text-primary" aria-hidden="true" />
          </div>
          <span className="font-display font-bold text-base sm:text-lg text-foreground tracking-wide">
            Cuidar.mente
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2" role="menubar">
          {navItems.map((item) => {
            const isActive = location === item.path || (item.path !== "/" && location.startsWith(item.path));
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className="relative px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-sm sm:text-base font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                aria-label={item.ariaLabel}
                aria-current={isActive ? "page" : undefined}
              >
                <span className={`relative z-10 flex items-center gap-2 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                  {item.icon}
                  <span className="hidden sm:inline">{item.label}</span>
                </span>
                
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-primary rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
