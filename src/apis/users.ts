import axiosInstance from '@/apis/axiosInstance';
import { urls } from '@/constants/urls';

export const usersApi = {
  getAll(params?: string) {
    return axiosInstance.get(`${urls.USERS}?${params}`);
  },
};
