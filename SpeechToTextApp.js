import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import Voice from '@react-native-voice/voice';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const App = () => {
  const [result, setResult] = useState('');
  const [translatedTexts, setTranslatedTexts] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('english'); // Initialize with a default language
  const API_KEY = 'AIzaSyC9M7Ji1Rbpmzo0iz1LVAsWo-Z9kE6UKyY';
  const BASE_URL = 'https://translation.googleapis.com/language/translate/v2';
  const scrollViewRef = useRef();

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStartHandler = (e) => {
    console.log("start handler==>>>", e);
  };

  const onSpeechEndHandler = (e) => {
    setLoading(false);
    console.log("stop handler", e);
  };

  const onSpeechResultsHandler = (e) => {
    let text = e.value[0];
    setResult(text);
    console.log("speech result handler", e);
  };

  const startRecording = async () => {
    setLoading(true);

    try {
      let languageCode;

      switch (selectedLanguage) {
        case 'english':
          languageCode = 'en-Us';
          break;
        case 'french':
          languageCode = 'fr-CA';
          break;
        case 'cantonese':
          languageCode = 'zh_HK';
          break;
        case 'japanese':
          languageCode = 'ja-JP';
          break;
        default:
          languageCode = 'en-Us';
          break;
      }

      await Voice.start(languageCode);
    } catch (error) {
      console.log("error raised", error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.log("error raised", error);
    }
  };

  const translate = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}?key=${API_KEY}`,
        {
          q: result, // Translate the 'result' text
          target: 'en', 
        }
      );

      if (response.data && response.data.data && response.data.data.translations) {
        const translatedText = response.data.data.translations[0].translatedText;
        setTranslatedTexts((prevText) => prevText + '\n' + translatedText);
      } else {
        console.error('Translation failed.');
      }
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  const stopRecordingAndTranslate = async () => {
    await stopRecording();
    await translate();
  };

  // Placeholder text for different languages
  const placeholderTexts = {
    english: 'Your text',
    french: 'Votre texte',
    cantonese: '你的文字',
    japanese: 'あなたのテキスト',
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
          itemStyle={{ color: "white" }}
        >
          <Picker.Item label="English" value="english" />
          <Picker.Item label="Français" value="french" />
          <Picker.Item label="廣東話" value="cantonese" />
          <Picker.Item label="日本語" value="japanese" />
        </Picker>
      </View>
      <SafeAreaView>
        <View style={styles.textInputStyle}>
          <TextInput
            value={result}
            placeholder={placeholderTexts[selectedLanguage]}
            style={{
              flex: 1,
              padding: 10
            }}
            onChangeText={(text) => setResult(text)}
          />
          {isLoading ? <ActivityIndicator size="large" color="red" /> : (
            <TouchableOpacity onPress={startRecording}>
              <Image
                source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png' }}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginTop: 10,
            padding: 8,
            borderRadius: 4,
          }}
          onPress={stopRecordingAndTranslate}
        >
          <Image
            source={{ uri: 'https://i.ibb.co/ZNn0hZg/free-send-icon-4008-thumb-1.png' }}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles3.container}>
        <ScrollView ref={scrollViewRef}>
          <Text style={styles2.text}>{translatedTexts}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    
  },
  headingText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 26,
  },
  textInputStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 48,
    borderRadius: 20,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
  },
});

const styles2 = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});

const styles3 = StyleSheet.create({
  container: {
    paddingStart: 10,
    paddingTop: 5,
    backgroundColor: 'white',
    borderRadius: 12,
    borderColor: 'black',
    marginTop: 10,
    height: 200,

  },
});

export default App;
