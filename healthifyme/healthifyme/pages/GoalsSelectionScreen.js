import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const goalsList = [
  "Lose Weight",
  "Maintain Weight",
  "Gain Weight",
  "Gain Muscle",
  "Modify My Diet",
  "Plan Meals",
  "Manage Stress",
  "Stay Active",
];

const GoalsSelectionScreen = ({ navigation }) => {
  const [selectedGoals, setSelectedGoals] = useState([]);

  const toggleGoal = (goal) => {
    setSelectedGoals((prev) =>
      prev.includes(goal)
        ? prev.filter((g) => g !== goal) // Remove goal if already selected
        : prev.length < 3
        ? [...prev, goal] // Allow up to 3 goals
        : prev
    );
  };

  return (
    <LinearGradient colors={["#99b09d", "#132b17"]} style={styles.gradientBackground}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.header}>Let's start with your goals.</Text>
          <Text style={styles.subtext}>Select up to three.</Text>

          {goalsList.map((goal, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.goalItem,
                selectedGoals.includes(goal) && styles.selectedGoal,
              ]}
              onPress={() => toggleGoal(goal)}
            >
              <Text
                style={[
                  styles.goalText,
                  selectedGoals.includes(goal) && styles.selectedGoalText,
                ]}
              >
                {goal}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* "Next" button is disabled until at least one goal is selected */}
        <TouchableOpacity
          style={[styles.button, selectedGoals.length === 0 && styles.disabled]}
          disabled={selectedGoals.length === 0}
          onPress={() => {
            if (selectedGoals.length > 0) {
              navigation.navigate("GoalDetailsScreen", { goal: selectedGoals[0] }); // Pass the first selected goal
            }
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default GoalsSelectionScreen;

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 20, // Optional: Adds spacing from edges
    borderRadius: 20, // Optional: Rounded container for card effect
    shadowColor: "#000", // Optional: Adds shadow for depth
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5, // Works on Android
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    color: "#4CAF50",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtext: {
    color: "#aaa",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  goalItem: {
    width: "100%",
    padding: 15,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  selectedGoal: {
    backgroundColor: "#4CAF50",
  },
  selectedGoalText: {
    color: "#fff",
    fontWeight: "bold",
  },
  goalText: {
    color: "#000",
    fontSize: 16,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  disabled: {
    backgroundColor: "#A5D6A7",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
