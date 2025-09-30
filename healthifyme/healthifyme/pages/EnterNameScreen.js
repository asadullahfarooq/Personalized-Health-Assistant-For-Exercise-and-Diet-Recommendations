import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, 
  KeyboardAvoidingView, ScrollView, Platform, TouchableWithoutFeedback, Keyboard 
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const EnterNameScreen = ({ navigation }) => {
  const [name, setName] = useState("");

  // Function to check if name has at least 4 letters
  const isValidName = (input) => {
    return /^[A-Za-z]{4,}$/.test(input.trim()); // Ensures at least 4 alphabetic characters
  };

  return (
    <LinearGradient colors={["#99b09d", "#132b17"]} style={styles.gradientBackground}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView 
            contentContainerStyle={styles.scrollContainer} 
            keyboardShouldPersistTaps="handled"
          >
            {/* App Logo */}
            <Image source={require("../assets/logoh.png")} style={styles.logo} />

            <View style={styles.textContainer}>
              <Text style={styles.header}>First, what can we call you?</Text>
              <Text style={styles.subtext}>We'd like to get to know you.</Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Preferred first name"
              placeholderTextColor="#888"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />

            {/* Error Message */}
            {name.length > 0 && !isValidName(name) && (
              <Text style={styles.errorText}>Name must be at least 4 letters.</Text>
            )}

            <TouchableOpacity 
              style={[styles.button, !isValidName(name) && styles.disabledButton]} 
              onPress={() => navigation.navigate("GoalsSelectionScreen")}
              disabled={!isValidName(name)} // Disables if name is invalid
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default EnterNameScreen;

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 10,
  },
  textContainer: {
    alignItems: "center",
    width: "100%",
  },
  header: {
    color: "#000",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtext: {
    color: "#aaa",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#F5F5F5",
    color: "#000",
    fontSize: 16,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#444",
    width: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    borderRadius: 10,
  },
  disabledButton: {
    backgroundColor: "#a5d6a7",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
