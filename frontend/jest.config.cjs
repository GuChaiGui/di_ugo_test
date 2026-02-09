module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.app.json"
      }
    ]
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/tests-e2e/"
  ],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy" 
  }
};
