import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { PieChart, LineChart, ProgressChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const screenWidth = Dimensions.get("window").width;
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / screenWidth);
    setCurrentIndex(newIndex);
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: logout,
        style: "destructive",
      },
    ]);
  };

  const graphSlides = [
    {
      id: "1",
      title: "Calories Burned",
      component: (
        <View style={styles.graphBox}>
          <Text style={styles.graphTitle}>Calories Burned</Text>
          <PieChart
            data={[
              {
                name: "Burned",
                population: 70,
                color: "#FF6347",
                legendFontColor: "#000",
              },
              {
                name: "Remaining",
                population: 30,
                color: "#D3D3D3",
                legendFontColor: "#000",
              },
            ]}
            width={screenWidth - 80}
            height={200}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            hasLegend={false}
            center={[0, 0]}
            avoidFalseZero
          />
          <Text style={styles.percentageText}>70%</Text>
        </View>
      ),
    },
    {
      id: "2",
      title: "Steps Count",
      component: (
        <View style={styles.graphBox}>
          <Text style={styles.graphTitle}>Steps Count</Text>
          <LineChart
            data={{
              labels: ["M", "T", "W", "T", "F", "S", "S"],
              datasets: [
                {
                  data: [4000, 5000, 7000, 6000, 8000, 10000, 9000],
                  color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
                  strokeWidth: 2,
                },
              ],
            }}
            width={screenWidth - 80}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={{ borderRadius: 16 }}
          />
        </View>
      ),
    },
    {
      id: "3",
      title: "Progress",
      component: (
        <View style={styles.graphBox}>
          <Text style={styles.graphTitle}>Progress</Text>
          <ProgressChart
            data={{
              labels: ["Progress"],
              data: [0.7],
              colors: ["#708774"],
            }}
            width={screenWidth - 80}
            height={200}
            chartConfig={chartConfig}
            hideLegend={false}
            style={{ borderRadius: 16 }}
          />
        </View>
      ),
    },
  ];

  return (
    <LinearGradient colors={["#FFFFFF", "#132b17"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.topContainer}>
          <View style={styles.greetingBox}>
            <Text style={styles.greetingText}>Hey, {user?.name || "User"}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("OptionsScreen")}
            >
              <Image
                source={require("../assets/asslogo.png")}
                style={styles.smallLogo}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.separator} />

        <FlatList
          ref={flatListRef}
          data={graphSlides}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          renderItem={({ item }) => (
            <View style={{ width: screenWidth, alignItems: "center" }}>
              {item.component}
            </View>
          )}
        />

        <View style={styles.dotsContainer}>
          {graphSlides.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            />
          ))}
        </View>

        {/* Rectangular container for the buttons */}
        <View style={styles.buttonContainer}>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.featureButton}
              onPress={() => navigation.navigate("CaloriesScreen")}
            >
              <Text style={styles.buttonText}>Calories</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.featureButton}
              onPress={() => navigation.navigate("StepsScreen")}
            >
              <Text style={styles.buttonText}>Steps Count</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.featureButton}
              onPress={() => navigation.navigate("ProgressScreen")}
            >
              <Text style={styles.buttonText}>Progress</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Exercise Recommendation Button */}
        <TouchableOpacity
          style={styles.recommendationButton}
          onPress={() => navigation.navigate("ExerciseScreen")}
        >
          <Image
            source={require("../assets/exerbutt.png")}
            style={styles.recommendationImage}
          />
          <Text style={styles.recommendationText}>Exercise Recommendation</Text>
        </TouchableOpacity>

        {/* Diet Recommendation Button */}
        <TouchableOpacity
          style={styles.recommendationButton}
          onPress={() => navigation.navigate("DietScreen")}
        >
          <Image
            source={require("../assets/dietnutt.png")}
            style={styles.recommendationImage}
          />
          <Text style={styles.recommendationText}>Diet Recommendation</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#99b09d",
  backgroundGradientTo: "#132b17",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  decimalPlaces: 0,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  greetingBox: {
    backgroundColor: "#132b17",
    padding: 15,
    borderRadius: 30,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greetingText: {
    color: "#4CAF50",
    fontSize: 18,
    fontWeight: "bold",
  },
  smallLogo: {
    width: 40,
    height: 40,
  },
  separator: {
    borderBottomColor: "#D3D3D3",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  graphBox: {
    width: Dimensions.get("window").width - 40,
    backgroundColor: "#000",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  graphTitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  percentageText: {
    position: "absolute",
    top: "40%",
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D3D3D3",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#132b17",
  },
  buttonContainer: {
    backgroundColor: "#132b17", // Set background color for the container
    borderRadius: 16,
    marginVertical: 20,
    padding: 15,
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  featureButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 15,
    margin: 5,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "900", // Set to 900 for the boldest font weight
  },
  recommendationButton: {
    alignItems: "center",
    marginVertical: 5,
    width: "100%", // Ensure the button takes the full width
  },
  recommendationImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  recommendationText: {
    position: "absolute",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
    width: "100%",
    backgroundColor: "transparent", // Removed the blackish background
  },
  logoutButton: {
    alignItems: "center",
    marginVertical: 5,
    width: "100%", // Ensure the button takes the full width
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Dashboard;
