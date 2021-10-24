const express = require('express')
const { json, urlencoded } = require('body-parser')
require('express-async-errors')

const app = express()
const middleware = require('./utils/middleware')
const { start, verify } = require('./routes/api')

app.disable('x-powered-by')
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(middleware.requestLogger)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// app.use('/', api)
// app.use('/api', protect)
app.post('/api/start', start)
app.post('/api/verify', verify)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
