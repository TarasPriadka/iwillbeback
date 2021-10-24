const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'Hello from Node',
        to: '+14089312317', // Text this number
        from: '+13253089534', // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));