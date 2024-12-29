"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const agent_1 = require("./agent");
const core_1 = require("@elizaos/core");
(0, vitest_1.describe)("Agent Runtime", () => {
    (0, vitest_1.beforeAll)(async () => {
        // Ensure runtime is initialized before tests
        await agent_1.runtime.initialize();
    });
    (0, vitest_1.it)("should initialize with correct configuration", () => {
        (0, vitest_1.expect)(agent_1.runtime).toBeDefined();
        // Test character configuration
        (0, vitest_1.expect)(agent_1.runtime.character).toBeDefined();
        (0, vitest_1.expect)(agent_1.runtime.character.name).toBe("Your Agent Name");
        (0, vitest_1.expect)(agent_1.runtime.character.bio).toBe("A brief description of your agent");
        // Test model provider configuration
        (0, vitest_1.expect)(agent_1.runtime.modelProvider).toBe(core_1.ModelProviderName.GROK);
    });
    (0, vitest_1.it)("should have required runtime properties", () => {
        // Test essential runtime properties
        (0, vitest_1.expect)(agent_1.runtime.agentId).toBeDefined();
        (0, vitest_1.expect)(agent_1.runtime.token).toBe(process.env.GROK_API_KEY);
        (0, vitest_1.expect)(agent_1.runtime.databaseAdapter).toBeDefined();
    });
    (0, vitest_1.it)("should have proper character configuration", () => {
        const character = agent_1.runtime.character;
        // Only test the properties we know exist
        (0, vitest_1.expect)(character).toMatchObject({
            name: "Your Agent Name",
            bio: "A brief description of your agent"
        });
    });
});
