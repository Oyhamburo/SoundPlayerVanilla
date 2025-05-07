import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import MiniPlayer from './src/components/MiniPlayer';
import './trackPlayerService';
import { StyleSheet, View } from 'react-native';
const Tab = createBottomTabNavigator();




export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Pestaña 1" component={HomeScreen} />
          <Tab.Screen name="Pestaña 2" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      <MiniPlayer />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});