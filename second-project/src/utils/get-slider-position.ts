export default function getSliderPosition(strength: number): string {
  switch (strength) {
    case 0:
      return 'left-0';
    case 1:
      return 'left-[20%]';
    case 2:
      return 'left-[40%]';
    case 3:
      return 'left-[60%]';
    case 4:
      return 'left-[80%]';
    case 5:
      return 'left-[99%]';
    default:
      return 'left-0';
  }
}
