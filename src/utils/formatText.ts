import dayjs from 'dayjs';

export const formatCurrency = (currency: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(currency);
};

export const formatQuantity = (quantity: string | number) => {
  return String(quantity).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.');
};

export const formatDate = (date: string) => {
  return dayjs(date).format('DD/MM/YYYY');
};
