"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const agent_1 = require("./agent");
const vitest_1 = require("vitest");
(0, vitest_1.describe)("Agent Runtime", () => {
    // Use beforeAll for initialization
    (0, vitest_1.beforeAll)(async () => {
        await agent_1.runtime.initialize();
    });
    (0, vitest_1.it)("should initialize with correct configuration", () => {
        (0, vitest_1.expect)(agent_1.runtime.character).toBeDefined();
        (0, vitest_1.expect)(agent_1.runtime.character.name).toBe("Your Agent Name");
        (0, vitest_1.expect)(agent_1.runtime.character.bio).toBe("A brief description of your agent");
    });
    (0, vitest_1.it)("should have required runtime properties", () => {
        (0, vitest_1.expect)(agent_1.runtime.agentId).toBeDefined();
        (0, vitest_1.expect)(agent_1.runtime.modelProvider).toBeDefined();
    });
    (0, vitest_1.it)("should have proper character configuration", () => {
        const character = agent_1.runtime.character;
        (0, vitest_1.expect)(character).toMatchObject({
            name: "Your Agent Name",
            bio: "A brief description of your agent"
        });
    });
});
