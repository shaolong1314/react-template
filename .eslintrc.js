/*
 * @Author: shaolong
 * @Date: 2022-11-22 14:45:39
 * @LastEditors: shaolong
 * @LastEditTime: 2022-12-16 13:59:24
 * @Description:
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ["plugin:react/recommended", "standard", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": "error",
    eqeqeq: "off",
    "no-undef": "off",
    "no-async-promise-executor": "off",
    "prefer-promise-reject-errors": "off",
    "react/prop-types": "off",
    camelcase: "off",
    "no-constant-condition": "off",
    "no-self-compare": "off",
    "no-unused-vars": "off",
    "no-debugger": "off"
  }
};
