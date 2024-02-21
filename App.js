import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './src/main';
import LayoutGame from './src/layoutGame'
import functions from './src/functions'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          options={{
            headerTransparent: true,
            title: ''
          }}
          name='Main' component={Main}
        />
        <Stack.Screen 
          options={{
            headerTransparent: true,
            headerBackVisible: false,
            title: ''
          }}
          name='LayoutGame' component={LayoutGame}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
