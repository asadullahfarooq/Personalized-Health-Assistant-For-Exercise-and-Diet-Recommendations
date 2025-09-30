import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../context/AuthContext";
import apiService from "../services/apiService";

const ExerciseScreen = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);

  const videoRefs = {
    pushpa1: useRef(null),
    weight1: useRef(null),
    pushpa3: useRef(null),
  };

  const exercises = [
    {
      id: "pushpa1",
      source: require("../assets/pushpa1.mp4"),
      title: "Pushups Workout 1",
      type: "strength",
      caloriesPerMinute: 8,
      duration: 30,
    },
    {
      id: "weight1",
      source: require("../assets/weight1.mp4"),
      title: "Weight Loss Cardio",
      type: "cardio",
      caloriesPerMinute: 12,
      duration: 45,
    },
    {
      id: "pushpa3",
      source: require("../assets/pushpa3.mp4"),
      title: "Advanced Pushups",
      type: "strength",
      caloriesPerMinute: 10,
      duration: 25,
    },
  ];

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const result = await apiService.getActivities();
      if (result.success) {
        setActivities(result.data);
      }
    } catch (error) {
      console.error("Error loading activities:", error);
    }
  };

  const logExercise = async (exercise) => {
    setLoading(true);
    try {
      const activityData = {
        type: exercise.title,
        activityType: exercise.type,
        duration: exercise.duration,
        caloriesBurned: Math.round(
          (exercise.caloriesPerMinute * exercise.duration) / 60
        ),
        date: new Date().toISOString(),
      };

      const payload = {
        userId: user.id,
        activity: activityData,
      };

      const result = await apiService.addActivity(activityData); // send plain object

      if (result.success) {
        Alert.alert(
          "Exercise Logged!",
          `You've logged ${exercise.title} (~${activityData.caloriesBurned} cal)`,
          [{ text: "OK" }]
        );
        loadActivities(); // Refresh activities
      } else {
        Alert.alert("Error", result.error || "Failed to log activity.");
      }
    } catch (error) {
      console.error("Logging error:", error);
      Alert.alert("Error", "Failed to log exercise");
    } finally {
      setLoading(false);
    }
  };

  const getRecentActivities = () => {
    const today = new Date();
    const todayActivities = activities.filter((activity) => {
      if (!activity || !activity.date) return false; // 🔒 prevent crash
      const activityDate = new Date(activity.date);
      return activityDate.toDateString() === today.toDateString();
    });
    return todayActivities.slice(0, 3);
  };

  return (
    <LinearGradient colors={["#99b09d", "#132b17"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Workout Exercises</Text>

        {/* Recent Activities */}
        {getRecentActivities().length > 0 && (
          <View style={styles.recentActivitiesContainer}>
            <Text style={styles.sectionTitle}>Today's Activities</Text>
            {getRecentActivities().map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <Text style={styles.activityText}>
                  {activity.type} - {activity.duration} min (
                  {activity.caloriesBurned} cal)
                </Text>
              </View>
            ))}
          </View>
        )}

        {exercises.map((exercise) => (
          <View key={exercise.id} style={styles.videoBox}>
            <Text style={styles.videoTitle}>{exercise.title}</Text>
            <Text style={styles.exerciseType}>
              {exercise.type.toUpperCase()}
            </Text>

            {/* Video Player */}
            <Video
              ref={videoRefs[exercise.id]}
              source={exercise.source}
              useNativeControls
              resizeMode="contain"
              style={styles.video}
            />

            {/* Exercise Details */}
            <View style={styles.exerciseDetails}>
              <Text style={styles.detailText}>
                Duration: {exercise.duration} minutes
              </Text>
              <Text style={styles.detailText}>
                Calories: ~
                {Math.round(
                  (exercise.caloriesPerMinute * exercise.duration) / 60
                )}{" "}
                cal
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => videoRefs[exercise.id].current.playAsync()}
              >
                <Text style={styles.playText}>Play</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.logButton, loading && styles.buttonDisabled]}
                onPress={() => logExercise(exercise)}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.logText}>Log Exercise</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Tips Section */}
        <View style={styles.tipsContainer}>
          <Text style={styles.sectionTitle}>Exercise Tips</Text>
          <Text style={styles.tipText}>
            • Warm up before each workout session
          </Text>
          <Text style={styles.tipText}>
            • Maintain proper form to prevent injuries
          </Text>
          <Text style={styles.tipText}>
            • Stay hydrated throughout your workout
          </Text>
          <Text style={styles.tipText}>
            • Listen to your body and rest when needed
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  recentActivitiesContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  activityItem: {
    paddingVertical: 5,
  },
  activityText: {
    color: "#fff",
    fontSize: 14,
  },
  videoBox: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  exerciseType: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "bold",
    marginBottom: 15,
  },
  video: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  exerciseDetails: {
    marginVertical: 15,
    alignItems: "center",
  },
  detailText: {
    fontSize: 14,
    color: "#fff",
    marginVertical: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  playButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  logButton: {
    backgroundColor: "#FF6347",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginLeft: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  playText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  tipsContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
  },
  tipText: {
    color: "#fff",
    fontSize: 14,
    marginVertical: 2,
  },
});

export default ExerciseScreen;
