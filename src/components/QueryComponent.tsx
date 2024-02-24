import React from 'react';
import {View, Image, Text, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
import useGetData from '../hooks/useGetData';

const QueryComponent = () => {
  const {data, isLoading, error, isError} = useGetData();

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {isLoading && (
        <ActivityIndicator testID="loading-indicator" size={'large'} />
      )}
      {!!isError && (
        <Text
          testID="loading-error"
          style={{
            color: 'white',
            alignSelf: 'center',
          }}>
          {error?.message}
        </Text>
      )}
      {data?.media_type === 'image' && typeof data?.hdurl === 'string' && (
        <Image
          testID="image-view"
          source={{uri: data.hdurl}}
          resizeMode="contain"
          style={{flex: 1}}
        />
      )}
      {data?.media_type === 'video' && typeof data?.url === 'string' && (
        <WebView testID="webview" source={{uri: data.url}} style={{flex: 1}} />
      )}
    </View>
  );
};

export default QueryComponent;
