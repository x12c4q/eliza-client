import { DirectClient } from '@elizaos/client-direct';

// Create the client instance without config
const client = new DirectClient();

// Start the server on port 3000 (or your preferred port)
client.start(3000);

export default client;
