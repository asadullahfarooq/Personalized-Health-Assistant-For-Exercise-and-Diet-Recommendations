import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const GoalDetailsScreen = ({ route, navigation }) => {
  const { goal } = route.params || {};
  const [selectedOption, setSelectedOption] = useState(null);
  const { height } = useWindowDimensions();

  const goalQuestions = {
    "Lose Weight": {
      question: "In the past, what were barriers to achieving weight loss?",
      options: [
        "Lack of time",
        "The regime was hard to follow",
        "Did not enjoy the food",
        "Difficult to make food choices",
        "Social eatings and events",
        "Food cravings",
        "Lack of progress",
      ],
    },
    "Maintain Weight": {
      question: "In the past, what have been your barriers to maintaining weight?",
      options: [
        "Lack of time",
        "The regime was hard to follow",
        "Healthy diets lack variety",
        "Stress around food choices",
        "Holidays/social events",
        "Food cravings",
        "Lack of progress",
        "Healthy food doesn't taste good",
      ],
    },
    "Gain Weight": {
      question: "What challenges have you faced in gaining weight?",
      options: [
        "Lack of appetite",
        "Difficulty eating large meals",
        "High metabolism",
        "Lack of time to eat",
        "Unhealthy food preferences",
        "Lack of progress",
      ],
    },
    "Gain Muscle": {
      question: "What challenges have you faced in gaining muscle?",
      options: [
        "Lack of consistent workouts",
        "Difficulty following a diet plan",
        "Insufficient protein intake",
        "Lack of progress",
        "Injuries or health issues",
      ],
    },
    "Modify My Diet": {
      question: "What changes do you want to make to your diet?",
      options: [
        "Reduce sugar intake",
        "Eat more vegetables",
        "Reduce processed foods",
        "Increase protein intake",
        "Follow a specific diet (e.g., keto, vegan)",
      ],
    },
    "Plan Meals": {
      question: "What challenges do you face in meal planning?",
      options: [
        "Lack of time",
        "Difficulty finding recipes",
        "Limited cooking skills",
        "Budget constraints",
        "Lack of variety",
      ],
    },
    "Manage Stress": {
      question: "What are your main sources of stress?",
      options: [
        "Work-related stress",
        "Family or relationship issues",
        "Financial stress",
        "Health concerns",
        "Lack of work-life balance",
      ],
    },
    "Stay Active": {
      question: "What challenges do you face in staying active?",
      options: [
        "Lack of motivation",
        "Busy schedule",
        "Lack of access to a gym",
        "Injuries or health issues",
        "Boredom with workouts",
      ],
    },
  };

  const handleOptionSelection = (option) => {
    setSelectedOption(option === selectedOption ? null : option);
  };

  const handleNext = () => {
    if (selectedOption) {
      navigation.navigate("BaselineActivityScreen", { selectedOption });
    }
  };

  if (!goal || !goalQuestions[goal]) {
    return (
      <LinearGradient colors={["#99b09d", "#132b17"]} style={styles.gradientBackground}>
        <View style={styles.container}>
          <Text style={styles.errorText}>Error: Goal not found.</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.retryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#99b09d", "#132b17"]} style={styles.gradientBackground}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.header, { fontSize: height * 0.03 }]}>
            {goalQuestions[goal].question}
          </Text>

          {goalQuestions[goal].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                selectedOption === option && styles.selectedOption,
              ]}
              onPress={() => handleOptionSelection(option)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedOption === option && styles.selectedOptionText,
                  { fontSize: height * 0.02 },
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[styles.button, !selectedOption && styles.disabled]}
            disabled={!selectedOption}
            onPress={handleNext}
          >
            <Text style={[styles.buttonText, { fontSize: height * 0.02 }]}>
              Next
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default GoalDetailsScreen;

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
    padding: 20,
  },
  header: {
    color: "#4CAF50",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  option: {
    width: "100%",
    padding: 15,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#4CAF50",
  },
  selectedOptionText: {
    color: "#fff",
    fontWeight: "bold",
  },
  optionText: {
    color: "#000",
    textAlign: "center",
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  disabled: {
    backgroundColor: "#A5D6A7",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
