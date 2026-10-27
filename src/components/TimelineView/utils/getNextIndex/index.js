export function getNextIndex(currentIndex, total) {
  return Math.min(currentIndex + 1, total - 1);
}
