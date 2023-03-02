import { Router } from "express";
import {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
} from "../../controllers/contactsControllers.js";
import { contactValidation } from "../../middlewares/validationMiddlewares.js";
import { asyncWrapper } from "../../helpers/apiHelpers.js";

const router = Router();

router.get("/", asyncWrapper(listContactsController));

router.get("/:contactId", asyncWrapper(getContactByIdController));

router.post("/", contactValidation, asyncWrapper(addContactController));

router.delete("/:contactId", asyncWrapper(removeContactController));

router.put(
  "/:contactId",
  contactValidation,
  asyncWrapper(updateContactController)
);

router.patch(
  "/:contactId/favorite",
  contactValidation,
  asyncWrapper(updateStatusContactController)
);

export default router;
