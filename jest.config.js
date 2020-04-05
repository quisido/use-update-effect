module.exports = {
  moduleNameMapper: {
    '\\.s?css$': '<rootDir>/test-utils/empty.ts',
  },
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
