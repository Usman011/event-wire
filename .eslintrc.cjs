module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'jsx-quotes': [2, 'prefer-single'],
    'no-alert': 'error',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-duplicate-imports': 'off',
    'no-undef': 'off',
    'prefer-arrow-callback': 0,
    'prefer-const': 0,
    quotes: [0, 'double']
  }
}
