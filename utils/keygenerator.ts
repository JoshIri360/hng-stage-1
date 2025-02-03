import 'react-native-get-random-values';

/**
 * Generates a secure random key using cryptographically safe random values.
 * @param length - Length of the key to generate.
 * @returns A securely generated random key.
 */
export function generateSecureKey(length: number): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);
  let key = '';
  for (let i = 0; i < length; i++) {
    key += charset[randomValues[i] % charset.length];
  }
  return key;
}