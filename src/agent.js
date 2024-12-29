import { AgentRuntime, ModelProviderName, Clients, FsCacheAdapter } from "@elizaos/core";
import { PostgresDatabaseAdapter } from "@elizaos/adapter-postgres";
// Create cache manager
const cacheManager = new FsCacheAdapter("./cache");
// Create database adapter
const db = new PostgresDatabaseAdapter({
    connectionString: process.env.DATABASE_URL,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
// Define character configuration
const characterConfig = {
    name: "Your Agent Name",
    bio: "A brief description of your agent",
    modelProvider: ModelProviderName.GROK,
    lore: ["Background information about your agent"],
    messageExamples: [],
    postExamples: [],
    clients: [Clients.DIRECT],
    settings: {
        secrets: {
            GROK_API_KEY: process.env.GROK_API_KEY || '',
        }
    },
    topics: ["general assistance", "conversation"],
    adjectives: ["helpful", "friendly", "professional"],
    plugins: [],
    style: {
        all: ["clear", "concise", "professional"],
        chat: ["conversational", "engaging"],
        post: ["structured", "informative"]
    }
};
// Create runtime instance with all required properties
const runtime = new AgentRuntime({
    token: process.env.GROK_API_KEY || '',
    modelProvider: ModelProviderName.GROK,
    character: characterConfig,
    serverUrl: process.env.VERCEL_URL || "http://localhost:3000",
    databaseAdapter: db,
    cacheManager: cacheManager,
    evaluators: [],
    plugins: [],
    providers: [],
    actions: [],
    services: [],
    managers: []
});
// Export the runtime
export { runtime };
