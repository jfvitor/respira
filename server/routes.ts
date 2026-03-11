import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed initial data
  await seedResources();

  app.post(api.moodLogs.create.path, async (req, res) => {
    try {
      const input = api.moodLogs.create.input.parse(req.body);
      const log = await storage.createMoodLog(input);
      res.status(201).json(log);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.resources.list.path, async (req, res) => {
    const data = await storage.getResources();
    res.status(200).json(data);
  });

  return httpServer;
}

async function seedResources() {
  const existing = await storage.getResources();
  if (existing.length === 0) {
    const seedData = [
      {
        title: "Centro de Valorização da Vida (CVV)",
        description: "Apoio emocional e prevenção do suicídio. Atendimento voluntário e gratuito sob total sigilo.",
        url: "https://www.cvv.org.br/",
        type: "hotline"
      },
      {
        title: "Como lidar com a ansiedade",
        description: "Dicas práticas para reduzir a ansiedade no dia a dia.",
        url: "https://aps.saude.gov.br/biblioteca/visualizar/MTA0OQ==",
        type: "article"
      },
      {
        title: "Meditação Guiada de 5 Minutos",
        description: "Uma prática rápida para encontrar relaxamento e reduzir o estresse.",
        url: "https://www.youtube.com/watch?v=inpok4MKVLM",
        type: "video"
      }
    ];

    for (const r of seedData) {
      await storage.createResource(r);
    }
  }
}
