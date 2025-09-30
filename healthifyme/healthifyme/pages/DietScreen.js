import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { RadioButton, Checkbox } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

const DietScreen = () => {
  const [dietType, setDietType] = useState("veg"); // Default diet selection
  const [issues, setIssues] = useState({
    lactoseIntolerance: false,
    constipation: false,
    heartburn: false,
    acidReflux: false,
    bloating: false,
    gas: false,
    pcos: false,
  });

  const handleCheckboxToggle = (issue) => {
    setIssues({ ...issues, [issue]: !issues[issue] });
  };

  const handleSubmit = () => {
    console.log("Diet Type:", dietType);
    console.log("Health Issues:", issues);
    // Handle submission logic here
  };

  return (
    <LinearGradient colors={["#99b09d", "#132b17"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Select Your Diet Type</Text>

        {/* Radio Buttons for Diet Selection */}
        <View style={styles.radioGroup}>
          {["veg", "nonveg", "omnivore"].map((option, index) => (
            <TouchableOpacity key={index} onPress={() => setDietType(option)} style={styles.radioButton}>
              <RadioButton.Android
                value={option}
                status={dietType === option ? "checked" : "unchecked"}
                color="#4CAF50"
              />
              <Text style={styles.radioText}>{option.charAt(0).toUpperCase() + option.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.title}>Select Health Issues</Text>

        {/* Checkboxes for Health Issues */}
        {Object.keys(issues).map((issue, index) => (
          <TouchableOpacity key={index} onPress={() => handleCheckboxToggle(issue)} style={styles.checkboxContainer}>
            <Checkbox.Android
              status={issues[issue] ? "checked" : "unchecked"}
              color="#4CAF50"
              uncheckedColor="#fff"
            />
            <Text style={styles.checkboxText}>{issue.replace(/([A-Z])/g, " $1").trim()}</Text>
          </TouchableOpacity>
        ))}

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
    textAlign: "center",
  },
  radioGroup: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  radioText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  checkboxText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DietScreen;