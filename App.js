import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
//icons
import { Ionicons } from '@expo/vector-icons';
import {Pantalla1} from "./Componentes/pantalla1";
import {Pantalla2} from "./Componentes/pantalla2"


// navegadores
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();







// componentes





// ---------- STACK HOME ----------
const Pantalla1Stack = () => {


  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
          borderBottomWidth: 1,
          borderBottomColor: '#e6af4a',
        },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen
        name="Pantalla1"
        component={Pantalla1}
        options={{ title: 'Pantalla 1' }}
      />

    </Stack.Navigator>
  );
};

const Pantalla2Stack = () => {
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
        name="Pantalla2"
        component={Pantalla2}
        options={{ title: 'Pantalla 2' }}
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
            borderTopColor: '#eee8e88a',
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen
          name="Pantalla1Stack"
          component={Pantalla1Stack}
          options={{ title: 'Pantalla 1',



            tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
                name={focused ? 'grid' : 'grid-outline'}
              size={size}
              color={color}
            />
          ),
           }}
        />
        <Tab.Screen
          name="Pantalla2Stack"
          component={Pantalla2Stack}
          options={{ title: 'Pantalla 2',
            tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={focused ? 'grid' : 'grid-outline'}
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