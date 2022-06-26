const { Conflict } = require("http-errors");
const { v4 } = require("uuid");
const { User } = require("../../models");
const { sentEmail } = require("../../helpers");
const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const verificationToken = v4();
  const newUser = new User({ email, verificationToken });
  newUser.setPassword(password);
  await newUser.save();
  const mail = {
    to: email,
    subject: "email confirmation",
    html: `<p>Please click on this link for confirmation your email</p><a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">
        confirm email
      </a>`,
  };
  await sentEmail(mail);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
        verificationToken,
      },
    },
  });
};
module.exports = signup;
