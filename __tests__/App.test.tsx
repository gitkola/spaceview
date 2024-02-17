import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import App from '../App';
import fetchMock from 'jest-fetch-mock';

describe('App', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('displays loading indicator when fetching data', async () => {
    const {getByTestId} = render(<App />);
    await waitFor(() => {
      expect(getByTestId('loading-indicator')).toHaveTextContent('Loading...');
    });
  });

  it('shows an error message on fetch failure', async () => {
    fetchMock.mockReject(new Error('API is down'));

    const {queryByText} = render(<App />);

    await waitFor(() => {
      expect(queryByText('Error')).toBeTruthy();
    });
  });

  it('displays image on fetch success', async () => {
    const mockImageData = {hdurl: 'https://example.com/image.jpg'};
    fetchMock.mockResponseOnce(JSON.stringify(mockImageData));

    const {getByTestId} = render(<App />);

    await waitFor(() => {
      expect(getByTestId('image-view')).toBeTruthy();
      expect(getByTestId('image-view')).toHaveProp('source', {
        uri: 'https://example.com/image.jpg',
      });
    });
  });
});
