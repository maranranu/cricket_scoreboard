module.exports = {
    root: true,
    extends: 'standard',
    parserOptions: {
      ecmaVersion: 9
    },
    'rules': {
      "comma-spacing": ["error", { "before": false, "after": true }],
      "indent": ["error", 2],
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
      'standard/no-callback-literal': 0
    }

  }
