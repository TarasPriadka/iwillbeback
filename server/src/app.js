const express = require("express");
const path = require("path");
const { json, urlencoded } = require("body-parser");
const cors = require("cors");
require("express-async-errors");

const app = express();
const middleware = require("./utils/middleware");
const { start, verify, end, help, trustee } = require("./routes/api");

app.disable("x-powered-by");
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(middleware.requestLogger);

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });
// app.use('/', api)
// app.use('/api', protect)

app.use(express.static("build"));
app.post("/api/start", start);
app.post("/api/verify", verify);
app.post("/api/help", help);
app.post("/api/end", end);
app.post("/api/trustee", trustee);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
// app.get("/trustee/:id", (req, res) => {
//   res.redirect(`/?type=trustee&id=${req.params.id}`);
// });
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
