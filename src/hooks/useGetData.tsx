import {useQuery} from '@tanstack/react-query';
import Config from 'react-native-config';
import axios, {AxiosError} from 'axios';

type ResponseType = {
  url: string;
  media_type: 'image' | 'video';
  hdurl: string;
};

const fetchData = async () => {
  const response = await axios.get(
    `https://api.nasa.gov/planetary/apod?api_key=${Config.NASA_API_KEY}`,
  );
  return response.data;
};

const useGetData = () =>
  useQuery<ResponseType, AxiosError>({
    queryKey: ['image'],
    queryFn: fetchData,
  });

export default useGetData;
