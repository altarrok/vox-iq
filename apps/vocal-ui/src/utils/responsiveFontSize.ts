import { Dimensions } from 'react-native';

// Get screen dimensions
const { width } = Dimensions.get('window');

export const responsiveFontSize = (f: number): number => {
  // Return font size that is the specified fraction of screen width
  return width * (f / 100);
};