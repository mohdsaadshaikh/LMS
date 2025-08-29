import Redis from "ioredis";
import { env } from "./env";
import type { SessionData } from "./types";

export class RedisSessionStore {
  private client: Redis;
  private ttl: number;

  constructor() {
    this.client = new Redis(env.REDIS_URL);
    this.ttl = env.SESSION_TTL_SECONDS;
  }

  async get(id: string): Promise<SessionData | null> {
    const json = await this.client.get(this.key(id));
    return json ? (JSON.parse(json) as SessionData) : null;
  }

  async set(id: string, data: SessionData): Promise<void> {
    await this.client.set(this.key(id), JSON.stringify(data), "EX", this.ttl);
  }

  async del(id: string): Promise<void> {
    await this.client.del(this.key(id));
  }

  async touch(id: string): Promise<void> {
    await this.client.expire(this.key(id), this.ttl);
  }
  private key(id: string) {
    return `sess:${id}`;
  }
}
export const sessionStore = new RedisSessionStore();
