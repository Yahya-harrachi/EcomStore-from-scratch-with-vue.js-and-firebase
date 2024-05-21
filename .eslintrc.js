module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended", // Add Prettier plugin to extends
  ],
  parserOptions: {
    parser: "babel-eslint",
    requireConfigFile: false, // Disable config file checking for Babel
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
  overrides: [
    {
      files: ["*.js", "*.vue"],
      rules: {
        "prettier/prettier": ["error", { endOfLine: "auto" }],
      },
    },
  ],
};
