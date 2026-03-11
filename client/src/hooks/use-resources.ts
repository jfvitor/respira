import { RESOURCES_BY_CATEGORY, type ResourceItem } from "@/lib/resources-data";

export interface UseResourcesResult {
  data: ResourceItem[];
  isLoading: boolean;
  error: null;
}

/**
 * Hook para carregar recursos de apoio
 * Usa dados hardcoded locais - sem dependência de API
 * Perfeito para GitHub Pages e deploy estático
 */
export function useResources(): UseResourcesResult {
  // Flattena todos os recursos em um array único
  const allResources = Object.values(RESOURCES_BY_CATEGORY).flat();
  
  return {
    data: allResources,
    isLoading: false,
    error: null,
  };
}
