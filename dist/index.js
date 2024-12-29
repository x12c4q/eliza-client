"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_direct_1 = require("@elizaos/client-direct");
// Create the client instance without config
const client = new client_direct_1.DirectClient();
// Start the server on port 3000 (or your preferred port)
client.start(3000);
exports.default = client;
