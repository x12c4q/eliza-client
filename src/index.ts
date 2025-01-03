import express, { Request, Response } from 'express';
import cors from 'cors';
import { runtime } from './agent';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json());
app.use(cors());

// Parse port properly
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Initialize the runtime
async function initialize() {
  try {
    await runtime.initialize();
    console.log('Runtime initialized successfully');
  } catch (error) {
    console.error('Failed to initialize runtime:', error);
    throw error;
  }
}

// Message handling endpoint
app.post('/message', async (req: Request, res: Response) => {
  try {
    const { userId, roomId, content } = req.body;
    const agentId = uuidv4() as `${string}-${string}-${string}-${string}-${string}`;

    const state = await runtime.composeState({
      userId,
      roomId,
      agentId,
      content: { text: content }
    });

    const responses: any[] = [];
    await runtime.processActions(
      {
        userId,
        roomId,
        agentId,
        content: { text: content }
      },
      responses,
      state,
      async (newMessages) => {
        return [{ userId, roomId, agentId, content: { text: content } }];
      }
    );

    res.json(responses);
  } catch (error) {
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

export default app;
