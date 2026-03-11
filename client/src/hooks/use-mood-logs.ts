import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export function useCreateMoodLog() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: { mood: string }) => {
      const today = new Date().toISOString().slice(0, 10);

      const existing = JSON.parse(localStorage.getItem("moodLogs") || "[]");

      existing.push({
        mood: data.mood,
        date: today,
      });

      localStorage.setItem("moodLogs", JSON.stringify(existing));

      return { success: true };
    },

    onError: () => {
      toast({
        title: "Ops!",
        description: "Não foi possível registrar seu humor localmente.",
        variant: "destructive",
      });
    },
  });
}
