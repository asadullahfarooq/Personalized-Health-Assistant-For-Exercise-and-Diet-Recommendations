import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const result = await login(email, password);
      if (!result.success) {
        Alert.alert("Login Failed", result.error);
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>

      <TextInput
        placeholder="Email Address"
        placeholderTextColor="#888"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#888"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Log In</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity style={[styles.button, styles.googleButton]}>
        <Image source={require("../assets/google.png")} style={styles.logo} />
        <Text style={styles.blackButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.appleButton]}>
        <Image
          source={require("../assets/apple.png")}
          style={styles.appleLogo}
        />
        <Text style={styles.blackButtonText}>Continue with Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.fbButton]}>
        <Text style={styles.fbButtonText}>Continue with Facebook</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: "#4CAF50",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    backgroundColor: "#F5F5F5",
    padding: 15,
    color: "#000",
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    width: "90%",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  googleButton: {
    backgroundColor: "#F5F5F5",
  },
  appleButton: {
    backgroundColor: "#F5F5F5",
  },
  fbButton: {
    backgroundColor: "#F5F5F5",
  },
  buttonText: {
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "bold",
  },
  blackButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  fbButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    color: "#aaa",
    fontSize: 16,
    marginBottom: 15,
  },
  forgotText: {
    color: "#4CAF50",
    marginBottom: 15,
  },
  logo: {
    width: 28,
    height: 28,
    marginRight: 12,
    resizeMode: "contain",
  },
  appleLogo: {
    width: 36,
    height: 36,
    marginRight: 12,
    resizeMode: "contain",
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  signupText: {
    color: "#666",
    fontSize: 14,
  },
  signupLink: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "bold",
  },
});
