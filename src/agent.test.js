import { runtime } from "./agent";
import { expect, describe, it, beforeAll } from "vitest";
describe("Agent Runtime", () => {
    // Use beforeAll for initialization
    beforeAll(async () => {
        await runtime.initialize();
    });
    it("should initialize with correct configuration", () => {
        expect(runtime.character).toBeDefined();
        expect(runtime.character.name).toBe("Your Agent Name");
        expect(runtime.character.bio).toBe("A brief description of your agent");
    });
    it("should have required runtime properties", () => {
        expect(runtime.agentId).toBeDefined();
        expect(runtime.modelProvider).toBeDefined();
    });
    it("should have proper character configuration", () => {
        const character = runtime.character;
        expect(character).toMatchObject({
            name: "Your Agent Name",
            bio: "A brief description of your agent"
        });
    });
});
