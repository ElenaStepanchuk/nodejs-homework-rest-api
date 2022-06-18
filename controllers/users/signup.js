const { Conflict } = require("http-errors");
// const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict({ code: 409, message: "Email in use" });
  }
  //   const hasPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  //   const result = await User.create({ email, password: hasPassword });
  const newUser = new User({ email });
  newUser.setPassword(password);
  newUser.save();
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
      },
    },
  });
};
module.exports = signup;
