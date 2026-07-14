import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts$': ['@swc/jest', {
      jsc: {
        parser: {
          syntax: 'typescript',
          decorators: true,
        },
        transform: {
          decoratorMetadata: true,
        },
      },
    }],
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@app/config$': '<rootDir>/libs/config/src',
    '^@app/config/(.*)$': '<rootDir>/libs/config/src/$1',
    '^@app/database$': '<rootDir>/libs/database/src',
    '^@app/database/(.*)$': '<rootDir>/libs/database/src/$1',
    '^@app/logger$': '<rootDir>/libs/logger/src',
    '^@app/logger/(.*)$': '<rootDir>/libs/logger/src/$1',
    '^@app/events$': '<rootDir>/libs/events/src',
    '^@app/events/(.*)$': '<rootDir>/libs/events/src/$1',
    '^@app/dto$': '<rootDir>/libs/dto/src',
    '^@app/dto/(.*)$': '<rootDir>/libs/dto/src/$1',
    '^@app/utils$': '<rootDir>/libs/utils/src',
    '^@app/utils/(.*)$': '<rootDir>/libs/utils/src/$1',
    '^@app/common$': '<rootDir>/libs/common/src',
    '^@app/common/(.*)$': '<rootDir>/libs/common/src/$1',
    '^@app/observability$': '<rootDir>/libs/observability/src',
    '^@app/observability/(.*)$': '<rootDir>/libs/observability/src/$1',
  },
};

export default config;
