module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    setupFiles: ['dotenv/config'],
    setupFilesAfterEnv: ['./test/setup.ts'],
    modulePathIgnorePatterns: ['./dist/', './test/mocks.ts'],
    coveragePathIgnorePatterns: ['./test/mocks.ts'],
};
