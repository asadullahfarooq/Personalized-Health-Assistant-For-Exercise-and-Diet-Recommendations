import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../src/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("userToken");
      const storedUser = await AsyncStorage.getItem("userData");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error loading stored user:", error);
    } finally {
      setLoading(false);
    }
  };

  // const login = async (email, password) => {
  //   try {
  //     const response = await api.post("/users/login", { email, password });
  //     const { token: userToken, user: userData } = response.data;

  //     await AsyncStorage.setItem("userToken", userToken);
  //     await AsyncStorage.setItem("userData", JSON.stringify(userData));

  //     setToken(userToken);
  //     setUser(userData);
  //     console.log("Login successful:", userData);
  //     return { success: true };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       error: error.response?.data?.error || "Login failed",
  //     };
  //   }
  // };

  const login = async (email, password) => {
    console.log("Attempting login with:", { email }); // Never log passwords

    try {
      const response = await api.post("/users/login", { email, password });

      console.log("Login API response:", response);

      const { token: userToken, user: userData } = response.data;

      await AsyncStorage.setItem("userToken", userToken);
      await AsyncStorage.setItem("userData", JSON.stringify(userData));

      console.log("Token and user data saved to AsyncStorage");
      console.log("User data:", userData);

      setToken(userToken);
      setUser(userData);

      console.log("Login state updated");

      return { success: true };
    } catch (error) {
      console.error("Login error:", error); // Full error object
      console.error("Response error:", error.response?.data);

      return {
        success: false,
        error: error.response?.data?.error || "Login failed",
      };
    }
  };

  const register = async (email, password, name) => {
    try {
      const response = await api.post("/users/register", {
        email,
        password,
        name,
      });
      const { token: userToken, user: userData } = response.data;

      await AsyncStorage.setItem("userToken", userToken);
      await AsyncStorage.setItem("userData", JSON.stringify(userData));

      setToken(userToken);
      setUser(userData);

      return { success: true };
    } catch (error) {
      console.error("Register API error:", error); // ✅ see full error
      return {
        success: false,
        error: error.response?.data?.error || "Registration failed",
      };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userData");
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const updateUserProfile = async (profileData) => {
    try {
      const response = await api.post("/users/profile", profileData);
      const updatedUser = response.data;

      await AsyncStorage.setItem("userData", JSON.stringify(updatedUser));
      setUser(updatedUser);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Profile update failed",
      };
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
