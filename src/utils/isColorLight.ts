export default function isColorLight(hexColor: string): boolean {
  // Remove the '#' if it's present
  hexColor = hexColor.replace("#", "");

  // Parse the color components (R, G, and B)
  const r = parseInt(hexColor.slice(0, 2), 16);
  const g = parseInt(hexColor.slice(2, 4), 16);
  const b = parseInt(hexColor.slice(4, 6), 16);

  // Calculate the luminance using the relative luminance formula
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  // Choose a threshold to determine when to switch text color
  const threshold = 128;

  // If the luminance is below the threshold, the background is dark
  return luminance > threshold;
}
