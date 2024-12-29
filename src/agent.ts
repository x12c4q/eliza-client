import { AgentRuntime, ModelProviderName } from "@elizaos/core";

// Basic character config
const characterConfig = {
  name: "Your Agent Name",
  bio: "A brief description of your agent",
  personality: "Describe the personality",
};

// Create runtime instance with in-memory storage
export const runtime = new AgentRuntime({
  token: process.env.GROK_API_KEY,
  modelProvider: ModelProviderName.GROK,
  character: characterConfig,
  serverUrl: process.env.VERCEL_URL || "http://localhost:3000",
});
