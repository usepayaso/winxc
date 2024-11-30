export const easeOutCubic = (progress: number): number => {
  return 1 - Math.pow(1 - progress, 3);
};

export const calculateRotation = (
  currentRotation: number,
  targetRotation: number,
  progress: number
): number => {
  const eased = easeOutCubic(progress);
  return currentRotation + (targetRotation - currentRotation) * eased;
};