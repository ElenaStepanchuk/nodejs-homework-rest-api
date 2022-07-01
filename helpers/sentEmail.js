const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sentEmail = async (data) => {
  const email = { ...data, from: "podolyak365@gmail.com" };
  try {
    await sgMail.send(email);
    console.log("email send");
    return true;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
module.exports = sentEmail;
