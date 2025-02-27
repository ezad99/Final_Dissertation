export default {
    moduleNameMapper: {
      '\\.css$': 'identity-obj-proxy',
    },
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest', // For TypeScript files
      '^.+\\.js$': 'babel-jest',     // Transform JS files with babel-jest
    },
    transformIgnorePatterns: [
      '/node_modules/(?!react-markdown|devlop)/', // Add modules you want to transform
    ],
    testEnvironment: 'jsdom', // or 'node' depending on your needs
  };
  