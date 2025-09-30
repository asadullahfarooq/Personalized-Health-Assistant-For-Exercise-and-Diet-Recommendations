import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';

const healthIssuesList = [
  'No health issues',
  'Heart Disease',
  'Kidney Issues',
  'Blood Pressure Problems',
  'Breathing Problems',
  'Diabetes',
];

const UserinfoScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kgs');
  const [bmi, setBMI] = useState(null);
  const [bsa, setBSA] = useState(null);
  const [selectedHealthIssues, setSelectedHealthIssues] = useState([]);
  
  // New state for enhanced BMI analysis
  const [bmiAnalysis, setBmiAnalysis] = useState(null);
  const [isLoadingBMI, setIsLoadingBMI] = useState(false);
  const [gender, setGender] = useState('male');

  // Automatically calculate BMI and BSA when height or weight changes
  useEffect(() => {
    calculateBMIAndBSA();
  }, [heightFeet, heightInches, weight, weightUnit]);

  const calculateBMIAndBSA = () => {
    if (!heightFeet || !heightInches || !weight) {
      setBMI(null);
      setBSA(null);
      return;
    }

    // Convert height to meters
    const heightInMeters = parseInt(heightFeet) * 0.3048 + parseFloat(heightInches) * 0.0254;

    // Convert weight to kgs if in lbs
    let weightInKgs = parseFloat(weight);
    if (weightUnit === 'lbs') {
      weightInKgs *= 0.453592;
    }

    // Calculate BMI
    const bmiValue = (weightInKgs / (heightInMeters * heightInMeters)).toFixed(2);
    setBMI(bmiValue);

    // Calculate BSA (Mosteller formula)
    const bsaValue = Math.sqrt((heightInMeters * weightInKgs) / 3600).toFixed(2);
    setBSA(bsaValue);
  };

  // New function to get enhanced BMI analysis from backend
  const getEnhancedBMIAnalysis = async () => {
    if (!heightFeet || !heightInches || !weight || !age) {
      Alert.alert('Error', 'Please fill in height, weight, and age for BMI analysis.');
      return;
    }

    setIsLoadingBMI(true);
    try {
      // Convert height to cm
      const heightInCm = (parseInt(heightFeet) * 30.48) + (parseFloat(heightInches) * 2.54);
      
      // Convert weight to kg
      let weightInKg = parseFloat(weight);
      if (weightUnit === 'lbs') {
        weightInKg *= 0.453592;
      }

      const response = await fetch('http://localhost:5000/api/users/calculate-bmi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          height: heightInCm,
          weight: weightInKg,
          age: parseInt(age),
          gender: gender
        })
      });

      const result = await response.json();
      
      if (result.error) {
        Alert.alert('Error', result.error);
      } else {
        setBmiAnalysis(result);
      }
    } catch (error) {
      console.error('BMI Analysis Error:', error);
      Alert.alert('Error', 'Failed to get BMI analysis. Please try again.');
    } finally {
      setIsLoadingBMI(false);
    }
  };

  const toggleHealthIssue = (issue) => {
    setSelectedHealthIssues((prevIssues) =>
      prevIssues.includes(issue) ? prevIssues.filter((i) => i !== issue) : [...prevIssues, issue]
    );
  };

  const handleSignUp = () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !age ||
      !heightFeet ||
      !heightInches ||
      !weight ||
      selectedHealthIssues.length === 0
    ) {
      Alert.alert('Error', 'Please fill all fields before signing up.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    navigation.navigate('DashboardScreen');
  };
  
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Sign Up</Text>

          {/* First & Last Name */}
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="First Name"
              placeholderTextColor="#000"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Last Name"
              placeholderTextColor="#000"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          {/* Email & Password */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#000"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#000"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#000"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          {/* Age */}
          <TextInput
            style={styles.input}
            placeholder="Age"
            placeholderTextColor="#000"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />

          {/* Gender Selection */}
          <View style={styles.row}>
            <TouchableOpacity 
              style={[styles.genderButton, gender === 'male' && styles.selectedGender]}
              onPress={() => setGender('male')}
            >
              <Text style={[styles.genderText, gender === 'male' && styles.selectedGenderText]}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.genderButton, gender === 'female' && styles.selectedGender]}
              onPress={() => setGender('female')}
            >
              <Text style={[styles.genderText, gender === 'female' && styles.selectedGenderText]}>Female</Text>
            </TouchableOpacity>
          </View>

          {/* Height */}
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Height (Feet)"
              placeholderTextColor="#000"
              value={heightFeet}
              onChangeText={setHeightFeet}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Height (Inches)"
              placeholderTextColor="#000"
              value={heightInches}
              onChangeText={setHeightInches}
              keyboardType="numeric"
            />
          </View>

          {/* Weight */}
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Weight"
              placeholderTextColor="#000"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
            />
            {/* Replaced Picker with simple buttons */}
            <View style={[styles.pickerContainer, styles.halfInput, { flexDirection: 'row', justifyContent: 'space-around' }]}>
              <TouchableOpacity onPress={() => setWeightUnit('kgs')}>
                <Text style={{ color: weightUnit === 'kgs' ? '#FFF' : '#000', fontWeight: 'bold' }}>kgs</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setWeightUnit('lbs')}>
                <Text style={{ color: weightUnit === 'lbs' ? '#FFF' : '#000', fontWeight: 'bold' }}>lbs</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Display BMI and BSA */}
          {bmi && bsa && (
            <View style={styles.bmiBsaContainer}>
              <Text style={styles.bmiBsaText}>Your BMI: {bmi}</Text>
              <Text style={styles.bmiBsaText}>Your BSA: {bsa} m²</Text>
              
              {/* Enhanced BMI Analysis Button */}
              <TouchableOpacity 
                style={styles.analysisButton} 
                onPress={getEnhancedBMIAnalysis}
                disabled={isLoadingBMI}
              >
                {isLoadingBMI ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <Text style={styles.analysisButtonText}>Get AI BMI Analysis</Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* Enhanced BMI Analysis Results */}
          {bmiAnalysis && (
            <View style={styles.analysisContainer}>
              <Text style={styles.analysisTitle}>AI BMI Analysis</Text>
              <Text style={styles.analysisText}>BMI: {bmiAnalysis.bmi}</Text>
              <Text style={styles.analysisText}>Category: {bmiAnalysis.label}</Text>
              <Text style={styles.analysisText}>Method: {bmiAnalysis.method}</Text>
              
              {/* Health Recommendations */}
              {bmiAnalysis.recommendations && (
                <View style={styles.recommendationsContainer}>
                  <Text style={styles.recommendationsTitle}>Health Recommendations:</Text>
                  
                  <Text style={styles.recommendationSection}>🥗 Diet:</Text>
                  {bmiAnalysis.recommendations.diet.slice(0, 2).map((rec, index) => (
                    <Text key={index} style={styles.recommendationText}>• {rec}</Text>
                  ))}
                  
                  <Text style={styles.recommendationSection}>🏃‍♂️ Exercise:</Text>
                  {bmiAnalysis.recommendations.exercise.slice(0, 2).map((rec, index) => (
                    <Text key={index} style={styles.recommendationText}>• {rec}</Text>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* Health Issues Selection */}
          <Text style={styles.subtitle}>Select Your Health Issues</Text>
          <FlatList
            data={healthIssuesList}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.healthIssueRow}
                onPress={() => toggleHealthIssue(item)}
              >
                <Text style={styles.bullet}>
                  {selectedHealthIssues.includes(item) ? '✓' : '•'}
                </Text>
                <Text style={styles.healthIssueText}>{item}</Text>
              </TouchableOpacity>
            )}
          />

          {/* Sign Up Button */}
          <TouchableOpacity style={styles.greenButton} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


// ✅ Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(123, 232, 141, 0.6)', // #7be88d with 80% opacity
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 15,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4CAF50',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    color: '#000',
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  pickerContainer: {
    backgroundColor: '#4CAF50',
    borderWidth: 1,
    borderColor: '#29ab3f',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  greenButton: {
    backgroundColor: '#28A745',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bmiBsaContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  bmiBsaText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  healthIssueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bullet: {
    fontSize: 16,
    marginRight: 10,
    color: '#333',
  },
  healthIssueText: {
    fontSize: 16,
    color: '#333',
  },
  analysisButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  analysisButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  analysisContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#e8f5e8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E7D32',
  },
  analysisText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  recommendationsContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E7D32',
  },
  recommendationSection: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 5,
    color: '#333',
  },
  recommendationText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
    marginBottom: 3,
  },
  genderButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedGender: {
    backgroundColor: '#4CAF50',
    borderColor: '#2E7D32',
  },
  genderText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectedGenderText: {
    color: '#FFF',
  },
});

export default UserinfoScreen;
