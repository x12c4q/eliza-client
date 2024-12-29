"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runtime = void 0;
const core_1 = require("@elizaos/core");
const adapter_postgres_1 = require("@elizaos/adapter-postgres");
// Create cache manager with a data directory
const cacheManager = new core_1.FsCacheAdapter("./cache");
// Create PostgreSQL database adapter
const db = new adapter_postgres_1.PostgresDatabaseAdapter({
    connectionString: process.env.DATABASE_URL,
    // Optional connection pool settings
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
// Define character configuration with all required properties
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
exports.runtime = new core_1.AgentRuntime({
    token: process.env.GROK_API_KEY || '',
    modelProvider: core_1.ModelProviderName.GROK,
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
