module.exports = {
  modulePaths: ['<rootDir>/'],
  moduleNameMapper: {
    '^vue$': '<rootDir>/node_modules/vue/dist/vue.js'
  },
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.*\\.(vue)$': 'vue-jest',
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
  setupFilesAfterEnv: ['<rootDir>/test/unit/setup.js'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/src/**/*.{js,vue,jsx}',
    '!**/stories/**',
    '!**/test/**',
    '!**/node_modules/**'
  ],
  coverageDirectory: 'coverage'
};
