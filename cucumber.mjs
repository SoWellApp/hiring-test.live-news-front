const config = {
  paths: ['tests/**/*.feature'],
  requireModule: ['ts-node/register'],
  require: ['tests/**/*.ts'],
  format: [
    'json:reports/cucumber-report.json',
    'html:reports/report.html',
    'summary',
    'progress-bar',
  ],
  formatOptions: { snippetInterface: 'async-await' },
  failFast: true,
};

config.format.push('@cucumber/pretty-formatter');
export default config;
