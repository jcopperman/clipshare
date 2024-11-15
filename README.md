[![Build](https://github.com/jcopperman/clipshare/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/jcopperman/clipshare/actions/workflows/build.yml)

# **ClipShare CLI**

ClipShare CLI is a command-line utility for developers to securely share sensitive information, such as environment variables, directly in their terminals. It uses WebSockets for real-time communication and AES-GCM encryption to ensure the secure transmission of secrets.

## **Features**

*  **End-to-End Encryption**: Share secrets securely using AES-GCM encryption.

*  **WebSocket Communication**: Real-time exchange of secrets.

*  **Key Management**: Generate, encrypt, and decrypt secrets with pre-shared keys.

*  **Simple and Intuitive Commands**: Easy-to-use commands for common tasks. 

## **Installation** 

You can install ClipShare CLI via npm:  
```
npm install -g clipshare
```
## **Getting Started**

Ensure you have a WebSocket server running before using the CLI. You can start the included server with:

```
node server.ts
```  

This will start a WebSocket server at `ws://localhost:8080`. 

### **Basic Workflow**

1. Generate or set a pre-shared encryption key.

2. Encrypt the secret you want to share.

3. Send the encrypted secret to the recipient.

4. The recipient receives and decrypts the secret. 

## **Usage**  

### **Commands**

Here are the commands supported by `ClipShare CLI`:

### **1. Generate a New Encryption Key**

Generate a secure encryption key for sharing secrets.

```
clipshare generate-key
``` 

Output:

```
Generated key: <your-key>
```

### **2. Set a Pre-Shared Key**

Store a pre-shared key for encrypting and decrypting secrets.

```
clipshare set-key <key>
```

Example:
```
clipshare set-key mySuperSecretKey
```

Output:

```
Pre-shared key set: mySuperSecretKey
```  

### **3. Encrypt a Secret**

Encrypt a secret using a key.
  
```
clipshare encrypt <secret>
```

Example:

```
clipshare encrypt "myPassword123"
```  

Output:

```
Encrypted data: <encrypted-secret>
IV: <initialization-vector>
Key: <key>
```  

### **4. Decrypt a Secret**  

Decrypt a previously encrypted secret.  
```
clipshare decrypt <encryptedData> <iv> <key>
```
Example:
```
clipshare decrypt <encrypted-data> <iv> <key>
```  

Output:  
```
Decrypted secret: myPassword123
```

### **5. Send a Secret**

Encrypt and send a secret to a recipient via WebSocket.

```
clipshare send <recipient> <secret> <key>
```

Example:
```
clipshare send user123 "mySecret123" myEncryptionKey
```

Output:  
```
Message sent.
```

### **6. Receive a Secret** 

Listen for and decrypt incoming secrets.

```
clipshare receive <key>
``` 

Example:

```
clipshare receive myEncryptionKey
```
Output:

```
Received secret: mySecret123
```

## **WebSocket Server**
  
The WebSocket server handles client communication. It assigns temporary IDs to clients and facilitates message routing.

### **Starting the Server**
  
```
node server.ts
```

Output:

```
WebSocket server started on ws://localhost:8080
```

### **Logs**

* Client connection: `Client connected with ID: &lt;client-id>`

* Message received: `received: &lt;message>`

* Client disconnection: `Client disconnected with ID: &lt;client-id>`

## **Security Notes**

1. Use strong, randomly generated keys.
2. Avoid sharing keys through insecure channels.
3. Run the WebSocket server in a secure environment.

## **Development**

### **Run Locally**

Clone the repository:

```
git clone https://github.com/jcopperman/clipshare-cli.git
cd clipshare-cli
```

Install dependencies:

```
npm install
```

Run the CLI tool:

```
node cli.ts
```

Start the WebSocket server:
```
node server.ts
```

## **License**

This project is licensed under the MIT License. See the LICENSE file for details.

## Support My Work

If you find this tool helpful, please consider supporting me on GitHub Sponsors. Your support helps keep this project alive and maintained!

[![Sponsor](https://img.shields.io/badge/-Sponsor%20Me-ff69b4?style=flat&logo=github-sponsors&logoColor=white)](https://github.com/sponsors/jcopperman)
