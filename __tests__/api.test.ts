import Config from 'react-native-config';

test('receives a mocked response to a REST API request', async () => {
  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${Config.NASA_API_KEY}`,
  );
  expect(response.status).toBe(200);
  expect(response.statusText).toBe('OK');
  expect(await response.json()).toEqual({
    date: '2024-02-20',
    explanation: 'TEST EXPLANATION',
    hdurl: 'https://apod.nasa.gov/apod/image/2402/AM1054_Hubble_2000.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'TEST TITLE',
    url: 'https://apod.nasa.gov/apod/image/2402/AM1054_Hubble_960.jpg',
  });
});
