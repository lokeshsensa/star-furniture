/**
 * Helper to resolve asset paths cleanly for local dev and GitHub Pages base path deployment.
 */
export const getPublicAsset = (path: string): string => {
  if (!path) return '';
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = import.meta.env.BASE_URL || '/';
  // Ensure baseUrl ends with a slash
  const formattedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${formattedBase}${cleanPath}`;
};
