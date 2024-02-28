module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        'prettier',
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
};
