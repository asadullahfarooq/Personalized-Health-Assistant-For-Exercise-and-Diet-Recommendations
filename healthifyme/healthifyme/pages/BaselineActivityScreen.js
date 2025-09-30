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

const BaselineActivityScreen = ({ navigation }) => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const { height } = useWindowDimensions();

  const activityOptions = [
    { label: "Not Very Active", description: "Spend most of the day sitting" },
    { label: "Lightly Active", description: "Spend a good part of the day on your feet" },
    { label: "Active", description: "Spend a good part of the day doing some physical activity" },
    { label: "Very Active", description: "Spend most of the day doing heavy physical activity" },
  ];

  const handleActivitySelection = (activity) => {
    setSelectedActivity(activity === selectedActivity ? null : activity);
  };

  const handleNext = () => {
    if (selectedActivity) {
      navigation.navigate("UserInfoScreen", { selectedActivity });
    }
  };

  return (
    <LinearGradient colors={["#99b09d", "#132b17"]} style={styles.gradient}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={[styles.header, { fontSize: height * 0.03 }]}>
            What is your baseline activity?
          </Text>

          {activityOptions.map((activity, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                selectedActivity === activity.label && styles.selectedOption,
              ]}
              onPress={() => handleActivitySelection(activity.label)}
            >
              <Text style={[styles.optionLabel, { fontSize: height * 0.02 }]}>
                {activity.label}
              </Text>
              <Text style={[styles.optionDescription, { fontSize: height * 0.018 }]}>
                {activity.description}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[styles.button, !selectedActivity && styles.disabled]}
            disabled={!selectedActivity}
            onPress={handleNext}
          >
            <Text style={[styles.buttonText, { fontSize: height * 0.02 }]}>Next</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default BaselineActivityScreen;

const styles = StyleSheet.create({
  gradient: { flex: 1 }, // Gradient background
  container: { flex: 1, backgroundColor: "#fff", margin: 15, borderRadius: 10, padding: 10 },
  scrollContainer: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  header: { color: "#4CAF50", fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  option: {
    width: "100%",
    padding: 15,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  selectedOption: { backgroundColor: "#4CAF50" },
  optionLabel: { color: "#000", fontWeight: "bold", textAlign: "center" },
  optionDescription: { color: "#121212", textAlign: "center", marginTop: 5 },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  disabled: { backgroundColor: "#A5D6A7" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
