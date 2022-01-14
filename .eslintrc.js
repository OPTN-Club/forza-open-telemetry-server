module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    semi: ['error', 'always'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-underscore-dangle': ['error', { allow: ['_id'], allowAfterThis: true }],
    'no-use-before-define': 'off',
    'no-cond-assign': ['error', 'except-parens'],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
    }],
    'operator-linebreak': ['error', 'after', {
      overrides: {
        '?': 'before',
        ':': 'before',
      },
    }],
    'max-len': ['error', {
      code: 140,
      tabWidth: 2,
      ignoreComments: true,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,

    }],
    'no-param-reassign': ['error', { props: false }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'spaced-comment': [
      'error',
      'always',
      {
        exceptions: [
          '*',
          // comments in *.vtpw.ts temp files:
          '<template>',
          '<script lang="ts">',
          '</script>',
          '<style>',
        ],
      },
    ],
    'prefer-destructuring': 'off',

    // ** Typescript specific rules ** //
    // 'indent': 'off',
    // '@typescript-eslint/indent': ['error', 2],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
