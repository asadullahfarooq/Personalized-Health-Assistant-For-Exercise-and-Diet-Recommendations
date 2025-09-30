import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";

const { width, height } = Dimensions.get("window");

const slides = [
  { id: "1", image: require("../assets/page1.png") },
  { id: "2", image: require("../assets/page2.png") },
  { id: "3", image: require("../assets/page3.png") },
];

export default function OnboardingScreen({ navigation }) {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    setCurrentIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to</Text>
      <Text style={styles.brandName}>HealthifyMe</Text>

      <View style={styles.sliderContainer}>
        <FlatList
          ref={flatListRef}
          data={slides}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <Image source={item.image} style={styles.image} />
            </View>
          )}
        />
      </View>

      <View style={styles.dotContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>

      <Text style={styles.tagline}>
        Ready for some wins? Start tracking, it's easy!
      </Text>

      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate("SignupScreen")}
      >
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  welcomeText: {
    fontSize: 18,
    color: "#aaa",
    marginTop: 40,
  },
  brandName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#32cd32",
    marginBottom: 20,
  },
  sliderContainer: {
    width: width * 0.9,
    height: height * 0.5,
    borderRadius: 20,
    overflow: "hidden",
  },
  slide: {
    width: width * 0.8,
    height: height * 0.5,
    marginHorizontal: 10,
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  dotContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#4CAF50",
  },
  tagline: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  signupButton: {
    width: "80%",
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 10,
  },
  signupText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    color: "#4CAF50",
    fontSize: 16,
  },
});