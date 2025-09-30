import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../context/AuthContext";

const options = [
  { name: "My Profile", icon: "person-outline" },
  { name: "Goals", icon: "flag-outline" },
  { name: "Progress", icon: "bar-chart-outline" },
  { name: "My Meals and Foods", icon: "fast-food-outline" },
  { name: "Reminders", icon: "alarm-outline" },
  { name: "Help", icon: "help-circle-outline" },
  { name: "Logout", icon: "log-out-outline" },
];

const OptionsScreen = ({ navigation }) => {
  const { logout } = useAuth();
  return (
    <LinearGradient colors={["#99b09d", "#132b17"]} style={styles.gradient}>
      <View style={styles.container}>
        {/* User Info Section */}
        <View style={styles.header}>
          <Ionicons name="person-circle-outline" size={50} color="#fff" />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Username</Text>
            <Text style={styles.userStats}>
              Streak: 0 days | Progress: 0 kg
            </Text>
          </View>
        </View>

        {/* Menu List */}
        <FlatList
          data={options}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.listContainer}
          // renderItem={({ item }) => (
          //   <TouchableOpacity
          //     style={styles.optionButton}
          //     onPress={() => {
          //       if (item.name === "Logout") {
          //         navigation.reset({
          //           index: 0,
          //           routes: [{ name: "LoginScreen" }],
          //         });
          //       } else {
          //         navigation.navigate(item.name.replace(/ /g, ""));
          //       }
          //     }}
          //   >
          //     <Ionicons
          //       name={item.icon}
          //       size={24}
          //       color="#fff"
          //       style={styles.icon}
          //     />
          //     <Text style={styles.optionText}>{item.name}</Text>
          //   </TouchableOpacity>
          // )}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.optionButton}
              onPress={async () => {
                if (item.name === "Logout") {
                  await logout(); // ✅ this works now
                } else if (item.name === "Progress") {
                  navigation.navigate("ProgressScreen");
                } else if (item.name === "My Meals and Foods") {
                  navigation.navigate("DietScreen");
                } else if (item.name === "Goals") {
                  navigation.navigate("GoalDetailsScreen");
                }
              }}
            >
              <Ionicons
                name={item.icon}
                size={24}
                color="#fff"
                style={styles.icon}
              />
              <Text style={styles.optionText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 }, // Background gradient
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40, // Added padding at the top
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30, // Increased marginBottom
    padding: 20, // Increased padding
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
  },
  userInfo: {
    marginLeft: 15, // Increased marginLeft
  },
  userName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  userStats: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 5, // Added marginTop
  },
  listContainer: {
    paddingBottom: 20, // Added paddingBottom
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 18, // Increased padding
    borderRadius: 10,
    marginVertical: 8, // Adjusted marginVertical
  },
  icon: {
    marginRight: 20, // Increased marginRight
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default OptionsScreen;
