import axiosInstance from '@/apis/axiosInstance';

export const fetcher = (url: string) =>
  axiosInstance.get(url).then(res => res.data);
