import { spawnSync } from 'node:child_process';
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

process.exit(result.status ?? 1);
