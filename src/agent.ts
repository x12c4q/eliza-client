import { AgentRuntime, ModelProviderName, Character, ICacheManager, FsCacheAdapter, IDatabaseAdapter, Clients } from "@elizaos/core";
import { PostgresDatabaseAdapter } from "@elizaos/adapter-postgres";

// Create cache manager with a data directory
const cacheManager = new FsCacheAdapter("./cache") as ICacheManager;

// Create PostgreSQL database adapter
const db: IDatabaseAdapter = new PostgresDatabaseAdapter({
  connectionString: process.env.DATABASE_URL,
  // Optional connection pool settings
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Define character configuration with all required properties
const characterConfig: Character = {
  name: "Your Agent Name",
  bio: "A brief description of your agent",
  modelProvider: ModelProviderName.GROK,
  lore: ["Background information about your agent"],
  messageExamples: [],
  postExamples: [],
  clients: [Clients.DIRECT],
  settings: {
    secrets: {
      GROK_API_KEY: process.env.GROK_API_KEY || ''
    }
  },
  topics: [],
  adjectives: [],
  plugins: [],
  style: {
    all: [],
    chat: [],
    post: []
  }
};

// Create runtime instance
export const runtime = new AgentRuntime({
  token: process.env.GROK_API_KEY || '',
  modelProvider: ModelProviderName.GROK,
  character: characterConfig,
  serverUrl: process.env.VERCEL_URL || "http://localhost:3000",
  cacheManager,
  databaseAdapter: db,
  evaluators: [],
  plugins: [],
  providers: [],
  actions: [],
  services: [], // Changed from 'services: new Map()' to an empty array
  managers: []
});
