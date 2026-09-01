const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function withBasePath(path: string) {
  if (!path.startsWith('/')) return path;
  if (configuredBasePath && (path === '/github' || path === '/github/')) return `${configuredBasePath}/github.html`;
  if (configuredBasePath && (path === '/vscode' || path === '/vscode/')) return `${configuredBasePath}/vscode.html`;
  return `${configuredBasePath}${path}`;
}
