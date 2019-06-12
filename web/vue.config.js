const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  // publicPath: "/my/",
  lintOnSave: true,

  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("utils", resolve("src/utils"))
      .set("api", resolve("src/api"))
      .set("static", resolve("src/static"));
  },

  // devServer: {
  //   disableHostCheck: true,
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:8888",
  //       changeOrigin: true,
  //       ws: true,
  //       pathRewrite: {
  //         "^/api": ""
  //       }
  //     }
  //   }
  // }
  productionSourceMap: false,

  publicPath: '/flow/'
};
