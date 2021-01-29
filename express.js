"use strict";

const firebase = require("firebase");
const express = require("express");
const http = require("http");
const fastbootMiddleware = require("fastboot-express-middleware");
const proxy = require("express-http-proxy");
const socketIO = require("socket.io");

const firebaseConfig = {
  apiKey: "AIzaSyAjg_BAAO06ESyCh0hL2gJJt0A_dUJ1-KY",
  authDomain: "roro-360c7.firebaseapp.com",
  databaseURL: "https://roro-360c7.firebaseio.com",
  projectId: "roro-360c7",
  storageBucket: "roro-360c7.appspot.com",
  messagingSenderId: "351374170794",
  appId: "1:351374170794:web:68a1640dc7dfc2afc1ced3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const port = process.env.PORT || 9999;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

function getID() {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }

  if (month < 10) {
    month = "0" + month;
  }

  return `${year}-${month}-${dt}`;
}

let lastMessage = null;

function initiateRefToday() {
  const key = `date/${getID()}`;
  const ref = database.ref(key);
  console.log(`Key is ${key}`);
  ref.on("child_added", function(data) {
    console.log("Emitting new packet");
    lastMessage = data.val();
    io.emit("temperature", data.val());
  });
}

io.on("connection", socket => {
  console.log("New connection");
  socket.emit("temperature", lastMessage);
});

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

app.use(
  "/pasta-proxy",
  proxy("69.181.106.112:4321", {
    proxyReqPathResolver: function(req) {
      const parts = req.url.split("?");
      return parts[0];
    }
  })
);

server.listen(port, () => {
  initiateRefToday();
  console.log(`Example app listening at http://localhost:${port}`);
});
