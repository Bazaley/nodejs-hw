import { Router } from "express";
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} from "../../controllers/contactsControllers.js";
import { contactValidation } from "../../middlewares/validationMiddlewares.js";
const router = Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", contactValidation, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", contactValidation, updateContact);

export default router;
