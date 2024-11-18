import useSWR from 'swr';

import { urls } from '@/constants/urls';
import { UserType } from '@/types/common/user';

import { fetcher } from './fetcher';

export const useFetchUsers = (params?: string) => {
  const { data, isLoading, error, isValidating, mutate } = useSWR<UserType[]>(
    `${urls.USERS}?${params || ''}`,
    fetcher
  );

  return {
    data: data || null,
    isLoading,
    isValidating,
    error,
    mutate,
  };
};
