import { db } from "./db";
import {
  moodLogs,
  resources,
  type InsertMoodLog,
  type MoodLogResponse,
  type InsertResource,
  type ResourcesListResponse
} from "@shared/schema";

export interface IStorage {
  createMoodLog(log: InsertMoodLog): Promise<MoodLogResponse>;
  getResources(): Promise<ResourcesListResponse>;
  createResource(resource: InsertResource): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async createMoodLog(log: InsertMoodLog): Promise<MoodLogResponse> {
    const [inserted] = await db.insert(moodLogs).values(log).returning();
    return inserted;
  }

  async getResources(): Promise<ResourcesListResponse> {
    return await db.select().from(resources);
  }

  async createResource(resource: InsertResource): Promise<void> {
    await db.insert(resources).values(resource);
  }
}

export const storage = new DatabaseStorage();
