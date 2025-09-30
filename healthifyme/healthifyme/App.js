import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import { AuthProvider, useAuth } from "./context/AuthContext";
import OnboardingScreen from "./pages/OnboardingScreen";
import SignupScreen from "./pages/SignupScreen";
import LoginScreen from "./pages/LoginScreen";
import EnterNameScreen from "./pages/EnterNameScreen";
import GoalsSelectionScreen from "./pages/GoalsSelectionScreen";
import GoalDetailsScreen from "./pages/GoalDetailsScreen";
import BaselineActivityScreen from "./pages/BaselineActivityScreen";
import UserInfoScreen from "./pages/UserInfoScreen";
import CountriesScreen from "./pages/CountriesScreen";
import DashboardScreen from "./pages/DashboardScreen";
import OptionsScreen from "./pages/OptionsScreen";
import CaloriesScreen from "./pages/CaloriesScreen";
import StepsScreen from "./pages/StepsScreen";
import ProgressScreen from "./pages/ProgressScreen";
import "react-native-svg";
import { LineChart } from "react-native-chart-kit";
import DietScreen from "./pages/DietScreen";
import ExerciseScreen from "./pages/ExerciseScreen";
import { Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";

const Stack = createStackNavigator();

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <ImageBackground
        source={require("./assets/bgpic.png")}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.8 }}
      >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!user ? (
            // Auth screens
            <>
              <Stack.Screen
                name="OnboardingScreen"
                component={OnboardingScreen}
              />
              <Stack.Screen name="SignupScreen" component={SignupScreen} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
            </>
          ) : (
            // App screens
            <>
              <Stack.Screen
                name="EnterNameScreen"
                component={EnterNameScreen}
              />
              <Stack.Screen
                name="GoalsSelectionScreen"
                component={GoalsSelectionScreen}
              />
              <Stack.Screen
                name="GoalDetailsScreen"
                component={GoalDetailsScreen}
              />
              <Stack.Screen
                name="BaselineActivityScreen"
                component={BaselineActivityScreen}
              />
              <Stack.Screen name="UserInfoScreen" component={UserInfoScreen} />
              <Stack.Screen
                name="CountriesScreen"
                component={CountriesScreen}
              />
              <Stack.Screen
                name="DashboardScreen"
                component={DashboardScreen}
              />
              <Stack.Screen name="OptionsScreen" component={OptionsScreen} />
              <Stack.Screen name="CaloriesScreen" component={CaloriesScreen} />
              <Stack.Screen name="StepsScreen" component={StepsScreen} />
              <Stack.Screen name="ProgressScreen" component={ProgressScreen} />
              <Stack.Screen name="DietScreen" component={DietScreen} />
              <Stack.Screen name="ExerciseScreen" component={ExerciseScreen} />
            </>
          )}
        </Stack.Navigator>
      </ImageBackground>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
