const { defineConfig } = require('eslint/config');

const tsParser = require('@typescript-eslint/parser');

const { fixupConfigRules, fixupPluginRules } = require('@eslint/compat');

const tanstackQuery = require('@tanstack/eslint-plugin-query');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = defineConfig([
  {
    ignores: ['.next/'],
  },
  js.configs.recommended,
  {
    languageOptions: {
      parser: tsParser,
    },
    extends: fixupConfigRules(
      compat.extends(
        'next/core-web-vitals',
        'prettier',
        'turbo',
        'plugin:@tanstack/eslint-plugin-query/recommended',
        'plugin:import/recommended',
        'plugin:@typescript-eslint/recommended'
      )
    ),

    rules: {
      'prefer-const': 'error',
      'newline-before-return': 'error',
      'import/newline-after-import': 'error',
      'import/export': 'off',
      'import/named': 'off',
      'no-useless-escape': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],

          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@shared/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: 'react',
              group: 'external',
            },
          ],

          pathGroupsExcludedImportTypes: ['builtin', 'react'],
          'newlines-between': 'always',

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
    plugins: {
      '@tanstack/query': fixupPluginRules(tanstackQuery),
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
    },

    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: 'apps/*/tsconfig.json',
        },
      },
    },
  },
  {
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]);
