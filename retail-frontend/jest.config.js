
module.exports = {
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?)$",
    testPathIgnorePatterns: ["/lib/", "/node_modules/"],
    moduleFileExtensions: ["js", "jsx", "json", "node"],
    setupTestFrameworkScriptFile: "<rootDir>/jestSetup.js"
};
