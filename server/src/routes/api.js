const logger = require('../utils/logger');
const shortid = require('shortid')
const twilio = require('../utils/twilio')

let sessions = {};
const start = async (req, res) => {
    const body = req.body
    logger.info(`Request body: ${body}`);
    const sessionid =  shortid.generate();
    sessions[sessionid] = {...body};
    res.send({"sessionid": `${sessionid}`});
    logger.info(sessions);
    twilio.send_start_message(body.trusteePhone, body.name, body.message, body.when, `http://illbeback.tech/trustee/${sessionid}`);
}

const verify = async (req, res) => {
    const body = req.body
    logger.info(`Request body: ${body}`)
    const sessionid = body.sessionid
    res.send({"valid": sessions[sessionid].trusteeName == body.trusteeName})
}

module.exports = { start, verify }
