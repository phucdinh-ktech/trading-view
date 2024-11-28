export function formatNumberWithCommas(number: number | string): string {
  return new Intl.NumberFormat("en-US").format(Number(number));
}
