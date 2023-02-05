/* eslint-env node */

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
  ],
  plugins: ['eslint-plugin-import-helpers'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-return-assign': [
      'error',
      'always'
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-multiple-template-root': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-throw-literal': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': 'off',
    'require-jsdoc': 'off',
    'arrow-spacing': 'warn',
    'max-len': ['error', {
      code: 120,
    }],
    'import-helpers/order-imports': [
      'error',
      {
        newlinesBetween: 'always',
        groups: [
          'module',
          '/store/',
          '/modules/',
          '/type/',
          '/components/',
          ['/UI/', '/components_styled/'],
          '/shared/',
          ['parent', 'sibling'],
          'index',
        ],
        alphabetize: { order: 'asc', ignoreCase: false },
      },
    ],
  },
};
