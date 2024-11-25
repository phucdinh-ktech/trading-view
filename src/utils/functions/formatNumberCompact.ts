export function formatNumberCompact(value: number): string {
  if (value < 1000) {
    return value.toString();
  } else if (value >= 1000 && value < 1_000_000) {
    return `${(value / 1000).toFixed(1)}K`;
  } else if (value >= 1_000_000 && value < 1_000_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  } else {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  }
}
