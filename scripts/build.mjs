import { spawnSync } from 'node:child_process';

const run = (command, args) => {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: {
      ...process.env,
      ROLLUP_DISABLE_NATIVE: process.env.ROLLUP_DISABLE_NATIVE ?? '1',
    },
  });

  if (result.error) {
    throw result.error;
  }

  if (typeof result.status === 'number' && result.status !== 0) {
    process.exit(result.status);
  }
};

run('tsc', ['-b']);
run('vite', ['build']);
