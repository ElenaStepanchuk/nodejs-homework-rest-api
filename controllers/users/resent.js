const { User } = require("../../models");
const { NotFound, BadRequest } = require("http-errors");
const { sentEmail } = require("../../helpers");
const resent = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw BadRequest({ message: "missing required field email" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw NotFound;
  }
  if (user.verify) {
    throw BadRequest(400, "Verification has already been passed");
  }
  const verificationToken = user.verificationToken;
  const mail = {
    to: email,
    subject: "resent email confirmation",
    html: `<p>Please click on this link for confirmation your email</p><a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">
    confirm email
  </a>`,
  };
  await sentEmail(mail);
  res.json({
    message: "Verification email sent",
  });
};
module.exports = resent;
