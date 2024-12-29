"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const agent_1 = require("./agent");
const uuid_1 = require("uuid");
const router = express_1.default.Router();
router.post('/message', async (req, res) => {
    try {
        const { text, userId = 'default', userName = 'User', roomId = 'default-room' } = req.body;
        const agentId = (0, uuid_1.v4)();
        const state = await agent_1.runtime.composeState({
            userId,
            roomId,
            agentId,
            content: { text }
        });
        const responses = [];
        await agent_1.runtime.processActions({
            userId,
            roomId,
            agentId,
            content: { text }
        }, responses, state, async (newMessages) => {
            return [{ userId, roomId, agentId, content: { text } }];
        });
        res.json({ responses });
    }
    catch (error) {
        console.error('Error processing message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/characters', async (req, res) => {
    try {
        const characters = agent_1.runtime.character ? [agent_1.runtime.character] : [];
        res.json({ characters });
    }
    catch (error) {
        console.error('Error fetching characters:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/status', (req, res) => {
    res.json({
        status: 'ok',
        version: process.env.npm_package_version || '1.0.0',
        uptime: process.uptime()
    });
});
exports.default = router;
