/** @type {import('jest').Config} */
module.exports = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { isolatedModules: true }],
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^~/(.*)": "<rootDir>/src/$1",
  },
};
