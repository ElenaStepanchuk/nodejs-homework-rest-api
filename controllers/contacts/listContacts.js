const { Contact } = require("../../models");
const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite = false } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner: _id, favorite }, "", {
    skip,
    limit: Number(limit),
    favorite,
  }).populate("owner", "_id email");
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};
module.exports = listContacts;
