const tseslint = require('typescript-eslint');
const noAutofix = require('eslint-plugin-no-autofix');
const chaiFriendly = require('eslint-plugin-chai-friendly');

module.exports = tseslint.config(
  {
    ignores: [
      'src/finitio/parser/parser.js',
      'src/finitio/parser.js',
      'specs/integration/fixtures-jsed.js',
    ],
  },
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      'no-autofix': noAutofix,
      'chai-friendly': chaiFriendly,
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/consistent-type-exports': 'error',
      'no-multi-spaces': 'error',
      'space-in-parens': ['error', 'never'],
      'space-before-function-paren': ['error', {
        'anonymous': 'never',
        'named': 'never',
        'asyncArrow': 'always'
      }],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'quotes': ['error', 'single'],
      'eqeqeq': 0,
      'no-autofix/eqeqeq': 1,
      // Todo only enable chai plugin in enspirit's eslint-node
      // plugin according to file path
      'chai-friendly/no-unused-expressions': 0,
      'no-autofix/no-multi-spaces': [
        1,
        {
          exceptions: {
            'Property': true,
            'VariableDeclarator': true,
            'ImportDeclaration': true,
          },
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          'argsIgnorePattern': '^_',
          'varsIgnorePattern': '^_',
          'caughtErrorsIgnorePattern': '^_',
        },
      ],
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
    },
  },
);
