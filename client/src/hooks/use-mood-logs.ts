import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateMoodLog() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: { mood: string }) => {
      // Create safe parsing for input
      const validated = api.moodLogs.create.input.parse(data);
      
      const res = await fetch(api.moodLogs.create.path, {
        method: api.moodLogs.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.moodLogs.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Falha ao registrar o humor.");
      }

      // Since the mock uses z.custom for responses, we cast safely
      return await res.json(); 
    },
    onError: (error) => {
      toast({
        title: "Ops!",
        description: error instanceof Error ? error.message : "Algo deu errado ao salvar seu humor.",
        variant: "destructive",
      });
    },
  });
}
