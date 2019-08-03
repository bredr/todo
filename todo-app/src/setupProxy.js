const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/todo.Todo/", { target: "http://localhost:8080/" }));
};
