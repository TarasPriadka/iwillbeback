const logger = require('../utils/logger');
const shortid = require('shortid')
const twilio = require("../utils/twilio");
const sessions = require('../sessions')

const start = async (req, res) => {
    const body = req.body
    logger.info(`Request body: ${body}`);
    const sessionid =  shortid.generate();
    sessions[sessionid] = {...body};
    sessions[sessionid].url = `http://illbeback.tech/trustee/${sessionid}`
    res.send({"sessionid": `${sessionid}`});
    logger.info(sessions);
    twilio.send_start_message(body.trusteePhone, body.name, body.message, body.when, sessions[sessionid].url);
}

const verify = async (req, res) => {
    const body = req.body
    logger.info(`Request body: ${body}`)
    const sessionid = body.sessionid
    res.send({"valid": sessions[sessionid].trusteeName == body.trusteeName})
}

const help = async (req, res) => {
    const body = req.body
    logger.info(`Request body: ${body}`)
    const sessionid = body.sessionid
    if (sessions[sessionid]) {
        const sessioninfo = sessions[sessionid]
        logger.info(`Found session: ${sessioninfo}`);
        res.send({'status': 'ok'})
        twilio.send_help_message(sessioninfo.trusteePhone, sessioninfo.name, sessioninfo.url)
    } else {
        logger.info(`Session not found: ${sessionid}`);
        res.send({'status': 'error', 'message': 'session not found'})
    }
}

const end = async (req, res) => {
    const body = req.body
    logger.info(`Request body: ${body}`)
    const sessionid = body.sessionid
    if (sessions[sessionid]) {
        const sessioninfo = sessions[sessionid]
        logger.info(`Found session: ${sessioninfo}`);
        res.send({'status': 'ok'})
        twilio.send_end_message(sessioninfo.trusteePhone, sessioninfo.name)
    } else {
        logger.info(`Session not found: ${sessionid}`);
        res.send({'status': 'error', 'message': 'session not found'})
    }
}

module.exports = { start, verify, help, end }
