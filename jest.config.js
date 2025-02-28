module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|ts|tsx)$': [
      'babel-jest',
      {
        presets: ['module:metro-react-native-babel-preset'],
        plugins: ['@babel/plugin-transform-flow-strip-types']
      }
    ]
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|webp|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
    'react-native-auth0': '<rootDir>/__mocks__/react-native-auth0.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-calendars)/)',
  ],
  setupFiles: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'node', 
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};