import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Account = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Perform any logout logic here
    // Then navigate to the Login screen
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Screen</Text>
      <Text style={styles.subtitle}>This is where user account details will be displayed.</Text>
      <View style={styles.logoutButtonContainer}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  logoutButtonContainer: {
    position: 'absolute',
    bottom: 30,
  },
});

export default Account;
