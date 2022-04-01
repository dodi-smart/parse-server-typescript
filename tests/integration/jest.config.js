module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    globalTeardown: "<rootDir>/jest.teardown.ts",
};
