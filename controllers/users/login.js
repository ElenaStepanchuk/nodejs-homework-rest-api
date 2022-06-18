const { User } = require("../../models");
// const bcrypt = require("bcryptjs");
const { Unauthorized } = require("http-errors");
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  //   if (!user) {
  //     throw new Unauthorized({
  //       code: 401,
  //       message: "Email or password is wrong",
  //     });
  //   }
  //   const passCompare = bcrypt.compareSync(password, user.password);
  //   if (!passCompare) {
  //     throw new Unauthorized({
  //       code: 401,
  //       message: "Email or password is wrong",
  //     });
  //   }
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized({
      code: 401,
      message: "Email or password is wrong",
    });
  }
};
module.exports = login;
