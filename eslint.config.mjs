import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import jestPlugin from 'eslint-plugin-jest';

const files = ['{src}/**/*.{ts}'];
const ignores = [
  'coverage/**',
  'dist/**',
  'node_modules/**',
  'eslint.config.mjs',
  'jest.config.ts',
];

export default defineConfig([
  // JavaScript configuration
  eslint.configs.recommended,

  // TypeScript configuration
  tseslint.configs.recommended,

  // Prettier configuration
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,

  // Node.js global variables
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node,
      parserOptions: {
        projectService: true,
        allowDefaultProject: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Jest plugin
  {
    languageOptions: { globals: { ...globals.jest } },
    plugins: { jest: jestPlugin },
    rules: {
      ...jestPlugin.configs.recommended.rules,
      'jest/valid-title': 'error',
    },
  },

  { files },
  { ignores },
]);
