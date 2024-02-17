import React, {useEffect, useState} from 'react';
import {SafeAreaView, Image, Text} from 'react-native';

function App(): React.JSX.Element {
  const [data, setData] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await fetch(
          'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY',
        );
        const response = await res.json();
        setData(response.hdurl);
        setError(false);
      } catch (e) {
        setError(true);
        setData('');
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      {isLoading && (
        <Text
          testID="loading-indicator"
          style={{
            color: 'white',
            alignSelf: 'center',
          }}>
          Loading...
        </Text>
      )}
      {!!error && (
        <Text
          style={{
            color: 'white',
            alignSelf: 'center',
          }}>
          Failed to load image
        </Text>
      )}
      {!!data && (
        <Image
          testID="image-view"
          source={{uri: data}}
          resizeMode="contain"
          style={{flex: 1}}
        />
      )}
    </SafeAreaView>
  );
}

export default function () {
  return <App />;
}
