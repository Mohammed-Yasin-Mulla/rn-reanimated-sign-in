module.exports = {
  root: true,
  extends: ['universe/native'],
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'error',
    'import/order': 'off',
    endOfLine: 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: true,
      },
    ],
  },
};
