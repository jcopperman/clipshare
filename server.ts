// server.ts

import * as WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws: WebSocket) {
  ws.on('message', function incoming(message: string) {
    console.log('received: %s', message);

    try {
      const messageObject = JSON.parse(message);
      // Message has a format like { recipient: 'userB', payload: 'encrypted_data' }
      const { recipient, payload } = messageObject;

      // Find the recipient's WebSocket connection and send the message
      wss.clients.forEach(function each(client: WebSocket.WebSocket) { 
        if ((client as any).clientId === recipient && client.readyState === WebSocket.OPEN) {
          client.send(payload);
        }
      });
    } catch (error) {
      console.error('Failed to parse message or find recipient:', error);
    }
  });

  // Assign a temporary client ID 
  (ws as any).clientId = `user${Math.floor(Math.random() * 1000)}`;
  console.log(`Client connected with ID: ${(ws as any).clientId}`);

  // Add an event listener for close events
  ws.onclose = (event) => {
    console.log(`Client disconnected with ID: ${(ws as any).clientId}`);
    if (event.wasClean) {
      console.log('Connection closed cleanly');
    } else {
      console.error('Connection died');
    }
  };
});

console.log('WebSocket server started on ws://localhost:8080');