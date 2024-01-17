import { LaunchOptions } from '@playwright/test';
const browserOptions: LaunchOptions = {
  slowMo: process.env.CI ? 0 : 50,
  args: [
    '--use-fake-ui-for-media-stream',
    '--use-fake-device-for-media-stream',
  ],
  firefoxUserPrefs: {
    'media.navigator.streams.fake': true,
    'media.navigator.permission.disabled': true,
  },
  headless: process.env.CI ? true : false,
};

export const config = {
  browser: process.env.BROWSER || 'chromium',
  browserOptions,
  APP_URL: 'http://127.0.0.1:9000',
  API_URL: process.env.API_URL,
};
