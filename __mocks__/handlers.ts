import {http, HttpResponse} from 'msw';
import Config from 'react-native-config';

export const handlers = [
  http.get(`https://api.nasa.gov/planetary/apod`, ({request}) => {
    const url = new URL(request.url);
    const api_key = url.searchParams.get('api_key');

    if (api_key !== Config.NASA_API_KEY) {
      return new HttpResponse(
        {
          error: {
            code: 'API_KEY_MISSING',
            message:
              'No api_key was supplied. Get one at https://api.nasa.gov:443',
          },
        },
        {
          status: 403,
        },
      );
    }

    return HttpResponse.json(
      {
        date: '2024-02-20',
        explanation: 'TEST EXPLANATION',
        hdurl: 'https://apod.nasa.gov/apod/image/2402/AM1054_Hubble_2000.jpg',
        media_type: 'image',
        service_version: 'v1',
        title: 'TEST TITLE',
        url: 'https://apod.nasa.gov/apod/image/2402/AM1054_Hubble_960.jpg',
      },
      {
        status: 200,
      },
    );
  }),
];
