const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const avatarsDir = path.join(__dirname, "../../", "avatars");
const updateAvatar = async (req, res) => {
  console.log("dir", avatarsDir);
  const { path: tempUpload, originalname } = req.file;
  console.log("req.file", req.file);
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;
  try {
    const resultUpdate = path.join(avatarsDir, imageName);
    await fs.rename(tempUpload, resultUpdate);
    console.log("temp", tempUpload);
    const avatarURL = path("public", "avatars", originalname);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};
module.exports = updateAvatar;
