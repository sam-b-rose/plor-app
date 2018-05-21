module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-property-sort-order-smacss'
  ],
  plugsin: ['stylelint-scss'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['extends', 'ignores', 'include']
      }
    ],
    'function-name-case': [
      'lower',
      {
        ignoreFunctions: ['/([a-z][A-Z0-9]+)+/']
      }
    ],
    'number-leading-zero': null
  }
};
