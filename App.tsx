import { View, Text, Button, StyleSheet, Switch,Image } from 'react-native'
import React, { useState } from 'react'
import TextRecognition from '@react-native-ml-kit/text-recognition';
import ImagePicker from 'react-native-image-crop-picker';
import TextMap from './TextMap';

export default function App() {
  const [image, setImage] = useState('https://i2-prod.liverpoolecho.co.uk/incoming/article17096840.ece/ALTERNATES/s1200d/0_whatsappweb1_censored.jpg');
  const [result, setResult] = useState();
  const [showBlocks, setShowBlocks] = useState(true);
  const [blocks,setBlocks]=useState('');
  const [words,setWords]=useState('');
  const [showWords, setShowWords] = useState(false);

  const handlePress = async () => {
    setResult(undefined);

    const _image = await ImagePicker.openPicker({
      mediaType: 'photo',
      width: 350,
      height: 200,
      cropping: true,
    });
    setImage(_image);

    const _result = await TextRecognition.recognize('file://' + _image.path);
    console.log('results',_result.text)
    setBlocks(_result.text);
    setResult(_result);
  };
  return (
    <View style={styles.container}>
      <Button title="Choose an Image" onPress={handlePress} />

      {image && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image.path }}
            style={[styles.image, { height: image.height, width: image.width }]}
          />

          {result && (
            <TextMap
              blocks={result.blocks}
              showBlocks={showBlocks}
              showWords={showWords}
            />
          )}

          <View style={styles.switchContainer}>
            <Switch value={showBlocks} onValueChange={setShowBlocks} />
            <Text style={styles.switchLabel}>Show Blocks</Text>
          </View>
          <View style={styles.switchContainer}>
            <Switch value={showWords} onValueChange={setShowWords} />
            <Text style={styles.switchLabel}>Show Words</Text>
           
          </View>
          <Text style={{textAlign:'center'}}> {blocks}</Text>
         
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 10,
  },
  imageContainer: {
    marginTop: 15,
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  switchLabel: {
    color: '#333',
    marginLeft: 15,
  },
});
