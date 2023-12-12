// En el archivo src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/socket.io",
    createProxyMiddleware({
      target: "http://localhost:3001",
      ws: true,
    })
  );
};
