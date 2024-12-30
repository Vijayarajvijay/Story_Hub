import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import BottomTab from './src/components/BottomTab';
import GenresList from './src/screens/GenresList';
import CreateGenre from './src/screens/CreateGenre';
import StoriesList from './src/screens/StoriesList';
import StoryDetails from './src/screens/StoryDetails';
import AudioBookGenre from './src/screens/AudioBookGenre';
import AudioBookList from './src/screens/AudioBookList';
import OfflineStorysList from './src/screens/OfflineStorysList';
import OffllineStoryDetials from './src/screens/OffllineStoryDetials';
import ErrorBoundary from './ErrorBoundary';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider> 
      <ErrorBoundary>
        <NavigationContainer>
        <StatusBar hidden={false} />
          <SafeAreaView style={{ flex: 1 }}>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen
                options={{ headerShown: false }}
                name="Login"
                component={LoginScreen}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="SignupScreen"
                component={SignupScreen}
              />
              <Stack.Screen
                name="BottomTab"
                options={{ headerShown: false }}
                component={BottomTab}
              />
              <Stack.Screen name="Genres" component={GenresList} />
              <Stack.Screen name="Create Story" component={CreateGenre} />
              <Stack.Screen name="Stories" component={StoriesList} />
              <Stack.Screen name="Story Details" component={StoryDetails} />
              <Stack.Screen name="All Genres" component={AudioBookGenre} />
              <Stack.Screen name="Audio Stories" component={AudioBookList} />
              <Stack.Screen name="Offline Stories" component={OfflineStorysList} />
              <Stack.Screen
                name="Offline Story Details"
                component={OffllineStoryDetials}
              />
            </Stack.Navigator>

            {/* <View style={styles.svgContainer}>
              <Svg height="100" width="100">
                <Circle cx="50" cy="50" r="40" stroke="black" strokeWidth="2" fill="blue" />
               
                <Rect x="20" y="20" width="60" height="60" stroke="black" strokeWidth="2" fill="red" />
              </Svg>
            </View> */}
            <Toast/>
          </SafeAreaView>
        </NavigationContainer>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
