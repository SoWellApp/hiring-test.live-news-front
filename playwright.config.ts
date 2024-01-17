import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  importTestFrom: './test/fixtures.ts',
  paths: ['./test/integration/**/*.feature'],
  require: ['test/integration/**/steps/*.ts'],
  quotes: 'backtick',
  featuresRoot: './test/integration',
});

export default defineConfig({
  testDir,
  reporter: 'html',
  use: {
    screenshot: 'only-on-failure',
    baseURL: 'http://localhost:9000',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'yarn dev:test',
    url: 'http://127.0.0.1:9000',
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
