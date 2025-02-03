# Secure Crypt

Secure Crypt is a simple program that implements custom encryption and decryption algorithms using a combination of shift and XOR ciphers. It provides both raw and Base64 encoded outputs, making it easy to secure data and restore it back to its original form using a secret key.

## Files Included

- **customcipher.ts**: Contains the core functions for encryption and decryption:
  - `encrypt(plaintext: string, key: string): string`
  - `decrypt(ciphertext: string, key: string): string`
  - `encryptToBase64(plaintext: string, key: string): string`
  - `decryptFromBase64(base64Str: string, key: string): string`
- **keygenerator.ts**: (Optional) Provides a function to generate a secure key.
- **example.ts**: A test file demonstrating how to use the encryption/decryption functions.
- **README.md**: This file with setup instructions, usage examples, and a flow diagram.

## Demo

### Appetize Link

You can try Secure Crypt in your browser using our [Appetize demo](YOUR_APPETIZE_LINK_HERE). *(Replace `YOUR_APPETIZE_LINK_HERE` with your actual Appetize link.)*

### Video Demonstration

Watch the video below to see how to use Secure Crypt in action:




## Encryption and Decryption Flow Diagram

Below is the Mermaid diagram that illustrates the flow of the encryption and decryption process. If your documentation viewer supports Mermaid, the diagram will render automatically. Otherwise, you can export this diagram as an image and insert it in place of the placeholder.

![image](https://gist.github.com/user-attachments/assets/8708f267-477e-48c2-9ae0-a9d02a9ff8a6)

*If your Markdown viewer does not support Mermaid, please generate an image of this diagram and insert it here.*

## Setup

### Prerequisites

- **Node.js** (v14 or later)
- **npm** or **yarn**
- For TypeScript execution, install **ts-node** globally (optional):
  ```bash
  npm install -g ts-node
  ```
  
### Installation

1. **Download the files.**

## Usage

### Running the Example/Test File

The file `example.ts` demonstrates the encryption and decryption process. To run it using `ts-node`, execute:

```bash
ts-node example.ts
```

### API Usage in Your Project

You can import and use the functions from `customcipher.ts` in your project as follows:

```typescript
import { encrypt, decrypt, encryptToBase64, decryptFromBase64 } from "./customcipher";

const plaintext = "Hello, world!";
const key = "mySecretKey";

const encrypted = encryptToBase64(plaintext, key);
console.log("Encrypted:", encrypted);

const decrypted = decryptFromBase64(encrypted, key);
console.log("Decrypted:", decrypted);
```

## Example Inputs and Outputs

- **Plaintext:** `Hello, Secure Crypt!`
- **Key:** `mySecretKey123`
- **Encrypted (Base64):** `...` *(example output)*
- **Decrypted:** `Hello, Secure Crypt!`

## Underlying Concepts and References

This project implements a custom algorithm that combines two basic encryption techniques: a **shift cipher** and an **XOR cipher**.

- **Shift Cipher:**  
  A simple substitution cipher where each letter in the plaintext is shifted by a fixed number of positions. For more details, see:  
  [Caesar Cipher (Wikipedia)](https://en.wikipedia.org/wiki/Caesar_cipher)

- **XOR Cipher:**  
  A cipher that applies the XOR operation between the plaintext and a key. This method is widely used in various cryptographic applications. For more details, see:  
  [Exclusive or (XOR) (Wikipedia)](https://en.wikipedia.org/wiki/Exclusive_or)

- **Base64 Encoding:**  
  A method to encode binary data into an ASCII string format, often used to safely transmit binary data over media designed to deal with textual data. For more details, see:  
  [Base64 (Wikipedia)](https://en.wikipedia.org/wiki/Base64)

## Error Handling

Both the encryption and decryption functions will throw an error if an empty key is provided. Make sure to catch and handle these errors appropriately in your implementation.

## License

This project is licensed under the MIT License.