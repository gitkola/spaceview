import React, {useState, useEffect} from 'react';
import {SafeAreaView, Image, Text} from 'react-native';

function App(): React.JSX.Element {
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
      .then(res => res.json())
      .then(response => {
        setUrl(response.hdurl);
        setError(null);
      })
      .catch(e => {
        console.log(e);
        setError(e.message);
        setUrl(null);
      });
  }, []);

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      {error && (
        <Text
          style={{
            color: 'white',
            alignSelf: 'center',
          }}>
          {error}
        </Text>
      )}
      {url && (
        <Image source={{uri: url}} resizeMode="contain" style={{flex: 1}} />
      )}
    </SafeAreaView>
  );
}

export default App;
