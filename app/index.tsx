import { LinearGradient } from "expo-linear-gradient";
import { copyToClipboard } from "@/utils/clipboard";
import { decryptFromBase64, encryptToBase64 } from "@/utils/customcipher";
import { generateSecureKey } from "@/utils/keygenerator";
import React, { useRef, useState } from "react";
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ViewShot from "react-native-view-shot";
import { Feather } from "@expo/vector-icons";

const Index = () => {
  const [input, setInput] = useState("");
  const [key, setKey] = useState("");
  const [encryptedResult, setEncryptedResult] = useState("");
  const [encryptedInput, setEncryptedInput] = useState("");
  const [decryptedResult, setDecryptedResult] = useState("");
  const { top } = useSafeAreaInsets();
  const viewShotRef = useRef<ViewShot>(null);

  const handleEncrypt = () => {
    try {
      const result = encryptToBase64(input, key);
      setEncryptedResult(result);
      setEncryptedInput(result); // Auto-fill decryption input
    } catch (error: unknown) {
      handleError(error);
    }
  };

  const handleDecrypt = () => {
    try {
      const result = decryptFromBase64(encryptedInput, key);
      setDecryptedResult(result);
    } catch (error: unknown) {
      handleError(error);
    }
  };

  const handleGenerateKey = () => {
    const newKey = generateSecureKey(16);
    setKey(newKey);
  };

  const handleClearAll = () => {
    setInput("");
    setKey("");
    setEncryptedResult("");
    setEncryptedInput("");
    setDecryptedResult("");
  };

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Error", "An unknown error occurred");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
    >
      <LinearGradient
        colors={["#6366f1", "#4338ca"]}
        style={[styles.header, { paddingTop: top + 32 }]}
      >
        <Text style={styles.title}>Secure Crypt</Text>
        <TouchableOpacity style={styles.clearButton} onPress={handleClearAll}>
          <Feather name="trash-2" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Encryption</Text>
        <TextInput
          placeholder="Enter plain text"
          placeholderTextColor="#94a3b8"
          value={input}
          onChangeText={setInput}
          style={styles.input}
          multiline
        />

        <TextInput
          placeholder="Encryption key"
          placeholderTextColor="#94a3b8"
          value={key}
          onChangeText={setKey}
          style={styles.input}
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.generateButton]}
            onPress={handleGenerateKey}
          >
            <Feather name="key" size={18} color="white" />
            <Text style={styles.buttonText}>Generate Key</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.encryptButton]}
            onPress={handleEncrypt}
          >
            <Feather name="lock" size={18} color="white" />
            <Text style={styles.buttonText}>Encrypt</Text>
          </TouchableOpacity>
        </View>

        {encryptedResult ? (
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Encrypted Text:</Text>
            <Text style={styles.resultText}>{encryptedResult}</Text>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.iconAction}
                onPress={() => copyToClipboard(encryptedResult)}
              >
                <Feather name="copy" size={18} color="#6366f1" />
                <Text style={styles.iconActionText}>Copy</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Decryption</Text>
        <TextInput
          placeholder="Enter encrypted text"
          placeholderTextColor="#94a3b8"
          value={encryptedInput}
          onChangeText={setEncryptedInput}
          style={styles.input}
          multiline
        />

        <TextInput
          placeholder="Decryption key"
          placeholderTextColor="#94a3b8"
          value={key}
          onChangeText={setKey}
          style={styles.input}
        />

        <TouchableOpacity
          style={[styles.button, styles.decryptButton]}
          onPress={handleDecrypt}
        >
          <Feather name="unlock" size={18} color="white" />
          <Text style={styles.buttonText}>Decrypt</Text>
        </TouchableOpacity>

        {decryptedResult ? (
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Decrypted Text:</Text>
            <Text style={styles.resultText}>{decryptedResult}</Text>

            <TouchableOpacity
              style={styles.iconAction}
              onPress={() => copyToClipboard(decryptedResult)}
            >
              <Feather name="copy" size={18} color="#6366f1" />
              <Text style={styles.iconActionText}>Copy</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    padding: 24,
    paddingTop: 48,
    paddingBottom: 32,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    fontFamily: "Inter_700Bold",
  },
  clearButton: {
    position: "absolute",
    right: 24,
    top: 48,
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  section: {
    marginHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 16,
    fontFamily: "Inter_600SemiBold",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: "#0f172a",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  generateButton: {
    backgroundColor: "#3b82f6",
  },
  encryptButton: {
    backgroundColor: "#6366f1",
  },
  decryptButton: {
    backgroundColor: "#10b981",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
  },
  resultCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 8,
    fontFamily: "Inter_600SemiBold",
  },
  resultText: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 16,
    fontFamily: "Menlo",
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 8,
  },
  iconAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#e0e7ff",
  },
  iconActionText: {
    color: "#6366f1",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Inter_500Medium",
  },
});

export default Index;
