module.exports = {
  'extends': '@enspirit/eslint-config-node',
  'rules': {
    'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
  },
  'overrides': [
    {
      'files': ['tests/**/*.spec.js'], // Or *.test.js
      'rules': {
        'no-unused-expressions': 'off',
      },
    },
  ],
};
