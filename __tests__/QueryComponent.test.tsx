import React from 'react';
import {render, screen, waitFor} from '@testing-library/react-native';
import QueryComponent from '../src/components/QueryComponent';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {http, HttpResponse} from 'msw';
import {server} from '../__mocks__/server';

const doRender = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  render(
    <QueryClientProvider client={queryClient}>
      <QueryComponent />
    </QueryClientProvider>,
  );
};

jest.useFakeTimers();

describe('Testing QueryComponent', () => {
  beforeEach(() => {
    doRender();
  });

  test('displays image on fetch success with useQuery', async () => {
    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
    await waitFor(() => {
      expect(screen.getByTestId('image-view')).toBeTruthy();
      expect(screen.getByTestId('image-view')).toHaveProp('source', {
        uri: 'https://apod.nasa.gov/apod/image/2402/AM1054_Hubble_2000.jpg',
      });
    });
  });

  test('displays an error message on fetch failure with useQuery', async () => {
    server.use(
      http.get(
        `https://api.nasa.gov/planetary/apod`,
        () => {
          return HttpResponse.json(
            {
              error: {
                code: 'API_KEY_INVALID',
                message:
                  'An invalid api_key was supplied. Get one at https://api.nasa.gov:443',
              },
            },
            {
              headers: {'content-type': 'application/json'},
              status: 403,
              statusText: 'Forbidden',
            },
          );
        },
        {once: true},
      ),
    );
    doRender();
    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
    await waitFor(() => {
      expect(screen.getByTestId('loading-error')).toBeTruthy();
      expect(
        screen.getByText('Request failed with status code 403'),
      ).toBeTruthy();
    });
  });

  test('displays loading indicator when fetching data with useQuery', async () => {
    expect(screen.queryByTestId('loading-indicator')).toBeTruthy();
  });

  test('displays WebView on fetch with useQuery', async () => {
    server.use(
      http.get(
        `https://api.nasa.gov/planetary/apod`,
        () => {
          return HttpResponse.json(
            {
              date: '2024-02-20',
              explanation: 'TEST EXPLANATION',
              media_type: 'video',
              service_version: 'v1',
              title: 'TEST TITLE',
              url: 'https://www.youtube.com/embed/x-wX-wClfig?rel=0',
            },
            {
              headers: {'content-type': 'application/json'},
              status: 200,
              statusText: 'Ok',
            },
          );
        },
        {once: true},
      ),
    );
    doRender();
    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
    await waitFor(() => {
      expect(screen.getByTestId('webview')).toBeTruthy();
      expect(screen.getByTestId('webview')).toHaveProp('source', {
        uri: 'https://www.youtube.com/embed/x-wX-wClfig?rel=0',
      });
    });
  });
});
