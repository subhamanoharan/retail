
module.exports = {
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    testPathIgnorePatterns: ["/lib/", "/node_modules/", "/retail-frontend/"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
