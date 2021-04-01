const { resolve } = require('path');
const root = resolve(__dirname, '..');
const rootConfig = require(`${root}/jest.config.js`);

module.exports = {...rootConfig, ...{ //Sobrescrevendo o teste global
  rootDir: root,
  displayName: "end2end-tests", //Label para este teste
  setupFilesAfterEnv: ["<rootDir>/test/jest-setup.ts"],
  testMatch: ["<rootDir>/test/**/*.test.ts"], //Esta configuração so se aplica a testes neste diretorio
}}