module.exports = {
  moduleNameMapper: {
    '\\.s?css$': 'identity-obj-proxy'
  },
  transform: {
    '.(ts|js)': `${__dirname}/node_modules/ts-jest/preprocessor.js`
  },
  modulePathIgnorePatterns: ['dist/'],
  transformIgnorePatterns: [],
  testMatch: ['**/src/**/*.spec.(ts|js)'],
  moduleFileExtensions: ['ts', 'js'],
  globals:{
    'ts-jest':{
      tsConfigFile: `${__dirname}/tsconfig.json`,
      useBabelrc: false
    }
  },
  collectCoverageFrom: ['src/**/*.(ts|js)'],
  coverageThreshold: {
    global: {
      braches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  }
}
