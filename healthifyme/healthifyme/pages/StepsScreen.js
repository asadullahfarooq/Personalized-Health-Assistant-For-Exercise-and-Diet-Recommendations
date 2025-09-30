import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";

const StepsScreen = () => {
  const [timeFrame, setTimeFrame] = useState("daily"); // daily, weekly, monthly, yearly

  // Sample data for steps count progress
  const data = {
    daily: {
      labels: ["6 AM", "12 PM", "6 PM", "12 AM"],
      datasets: [{ data: [1000, 3000, 2000, 4000] }],
    },
    weekly: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [{ data: [5000, 6000, 7000, 8000, 9000, 10000, 11000] }],
    },
    monthly: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [{ data: [20000, 25000, 30000, 35000] }],
    },
    yearly: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [{ data: [100000, 120000, 140000, 160000, 180000, 200000, 220000, 240000, 260000, 280000, 300000, 320000] }],
    },
  };

  return (
    <LinearGradient colors={["#99b09d", "#132b17"]} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={[styles.title, { marginTop: 40 }]}>Steps Count Progress</Text>

        <View style={[styles.timeFrameContainer, { marginTop: 20 }]}>
          {["daily", "weekly", "monthly", "yearly"].map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.timeFrameButton, timeFrame === item && styles.activeButton]}
              onPress={() => setTimeFrame(item)}
            >
              <Text style={styles.timeFrameText}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ marginTop: 20 }}>
          <BarChart
            data={data[timeFrame]}
            width={Dimensions.get("window").width - 40}
            height={220}
            yAxisLabel=""
            chartConfig={{
              backgroundGradientFrom: "#99b09d",
              backgroundGradientTo: "#132b17",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: { borderRadius: 16 },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 }, // Background gradient
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0b140c", // Keep the main container white
    margin: 15,
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#4CAF50",
  },
  timeFrameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  timeFrameButton: {
    backgroundColor: "#D3D3D3",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#4CAF50",
  },
  timeFrameText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default StepsScreen;
