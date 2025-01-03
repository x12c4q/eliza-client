"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runtime = void 0;
const core_1 = require("@elizaos/core");
const adapter_postgres_1 = require("@elizaos/adapter-postgres");
// Create cache manager
const cacheManager = new core_1.FsCacheAdapter("./cache");
// Create database adapter
const db = new adapter_postgres_1.PostgresDatabaseAdapter({
    connectionString: process.env.DATABASE_URL,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
// Define character configuration
const characterConfig = {
    name: "Your Agent Name",
    bio: "A brief description of your agent",
    modelProvider: core_1.ModelProviderName.GROK,
    lore: ["Background information about your agent"],
    messageExamples: [],
    postExamples: [],
    clients: [core_1.Clients.DIRECT],
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
const runtime = new core_1.AgentRuntime({
    token: process.env.GROK_API_KEY || '',
    modelProvider: core_1.ModelProviderName.GROK,
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
exports.runtime = runtime;
