import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  // Use the ts-jest preset for ESM
  preset: 'ts-jest/presets/default-esm',
  // Treat .ts files as ESM
  extensionsToTreatAsEsm: ['.ts'],
  // Specify the test environment
  testEnvironment: 'node',
  // Configure ts-jest transformation for .ts files
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true, // Enable ESM support in ts-jest
      },
    ],
  },
  // Map module names for ESM imports (e.g., handling .js extensions in imports)
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  // Optional: Specify test file patterns
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  // Optional: Ignore specific paths
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  // Optional: Increase timeout for async tests
  testTimeout: 30000,
};

export default config;
