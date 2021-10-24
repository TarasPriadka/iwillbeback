const https = require("https");
const fs = require("fs");

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};


const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");

const server = https.createServer(options, app);
const io = require("socket.io")(server);

const sessions = require("./sessions");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

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
    logger.info(`update location`);
    console.log(msg);
    const sessionid = msg.sessionid;
    sessions[sessionid].loc.lat = msg.newLat;
    sessions[sessionid].loc.lng = msg.newLng;
  });
});

const port = config.PORT || 8080;
server.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});

