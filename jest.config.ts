import type { Config } from 'jest';

export default async (): Promise<Config> => {
  return {
    moduleNameMapper: {
      '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    },
    roots: ['<rootDir>/src'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };
};
