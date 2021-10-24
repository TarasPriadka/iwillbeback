const http = require("http");
const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");

const server = http.createServer(app);
const io = require("socket.io")(server);

const sessions = require("./sessions");

io.on("connection", (socket) => {
  logger.info("Sockets: a user connected");
  socket.on("disconnect", () => {
    console.log("Sockets: user disconnected");
  });

  socket.on("location", (msg) => {
    logger.info("location: " + msg);
    socket.emit("location", "New location: " + msg);
  });

  socket.on("update location", (msg) => {
    try {
      logger.info(`update location`);
      console.log(msg);
      const sessionid = msg.sessionid;
      console.log(sessionid);
      sessions[sessionid].loc.lat = msg.newLat;
      sessions[sessionid].loc.lng = msg.newLng;
    } catch (e) {
      console.error("BAD REQUEST ON SOCKET: ", e, msg)
    }
  });

  socket.on("remove", (msg) => {
    const sessionid = msg["sessionid"];
    console.log(`removing ${sessionid}`);
    delete sessions[sessionid];
  });
});

const port = config.PORT || 8080;
server.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
