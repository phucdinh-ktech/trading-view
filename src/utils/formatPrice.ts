const formatPrice = (price: number): string => {
  if (price >= 1_000_000) {
    return (price / 1_000_000).toFixed(2).replace(/\.0+$/, "") + "M";
  } else if (price >= 1_000) {
    return (price / 1_000).toFixed(2).replace(/\.0+$/, "") + "K";
  } else {
    return price.toFixed(2).toString();
  }
};

export default formatPrice;
