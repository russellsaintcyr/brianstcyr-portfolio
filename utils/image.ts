export function generatePlaceholderImage(width: number = 800, height: number = 600, text: string = 'Artwork'): string {
  return `https://via.placeholder.com/${width}x${height}/f8f9fa/333333?text=${encodeURIComponent(text)}`;
}

export function getImageDimensions(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = reject;
    img.src = url;
  });
}