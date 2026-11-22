export function shouldUseScene(webglAvailable: boolean, reducedMotion: boolean): boolean {
  return webglAvailable && !reducedMotion;
}
