module.exports = {
  files: ["*.json"], // Apply this rule only to JSON files
  rules: {
    "i18n-no-missing-keys": require("./src/rules/i18n-no-missing-keys.js"),
  },
};
