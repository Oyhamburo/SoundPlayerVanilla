import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Screen3 from './screen3';
import './trackPlayerService';
const Tab = createBottomTabNavigator();

const Screen1 = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Contenido de la Pestaña 1</Text>
  </View>
);

const Screen2 = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Contenido de la Pestaña 2</Text>
  </View>
);



export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Pestaña 1" component={Screen3} />
        <Tab.Screen name="Pestaña 2" component={Screen2} />
        <Tab.Screen name="Pestaña 3" component={Screen1} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
