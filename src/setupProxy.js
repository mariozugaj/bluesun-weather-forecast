const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/darkskyproxy", {
      target: "https://api.darksky.net/forecast",
      pathRewrite: {
        "^/darkskyproxy": "",
      },
      changeOrigin: true,
    })
  );
};