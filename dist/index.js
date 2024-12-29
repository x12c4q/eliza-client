"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const agent_1 = require("./agent");
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Parse port properly
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
// Initialize the runtime
async function initialize() {
    try {
        await agent_1.runtime.initialize();
        console.log('Runtime initialized successfully');
    }
    catch (error) {
        console.error('Failed to initialize runtime:', error);
        throw error;
    }
}
// Message handling endpoint
app.post('/message', async (req, res) => {
    try {
        const { userId, roomId, content } = req.body;
        const agentId = (0, uuid_1.v4)();
        const state = await agent_1.runtime.composeState({
            userId,
            roomId,
            agentId,
            content: { text: content }
        });
        const responses = [];
        await agent_1.runtime.processActions({
            userId,
            roomId,
            agentId,
            content: { text: content }
        }, responses, state, async (newMessages) => {
            return [{ userId, roomId, agentId, content: { text: content } }];
        });
        res.json(responses);
    }
    catch (error) {
        console.error('Error processing message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Start the server
initialize()
    .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
exports.default = app;
