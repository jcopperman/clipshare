function generateKey(): string {
    const key = crypto.getRandomValues(new Uint8Array(16)); 
    return Array.from(key)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  async function encryptSecret(
    secret: string,
    key: string
  ): Promise<{ encryptedData: string; iv: string }> {
    const encodedKey = new TextEncoder().encode(key);
    const importedKey = await crypto.subtle.importKey(
      'raw',
      encodedKey,
      { name: 'AES-GCM' },
      false,
      ['encrypt']
    );
    const encodedSecret = new TextEncoder().encode(secret);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encryptedSecret = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      importedKey,
      encodedSecret
    );
    const encryptedArray = new Uint8Array(encryptedSecret);
    return {
      encryptedData: Array.from(encryptedArray)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join(''),
      iv: Array.from(iv)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join(''),
    };
  }
  
  async function decryptSecret(
    encryptedData: string,
    key: string,
    iv: string
  ): Promise<string> {
    const encodedKey = new TextEncoder().encode(key);
    const importedKey = await crypto.subtle.importKey(
      'raw',
      encodedKey,
      { name: 'AES-GCM' },
      false,
      ['decrypt']
    );
    const encryptedArray = new Uint8Array(encryptedData.length / 2);
    for (let i = 0; i < encryptedData.length; i += 2) {
      encryptedArray[i / 2] = parseInt(encryptedData.substr(i, 2), 16);
    }
    const ivArray = new Uint8Array(iv.length / 2);
    for (let i = 0; i < iv.length; i += 2) {
      ivArray[i / 2] = parseInt(iv.substr(i, 2), 16);
    }
    const decryptedSecret = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: ivArray },
      importedKey,
      encryptedArray
    );
    return new TextDecoder().decode(decryptedSecret);
  }
  
  export { generateKey, encryptSecret, decryptSecret };