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
        .then((message) => console.log(message.sid));
}

function send_template_message(trustee_phone, walker_name, url) {
    if (walker_name.length > 16) {
        walker_name = walker_name.slice(0,13) + '...'
    }
    client.messages
        .create({
            body: `I'll Be Back Alert: ${walker_name} may be in trouble and they chose to trust you. Please go to this link: ${url}`,
            to: trustee_phone,
            from: TWLIO_PHONE,
        })
        .then((message) => console.log(message.sid));
}
