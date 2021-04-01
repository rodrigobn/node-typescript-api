const { resolve } = require('path');
const root = resolve(__dirname);
module.exports = {
  rootDir: root,
  displayName: 'root-tests', //Label para identificar os tipos de teste
  testMatch: ['<rootDir>/src/**/*.test.ts'], //so vai dar match nos testes que estão na pasta src
  testEnvironment: 'node',
  clearMocks: true,
  preset: 'ts-jest',
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@test/(.*)': '<rootDir>/test/$1',
  }, //permite usar alias nos testes jest
};