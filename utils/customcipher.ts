/**
 * Encrypts a plaintext string using a custom algorithm combining shift and XOR ciphers.
 * @param plaintext - The input string to encrypt.
 * @param key - The secret key for encryption.
 * @returns Encrypted string.
 */
export function encrypt(plaintext: string, key: string): string {
  if (key.length === 0) throw new Error("Encryption key must not be empty");
  let encrypted = "";
  for (let i = 0; i < plaintext.length; i++) {
    const charCode = plaintext.charCodeAt(i);
    const keyIndex = i % key.length;
    const keyCharCode = key.charCodeAt(keyIndex);
    const shift = keyCharCode % 26;
    const xorVal = keyCharCode;
    const shifted = (charCode + shift) % 65536;
    const encryptedCode = shifted ^ xorVal;
    encrypted += String.fromCharCode(encryptedCode);
  }
  return encrypted;
}

/**
 * Decrypts an encrypted string back to the original plaintext.
 * @param ciphertext - The encrypted string.
 * @param key - The secret key used for encryption.
 * @returns Decrypted string.
 */
export function decrypt(ciphertext: string, key: string): string {
  if (key.length === 0) throw new Error("Decryption key must not be empty");
  let decrypted = "";
  for (let i = 0; i < ciphertext.length; i++) {
    const encryptedCode = ciphertext.charCodeAt(i);
    const keyIndex = i % key.length;
    const keyCharCode = key.charCodeAt(keyIndex);
    const shift = keyCharCode % 26;
    const xorVal = keyCharCode;
    const temp = encryptedCode ^ xorVal;
    const decryptedCode = (temp - shift + 65536) % 65536;
    decrypted += String.fromCharCode(decryptedCode);
  }
  return decrypted;
}

/**
 * Encrypts the plaintext and returns the result as a Base64 string.
 * @param plaintext - The input string to encrypt.
 * @param key - The secret key for encryption.
 * @returns Base64 encoded encrypted string.
 */
export function encryptToBase64(plaintext: string, key: string): string {
  const encrypted = encrypt(plaintext, key);
  const buffer = new ArrayBuffer(encrypted.length * 2);
  const view = new DataView(buffer);
  for (let i = 0; i < encrypted.length; i++) {
    const code = encrypted.charCodeAt(i);
    view.setUint16(i * 2, code, false); // Big-endian
  }
  const bytes = new Uint8Array(buffer);
  return btoa(String.fromCharCode(...bytes));
}

/**
 * Decrypts a Base64 encoded encrypted string back to the original plaintext.
 * @param base64Str - The Base64 encoded encrypted string.
 * @param key - The secret key used for encryption.
 * @returns Decrypted string.
 */
export function decryptFromBase64(base64Str: string, key: string): string {
  const binaryStr = atob(base64Str);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  const buffer = bytes.buffer;
  const view = new DataView(buffer);
  const encryptedChars = [];
  for (let i = 0; i < bytes.length; i += 2) {
    const code = view.getUint16(i, false); // Big-endian
    encryptedChars.push(String.fromCharCode(code));
  }
  return decrypt(encryptedChars.join(""), key);
}
