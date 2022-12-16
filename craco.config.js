/*
 * @Author: shaolong
 * @Date: 2022-11-22 14:31:43
 * @LastEditors: shaolong
 * @LastEditTime: 2022-12-05 11:29:24
 * @Description:
 */
// 添加自定义webpack配置
const path = require("path");
module.exports = {
  webpack: {
    // 配置别名
    alias: {
      "@": path.resolve(__dirname, "src")
    },
    externals: {
      nprogress: "NProgress"
    },
    devServer: {
      proxy: {
        // "/api": {
        //   target: "http://localhost:3000",
        //   pathRewrite: { "^/api": "" }
        // }
      }
    }
  }
};
