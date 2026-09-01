import { spawnSync } from 'node:child_process';
import { existsSync, renameSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const cliPath = fileURLToPath(new URL('../node_modules/vinext/dist/cli.js', import.meta.url));
const basePath = '/vibe-coding-course-samples';
const result = spawnSync(process.execPath, [cliPath, 'build'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    GITHUB_PAGES: 'true',
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

// Vinext writes prefixed assets into dist/client/<basePath>/_next, while
// GitHub Pages already mounts dist/client at <basePath>. Move the assets to
// the artifact root so URLs such as <basePath>/_next/... resolve correctly.
const outputRoot = fileURLToPath(new URL('../dist/client/', import.meta.url));
const nestedAssetDirectory = fileURLToPath(
  new URL(`../dist/client${basePath}/_next/`, import.meta.url),
);
const pagesAssetDirectory = fileURLToPath(new URL('../dist/client/_next/', import.meta.url));

if (existsSync(nestedAssetDirectory)) {
  rmSync(pagesAssetDirectory, { recursive: true, force: true });
  renameSync(nestedAssetDirectory, pagesAssetDirectory);
  rmSync(fileURLToPath(new URL(`../dist/client${basePath}/`, import.meta.url)), {
    recursive: true,
    force: true,
  });
}

if (!existsSync(pagesAssetDirectory)) {
  throw new Error(`GitHub Pages assets were not generated under ${outputRoot}`);
}
