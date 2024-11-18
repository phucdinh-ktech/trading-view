import { AddressType } from '@/types/common/address';
import { ImageType } from '@/types/common/image';

export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: 'Male' | 'Female';
  gsm: string;
  createdAt: string;
  isActive: boolean;
  avatar: ImageType[];
  addresses: AddressType[];
};
