import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
//icons
import { Ionicons } from '@expo/vector-icons';

// PANTALLAS
import { HomeScreen } from './screens/homeScreen';
import { TimerScreen } from "./screens/timerScreen";
import { SettingsScreen } from './screens/settingsScreen';

// navegadores
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// ---------- STACK HOME ----------
const HomeStack = () => {


  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
          borderBottomWidth: 1,
          borderBottomColor: '#e6af4a',
        },
        headerTintColor: 'white',
      }}>

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Cronometro SpeedRun' }}/>

      <Stack.Screen
        name="Timer"
        component={TimerScreen}
        options={{ title: "Nueva Run" }}
      />
    </Stack.Navigator>
  );
};

//STACKSETTINGS
const SettingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
          borderBottomWidth: 1,
          borderBottomColor: '#4ae6d9',
        },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Configuración" }}
      />

        
    </Stack.Navigator>
  );
};


// ---------- APP ----------
export default function App() {

  return (
    <NavigationContainer>


      <Tab.Navigator
        screenOptions={{
          headerShown: false,

          tabBarStyle: {
            backgroundColor: 'black',
            borderTopWidth: 1,
            borderTopColor: "#333333",
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
        }}>

        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{ title: 'home',

            tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
               name={focused ? "home" : "home-outline"}
              size={size}
              color={color}/>
          ),}}/>

        <Tab.Screen
          name="SettingsStack"
          component={SettingsStack}
          options={{ title: 'settings',
            tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={focused ? "settings" : "settings-outline"}
            size={size}
            color={color}
          />
        ),
           }}
        />

      </Tab.Navigator>
    
    
    
    </NavigationContainer>
  );
}