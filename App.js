import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from './LoginScreen';
import { MainScreen } from './MainScreen';
import { DictionaryScreen } from './DictionaryScreen';
import { QuizScreen } from './QuizScreen';
import { QuizResultsScreen } from './QuizResultsScreen';
import { DatabaseScreen } from './DatabaseScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"   
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Dictionary" component={DictionaryScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="QuizResults" component={QuizResultsScreen} />
        {/* <Stack.Screen name="Database" component={DatabaseScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;