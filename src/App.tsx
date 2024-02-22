import React from 'react';
import {SafeAreaView} from 'react-native';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import QueryComponent from './components/QueryComponent';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <QueryComponent />
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
