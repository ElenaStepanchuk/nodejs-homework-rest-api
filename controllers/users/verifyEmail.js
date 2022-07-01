const { User } = require("../../models");
const { NotFound } = require("http-errors");
const veryfyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw NotFound;
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  res.json({ status: "OK", code: 200, message: "Verify successful" });
};
module.exports = veryfyEmail;
