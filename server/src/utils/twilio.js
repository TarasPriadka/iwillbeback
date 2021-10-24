// const {error} = require("server/src/utils/logger");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const TWLIO_PHONE = '+13253089534'

const client = require('twilio')(accountSid, authToken);

function send_message(to_phone, content) {
    client.messages
        .create({
            body: content,
            to: to_phone,
            from: TWLIO_PHONE,
        })
        .catch(m => console.error(m))
        .then((message) => console.log(message.sid))
}

function send_start_message(trustee_phone, walker_name, walker_action, walker_eta, url) {
    send_message(
        trustee_phone,
        `I'll Be Back Alert: ${walker_name} is going to ${walker_action} expecting to be back by ${walker_eta}: ${url}`
    )
}

function send_template_message(trustee_phone, walker_name, url) {
   send_message(
        trustee_phone,
        `I'll Be Back Alert: ${walker_name} may be in trouble. Please go to this link: ${url}`
    )
}

module.exports = {send_message, send_start_message, send_template_message}
