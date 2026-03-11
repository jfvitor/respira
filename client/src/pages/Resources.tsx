import { useState } from "react";
import { Phone, BookText, ExternalLink, HeartPulse, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RESOURCES_BY_CATEGORY, CATEGORY_LABELS } from "@/lib/resources-data";

export default function Resources() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "hotline":
        return <Phone className="w-5 h-5" />;
      case "article":
      case "book":
        return <BookText className="w-5 h-5" />;
      default:
        return <HeartPulse className="w-5 h-5" />;
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "hotline":
        return "bg-rose-100 text-rose-700 border-rose-200";
      case "article":
      case "book":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "music":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "course":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "video":
        return "bg-green-100 text-green-700 border-green-200";
      case "gov":
        return "bg-indigo-100 text-indigo-700 border-indigo-200";
      default:
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
    }
  };

  const getTypeText = (type: string) => {
    switch (type.toLowerCase()) {
      case "hotline":
        return "Contato";
      case "article":
        return "Artigo";
      case "book":
        return "Livro";
      case "music":
        return "Música";
      case "course":
        return "Curso";
      case "video":
        return "Vídeo";
      case "gov":
        return "Governo";
      default:
        return "Recurso";
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display text-foreground mb-4">
          Recursos de Apoio
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Separamos materiais, contatos e links importantes para ajudar no seu bem-estar emocional.
          Explore as categorias abaixo.
        </p>
      </div>

      <motion.div
        className="space-y-4 sm:space-y-6"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        initial="hidden"
        animate="show"
      >
        {Object.entries(RESOURCES_BY_CATEGORY).map(([categoryKey, items]) => {
          const category = CATEGORY_LABELS[categoryKey];
          const isExpanded = expandedCategories.has(categoryKey);

          if (!category || items.length === 0) return null;

          return (
            <motion.div
              key={categoryKey}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="glass-panel rounded-2xl overflow-hidden"
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(categoryKey)}
                aria-expanded={isExpanded}
                aria-label={`${isExpanded ? "Fechar" : "Abrir"} seção de ${category.name}`}
                className="w-full px-6 py-5 sm:py-6 flex items-center justify-between hover:bg-muted/50 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/30"
              >
                <div className="text-left flex-1">
                  <h2 className="text-2xl sm:text-3xl font-display text-foreground mb-2">
                    {category.icon} {category.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">{category.description}</p>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                  aria-hidden="true"
                >
                  <ChevronDown className="w-6 h-6 text-muted-foreground" />
                </motion.div>
              </button>

              {/* Category Items */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-card-border overflow-hidden"
                  >
                    <div className="divide-y divide-card-border">
                      {items.map((resource, idx) => (
                        <motion.a
                          key={resource.id}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="group p-5 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center hover:bg-muted/30 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/20"
                        >
                          <div
                            className={`p-3 sm:p-4 rounded-xl flex-shrink-0 bg-white shadow-sm border ${getBadgeColor(
                              resource.type
                            )
                              .replace("bg-", "border-")
                              .replace("100", "200")}`}
                            aria-hidden="true"
                          >
                            {getIcon(resource.type)}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2">
                              <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                {resource.title}
                              </h3>
                              <span
                                className={`text-xs px-2.5 py-1 rounded-full font-medium border whitespace-nowrap flex-shrink-0 ${getBadgeColor(
                                  resource.type
                                )}`}
                              >
                                {getTypeText(resource.type)}
                              </span>
                            </div>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                              {resource.description}
                            </p>
                          </div>

                          <div className="hidden sm:flex p-3 rounded-full bg-secondary/50 text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex-shrink-0" aria-hidden="true">
                            <ExternalLink className="w-5 h-5" />
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
