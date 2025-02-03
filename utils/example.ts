import {
  encrypt,
  decrypt,
  encryptToBase64,
  decryptFromBase64,
} from "./customcipher";

// Define sample inputs
const plaintext = "Hello, Secure Crypt!";
const key = "mySecretKey123";

try {
  // Encrypt the plaintext using raw encryption
  const encryptedRaw = encrypt(plaintext, key);
  // Encrypt to Base64 for a more transportable format
  const encryptedBase64 = encryptToBase64(plaintext, key);

  console.log("=== Encryption ===");
  console.log("Plaintext:", plaintext);
  console.log("Key:", key);
  console.log("Encrypted (raw):", encryptedRaw);
  console.log("Encrypted (Base64):", encryptedBase64);

  // Decrypt the raw encrypted string
  const decryptedRaw = decrypt(encryptedRaw, key);
  // Decrypt the Base64 encoded string
  const decryptedFromBase64 = decryptFromBase64(encryptedBase64, key);

  console.log("\n=== Decryption ===");
  console.log("Decrypted (from raw):", decryptedRaw);
  console.log("Decrypted (from Base64):", decryptedFromBase64);
} catch (error) {
  console.error("Error during encryption/decryption:", error);
}
