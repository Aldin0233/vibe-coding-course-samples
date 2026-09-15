const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const guideRoute = /^\/(github|vscode|vibe-coding|supabase|vercel)\/?$/;

export function withBasePath(path: string) {
  if (!path.startsWith('/')) return path;
  const route = path.match(guideRoute);
  if (route) return `${configuredBasePath}/${route[1]}/`;
  return `${configuredBasePath}${path}`;
}