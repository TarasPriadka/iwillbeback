const logger = require('../utils/logger');
const shortid = require('shortid')

sessions = {}
const start = async (req, res) => {
    const body = req.body
    logger.info(`Request body: ${body}`)
    const sessionid =  shortid.generate()
    sessions[sessionid] = {...body}
    res.send({"sessionid": `${sessionid}`})
    logger.info(sessions)
}

const verify = async (req, res) => {
    const body = req.body
    logger.info(`Request body: ${body}`)
    const sessionid = body.sessionid
    res.send({"valid": sessions[sessionid].trusteeName == body.trusteeName})
}

module.exports = { start, verify }
