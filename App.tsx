import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import SearchScreen from './src/screens/SearchScreen';
import MiniPlayer from './src/components/MiniPlayer';
import { ThemeProvider, useTheme } from './src/styles/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { usePlayerStore } from './src/store/usePlayerStore';
// import './trackPlayerService';


Alert.alert = () => { };

const Tab = createBottomTabNavigator();

export default function App() {
  const theme = useTheme();
  const { setup } = usePlayerStore();

  useEffect(() => {
    setup()
  }, [])

  return (
    <ThemeProvider>
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <NavigationContainer>

          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarStyle: {
                position: 'absolute',
                backgroundColor: 'rgba(0,0,0,0.4)',
                borderTopWidth: 0,
                elevation: 0,
                shadowOpacity: 0,
              },
              tabBarActiveTintColor: '#FFFFFF',
              tabBarInactiveTintColor: '#B3B3B3',
            }}
          >
            <Tab.Screen
              name="Inicio"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ focused, color, size }) => (
                  <MaterialCommunityIcons
                    name={focused ? 'home' : 'home-outline'}
                    size={28}
                    color={color}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Buscar"
              component={SearchScreen}
              options={{
                tabBarIcon: ({ focused, color, size }) => (
                  <MaterialCommunityIcons
                    name={focused ? 'magnify' : 'magnify'}
                    size={28}
                    color={color}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Biblioteca"
              component={SettingsScreen}
              options={{
                tabBarIcon: ({ focused, color, size }) => (
                  <MaterialCommunityIcons
                    name={focused ? 'library' : 'library-shelves'}
                    size={28}
                    color={color}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
        <MiniPlayer />
      </View>
    </ThemeProvider>
  );
}
