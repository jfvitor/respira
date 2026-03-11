import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const moodLogs = pgTable("mood_logs", {
  id: serial("id").primaryKey(),
  mood: text("mood").notNull(), // feliz, neutro, cansado, ansioso, triste
  createdAt: timestamp("created_at").defaultNow(),
});

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  url: text("url").notNull(),
  type: text("type").notNull(), // 'hotline', 'article', 'video'
});

export const insertMoodLogSchema = createInsertSchema(moodLogs).omit({ id: true, createdAt: true });
export const insertResourceSchema = createInsertSchema(resources).omit({ id: true });

export type MoodLog = typeof moodLogs.$inferSelect;
export type InsertMoodLog = z.infer<typeof insertMoodLogSchema>;

export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;

export type MoodLogResponse = MoodLog;
export type ResourceResponse = Resource;
export type ResourcesListResponse = Resource[];
