export function checkWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      typeof WebGLRenderingContext !== 'undefined' &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}
