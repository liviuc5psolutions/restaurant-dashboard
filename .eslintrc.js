module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'react/jsx-curly-brace-presence': [1, 'never']
  }
};
