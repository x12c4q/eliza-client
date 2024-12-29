import express from 'express';
import { DirectClient } from '@elizaos/client-direct';
import { runtime } from './agent';
const app = express();
app.use(express.json());
// Create direct client instance
const directClient = new DirectClient();
// Register the agent with the direct client
directClient.registerAgent(runtime);
app.post('/message', async (req, res) => {
    try {
        const { text, userId = 'user', userName = 'User' } = req.body;
        // Use the POST /:agentId/message endpoint directly
        const response = await fetch(`http://localhost:3000/${runtime.agentId}/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text,
                userId,
                userName,
                roomId: `default-room-${runtime.agentId}`
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        res.json(data);
    }
    catch (error) {
        console.error('Error processing message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const PORT = process.env.PORT || 3000;
async function initialize() {
    try {
        await runtime.initialize();
        console.log('Runtime initialized successfully');
        // Start the DirectClient
        directClient.start(3000);
    }
    catch (error) {
        console.error('Failed to initialize:', error);
        process.exit(1);
    }
}
initialize();
export default app;
