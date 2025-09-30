import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { countries } from './countries';

const CountriesScreen = () => {
  const handleSelectCountry = (country) => {
    Alert.alert('Country Selected', country);
    // You can add navigation or context logic here
  };

  return (
    <LinearGradient colors={["#99b09d", "#132b17"]} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.header}>Select Your Country</Text>
        <FlatList
          data={countries}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.countryItem} onPress={() => handleSelectCountry(item)}>
              <Text style={styles.countryText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#132b17',
    marginBottom: 20,
    textAlign: 'center',
  },
  countryItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 8,
    marginBottom: 8,
  },
  countryText: {
    fontSize: 18,
    color: '#132b17',
  },
});

export default CountriesScreen; 