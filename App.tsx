import React, {useState} from 'react';
import {SafeAreaView, Image, Text} from 'react-native';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  useQuery('pictures', () => {
    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
      .then(res => res.json())
      .then(response => {
        setUrl(response.hdurl);
        setError(null);
      })
      .catch(e => {
        setError(e.message);
        setUrl(null);
      });
  });

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

export default function () {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}
