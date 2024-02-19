module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh',
    '@typescript-eslint',
    '@stylistic/js'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-unused-vars': 'warn',
    "@typescript-eslint/no-unused-vars": ["warn"],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'indent': ['error', 4],
    'no-multi-spaces': ['error'],
    '@stylistic/js/object-curly-spacing': ["error", "always", { "objectsInObjects": false }],
    '@stylistic/js/object-curly-spacing': ["error", "always", { "arraysInObjects": false }],
    '@stylistic/js/array-bracket-spacing': ["error", "always"]
  },
}

