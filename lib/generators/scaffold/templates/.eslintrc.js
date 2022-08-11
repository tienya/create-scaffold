module.exports = {
  extends: ['airbnb-base'],
  rules: {
    'global-require': 'off',
    'import/extensions': 'off',
    'class-methods-use-this': 'off',
    'import/no-dynamic-require': 'off',
    'no-promise-executor-return': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': ['error', { args: 'none' }],
  },
};
