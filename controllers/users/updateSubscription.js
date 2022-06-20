const { NotFound } = require("http-errors");
const { User } = require("../../models");
const updateSubscription = async (req, res) => {
  const { _id } = req.params;
  const { subscription } = req.body;
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  if (!result || !_id === User._id) {
    throw new NotFound(`User with id=${_id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};
module.exports = updateSubscription;
