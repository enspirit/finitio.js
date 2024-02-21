module.exports = {
  "ignorePatterns": ["src/finitio/parser/parser.js"],
  plugins: [
    'no-autofix',
    'chai-friendly',
    '@typescript-eslint',
  ],
  extends: ['plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/type-annotation-spacing': ['error', {
      before: false,
      after: true,
      'overrides': {
        'colon': { 'before': false, 'after': true },
        'arrow': { 'before': true, 'after': true }
      }
    }],
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
    // '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
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
      'error', // or "error"
      {
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_',
        'caughtErrorsIgnorePattern': '^_',
      },
    ],
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
  },
};
