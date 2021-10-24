const http = require('http');
const app = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');

const server = http.createServer(app);
const io = require("socket.io")(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    logger.info('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('location', (msg) => {
        logger.info('location: ' + msg);
        socket.emit('location', 'New location: ' + msg)
    });
});

const port = config.PORT || 8080;
server.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});
