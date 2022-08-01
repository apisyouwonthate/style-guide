
module.exports = async () => {
  return {
    preset: 'ts-jest',
    testPathIgnorePatterns: ['__helpers__'],
    testEnvironment: 'node',
    globals: {
      'ts-jest': {
        useIsolatedModules: true,
      },
    },
  };
};
