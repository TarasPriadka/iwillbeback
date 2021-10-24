// const {error} = require("server/src/utils/logger");
const config = require("./config");
const accountSid = config.TWILIO_ACCOUNT_SID;
const authToken = config.TWILIO_AUTH_TOKEN;

const TWLIO_PHONE = "+13253089534";

const client = require("twilio")(accountSid, authToken);

function send_message(to_phone, content) {
  client.messages
    .create({
      body: content,
      to: to_phone,
      from: TWLIO_PHONE,
    })
    .catch((m) => console.error(m))
    .then((message) => console.log(message.sid));
}

function send_start_message(
  trustee_phone,
  walker_name,
  walker_action,
  walker_eta,
  url
) {
  send_message(
    trustee_phone,
    `I'll Be Back: ${walker_name} is going out for about ${walker_eta} minutes: "${walker_action}". See more here: ${url}`
  );
}

function send_help_message(trustee_phone, walker_name, url) {
  send_message(
    trustee_phone,
    `I'll Be Back ALERT: ${walker_name} raised an alert. Go to: ${url}`
  );
}

function send_end_message(trustee_phone, walker_name) {
  send_message(
    trustee_phone,
    `I'll Be Back Alert: ${walker_name} may be in trouble.`
  );
}

module.exports = {
  send_message,
  send_start_message,
  send_help_message,
  send_end_message,
};
