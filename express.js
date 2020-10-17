"use strict";

const express = require("express");
const fastbootMiddleware = require("fastboot-express-middleware");
const proxy = require("express-http-proxy");

const port = process.env.PORT || 9999;
const app = express();

app.get("/*", fastbootMiddleware("./dist"));
app.use(express.static("./dist"));

app.use(
  "/proxy",
  proxy("13.78.137.142:4321", {
    proxyReqPathResolver: function(req) {
      const parts = req.url.split("?");
      return parts[0];
    }
  })
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
