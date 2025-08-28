export default function formatNumber(value: number): string {
  if (value >= 1e9) {
    return (value / 1e9).toFixed(2) + 'B';
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(2) + 'M';
  } else if (value >= 1e4) {
    return (value / 1e4).toFixed(2) + 'K';
  } else if (value.toString().length > 4) {
    return value.toFixed(2);
  } else {
    return value.toString();
  }
}
