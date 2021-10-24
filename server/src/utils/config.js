require("dotenv").config();

const { PORT, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;

module.exports = {
  PORT,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
};
