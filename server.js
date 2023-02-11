const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");
const socketIO = require("socket.io");

const normalizePort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
const socketIOServer = socketIO(server);

server.listen(port, () => console.log(`Listening on port ${port}`));
server.on("error", onError);

socketIOServer.sockets.on("connection", function (socket) {
  console.log("Client connected");

  socket.on("createPost", (post) => {
    socketIOServer.emit("createPost", post);
    console.log("Create post socket emitted");
  });

  socket.on("deletePost", (post) => {
    socketIOServer.emit("deletePost", post);
    console.log("Delete post socket emitted");
  });
});
