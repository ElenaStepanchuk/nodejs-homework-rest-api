const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema, favoriteContactSchema } = require("../../models/contact");
const validateMiddleware = validation(joiSchema);
const validateMiddlewareFavorite = validation(favoriteContactSchema);
router.get("/", auth, ctrlWrapper(ctrl.listContacts));
router.get("/:contactId", ctrlWrapper(ctrl.getContactById));
router.post("/", auth, validateMiddleware, ctrlWrapper(ctrl.addContact));
router.delete("/:contactId", ctrlWrapper(ctrl.deleteContact));
router.put("/:contactId", validateMiddleware, ctrlWrapper(ctrl.updateContact));
router.patch(
  "/:contactId/favorite",
  validateMiddlewareFavorite,
  ctrlWrapper(ctrl.updateStatusContact)
);
module.exports = router;
