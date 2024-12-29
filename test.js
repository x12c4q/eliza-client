import { describe, expect, it } from "vitest";
import { runtime } from "./agent";
describe("Agent Runtime", () => {
    it("should initialize with correct configuration", () => {
        expect(runtime).toBeDefined();
        expect(runtime.character.name).toBe("Your Agent Name");
        expect(runtime.character.bio).toBe("A brief description of your agent");
    });
});
