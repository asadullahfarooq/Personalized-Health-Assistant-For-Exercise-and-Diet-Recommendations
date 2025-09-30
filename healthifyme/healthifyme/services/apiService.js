import api from "../src/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../src/api";

export const apiService = {
  // User Profile
  updateProfile: async (profileData) => {
    try {
      const response = await api.post("/users/profile", profileData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Failed to update profile",
      };
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get("/users/profile");
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Failed to get profile",
      };
    }
  },

  // Goals
  updateGoals: async (goals) => {
    try {
      const response = await api.put("/users/goals", goals);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Failed to update goals",
      };
    }
  },

  // Activities
  addActivity: async (activity) => {
    try {
      console.log(BASE_URL);
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.post(
        `${BASE_URL}/users/activities`, // Your route
        activity,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { success: true, data: response.data };
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error || "Failed to log activity",
      };
    }
  },

  getActivities: async () => {
    try {
      const response = await api.get("/users/activities");
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Failed to get activities",
      };
    }
  },

  // Diet
  addDietEntry: async (dietEntry) => {
    try {
      const response = await api.post("/users/diet", dietEntry);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Failed to add diet entry",
      };
    }
  },

  getDietEntries: async () => {
    try {
      const response = await api.get("/users/diet");
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Failed to get diet entries",
      };
    }
  },

  // Progress
  addProgressEntry: async (progressEntry) => {
    try {
      const response = await api.post("/users/progress", progressEntry);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Failed to add progress entry",
      };
    }
  },

  getProgress: async () => {
    try {
      const response = await api.get("/users/progress");
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Failed to get progress",
      };
    }
  },
};

export default apiService;
