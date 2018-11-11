module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: ['plugin:vue/strongly-recommended'],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    'vue/max-attributes-per-line': 0,
    'vue/html-self-closing': 0
  },
  globals: {}
};
