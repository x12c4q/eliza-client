import express from 'express';
import { runtime } from './agent';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.post('/message', async (req, res) => {
    try {
        const { text, userId = 'default', userName = 'User', roomId = 'default-room' } = req.body;
        const agentId = uuidv4() as `${string}-${string}-${string}-${string}-${string}`;

        const state = await runtime.composeState({
            userId,
            roomId,
            agentId,
            content: { text }
        });

        const responses: any[] = [];
        await runtime.processActions(
            {
                userId,
                roomId,
                agentId,
                content: { text }
            },
            responses,
            state,
            async (newMessages) => {
                return [{ userId, roomId, agentId, content: { text } }];
            }
        );

        res.json({ responses });
    } catch (error) {
        console.error('Error processing message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/characters', async (req, res) => {
    try {
        const characters = runtime.character ? [runtime.character] : [];
        res.json({ characters });
    } catch (error) {
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

export default router;
