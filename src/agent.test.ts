import { describe, expect, it, beforeAll } from "vitest";
import { runtime } from "./agent";
import { ModelProviderName } from "@elizaos/core";

describe("Agent Runtime", () => {
    beforeAll(async () => {
        // Ensure runtime is initialized before tests
        await runtime.initialize();
    });

    it("should initialize with correct configuration", () => {
        expect(runtime).toBeDefined();

        // Test character configuration
        expect(runtime.character).toBeDefined();
        expect(runtime.character.name).toBe("Your Agent Name");
        expect(runtime.character.bio).toBe("A brief description of your agent");

        // Test model provider configuration
        expect(runtime.modelProvider).toBe(ModelProviderName.GROK);
    });

    it("should have required runtime properties", () => {
        // Test essential runtime properties
        expect(runtime.agentId).toBeDefined();
        expect(runtime.token).toBe(process.env.GROK_API_KEY);
        expect(runtime.databaseAdapter).toBeDefined();
    });

    it("should have proper character configuration", () => {
        const character = runtime.character;
        // Only test the properties we know exist
        expect(character).toMatchObject({
            name: "Your Agent Name",
            bio: "A brief description of your agent"
        });
    });
});
