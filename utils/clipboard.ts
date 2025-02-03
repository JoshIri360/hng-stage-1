import Clipboard from "@react-native-clipboard/clipboard";

/**
 * Copies text to the clipboard.
 * @param text - Text to copy.
 */
export const copyToClipboard = async (text: string) => {
  Clipboard.setString(text);
};
