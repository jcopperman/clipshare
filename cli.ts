#!/usr/bin/env node

import { program } from 'commander';
import WebSocket from 'ws';
import { encryptSecret, decryptSecret, generateKey } from './src/script';

program
  .name('clipshare')
  .description('CLI tool for secure secret sharing')
  .version('1.0.0');

program
  .command('set-key <key>')
  .description('Sets the pre-shared key for encryption and decryption')
  .action((key) => {

    console.log('Pre-shared key set:', key);
  });

program
  .command('encrypt <secret>')
  .description('Encrypts the provided secret')
  .action(async (secret) => {
    const key = generateKey();
    const { encryptedData, iv } = await encryptSecret(secret, key);
    console.log(`Encrypted data: ${encryptedData}`);
    console.log(`IV: ${iv}`);
    console.log(`Key: ${key}`);
  });

program
  .command('decrypt <encryptedData> <iv> <key>')
  .description('Decrypts the provided data')
  .action(async (encryptedData, iv, key) => {
    try {
      const decryptedSecret = await decryptSecret(encryptedData, key, iv);
      console.log(`Decrypted secret: ${decryptedSecret}`);
    } catch (error) {
      console.error('Decryption failed:', error);
    }
  });

program
  .command('generate-key')
  .description('Generates a new encryption key')
  .action(() => {
    const key = generateKey();
    console.log(`Generated key: ${key}`);
  });

  program
  .command('send <recipient> <secret> <key>')
  .description('Encrypts and sends the secret to the recipient via WebSockets')
  .action(async (recipient, secret, key) => {
    try {
      const { encryptedData, iv } = await encryptSecret(secret, key);

      const ws = new WebSocket('ws://localhost:8080');

      ws.onopen = () => {
        const message = {
          recipient,
          payload: JSON.stringify({ encryptedData, iv }),
        };
        ws.send(JSON.stringify(message));
        console.log('Message sent.');
        ws.close();
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = (event) => {
        if (event.wasClean) {
          console.log('Connection closed cleanly');
        } else {
          console.error('Connection died');
        }
      };
    } catch (error) {
      console.error('Failed to encrypt secret:', error);
    }
  });

program
  .command('receive <key>')
  .description('Receives and decrypts secrets from WebSockets')
  .action((key) => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = async (event) => {
      try {
        const { encryptedData, iv } = JSON.parse(event.data as string);
        const decryptedSecret = await decryptSecret(encryptedData, key, iv);
        console.log('Received secret:', decryptedSecret);
      } catch (error) {
        console.error('Failed to decrypt secret:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = (event) => {
      if (event.wasClean) {
        console.log('Connection closed cleanly');
      } else {
        console.error('Connection died');
      }
    };
  });

program.parse();