import React from 'react';
import { SafeAreaView, StatusBar, View, StyleSheet, ImageBackground, Text, Button, Image, Touchable, TouchableOpacity } from 'react-native';
import SpeechToTextApp from './SpeechToTextApp';
import WordSearch from './WordSearch';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import GameScreen from './GameScreen'

type RootStackParamList = {
  Home: undefined;
  Game: undefined;
  Game2: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Home = ({ navigation }: any) => {
  const page_bg = 'https://i.ibb.co/jWH2j6K/photo-1569982175971-d92b01cf8694.jpg';
  const shoeIcon = 'https://i.ibb.co/TMJwcMM/79241-200-1.png';
  const communityShoeIcon = 'https://i.ibb.co/bHp8pJB/3127995-1.png';

  return (
    <ImageBackground
      source={{ uri: page_bg }}
      resizeMode="cover"
      style={styles2.image}
    >
      <SafeAreaView style={styles.container}>
        <View style={{marginTop: 20}}>
        <View style={styles.stepCounter}>
          <View style={styles.stepItem}>
            <Image source={{ uri: shoeIcon }} style={styles.shoeImage} />
            <Text style={styles.stepsText}>1500</Text>
          </View>
          <View style={styles.stepItem}>
            <Image source={{ uri: communityShoeIcon }} style={styles.shoeImage} />
            <Text style={styles.stepsText}>18500</Text>
          </View>
        </View>
        </View>
        <View style={styles2.titleBox}>
          <Text style={styles2.titleText}>Wave, a place for community. 👋</Text>
        </View>
        <StatusBar barStyle="dark-content" />
        <View style={{ flex: 1}}>
    <SpeechToTextApp />


  <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 40}}>
  <View style={button.buttonContainer}>
    <TouchableOpacity style={button.button1} onPress={() => navigation.navigate('Game')}>
      <Text style={button.buttonText}>Word Search</Text>
    </TouchableOpacity>
    <TouchableOpacity style={button.button3} onPress={() => navigation.navigate('Game')}>
      <Text style={button.buttonText}>Word Search</Text>
    </TouchableOpacity>
    <TouchableOpacity style={button.button2} onPress={() => navigation.navigate('Game2')}>
      <Text style={button.buttonText}>Memory Game</Text>
    </TouchableOpacity>
  </View>
</View>
</View>

      </SafeAreaView>
    </ImageBackground>
  );
};

const Game = ({ navigation }: any) => {

  const game_bg = 'https://i.ibb.co/jWH2j6K/photo-1569982175971-d92b01cf8694.jpg'
  return (
    <ImageBackground
      source={{ uri: game_bg }}
      resizeMode="cover"
      style={styles2.image}
    >
      <SafeAreaView style={styles3.container}>
        <View style={styles3.contentContainer}>
          <View style={{paddingTop: 130}}>
          <WordSearch />
          </View>
          <View style = {{paddingBottom : 100}}>
          <TouchableOpacity style={button.button} onPress={() => navigation.navigate('Home')}>
            <Text style={button.buttonText}>Home</Text>
          </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const Game2 = ({ navigation }: any) => {

  const game_bg = 'https://i.ibb.co/jWH2j6K/photo-1569982175971-d92b01cf8694.jpg'
  return (
    <ImageBackground
      source={{ uri: game_bg }}
      resizeMode="cover"
      style={styles2.image}
    >
      <SafeAreaView style={styles3.container}>
        <View style={styles3.contentContainer}>
          <View style={{paddingTop: 130, justifyContent: 'center', alignItems: 'center'}}>
          <GameScreen />
          </View>
          <View style = {{paddingBottom : 100}}>
          <TouchableOpacity style={button.button} onPress={() => navigation.navigate('Home')}>
            <Text style={button.buttonText}>Home</Text>
          </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Game" component={Game} options={{ headerShown: false }} />
        <Stack.Screen name="Game2" component={Game2} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 60,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 80,
  },
  shoeImage: {
    width: 40,
    height: 40,
    marginRight: 4,
  },
  stepsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },

});

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    flex: 1,
  },
  titleBox: {
    backgroundColor: 'transparent',
    marginTop: 40,
    justifyContent: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 33,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});

const styles3 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10, 
  },
});

const button = StyleSheet.create({

  button: {
    backgroundColor: 'purple',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 90,
  },
  button1: {
    backgroundColor: 'purple',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 140,
  },
  button2: {
    backgroundColor: 'purple',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 160,
  },
  button3: {
    backgroundColor: 'purple',
    opacity: 0,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
  },
})

export default App;
