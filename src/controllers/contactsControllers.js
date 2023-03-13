import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} from "../services/contactsServices.js";
import jwt from "jsonwebtoken";

export const listContactsController = async (req, res) => {
  const { id } = jwt.decode(req.headers.authorization.slice(7));
  const contacts = await listContacts(
    req.query.page,
    req.query.limit,
    req.query.favorite,
    id
  );

  res.json({ contacts });
};

export const getContactByIdController = async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);

  res.json({ contact });
};

export const addContactController = async (req, res, next) => {
  const { id } = jwt.decode(req.headers.authorization.slice(7));
  const contact = await addContact(req.body, id);

  res.json({ message: "contact added", contact });
};

export const removeContactController = async (req, res, next) => {
  await removeContact(req.params.contactId);

  res.json({ message: "contact deleted" });
};

export const updateContactController = async (req, res, next) => {
  const contact = await updateContact(req.params.contactId, req.body);

  res.json({ message: "contact updated", contact });
};

export const updateStatusContactController = async (req, res, next) => {
  const contact = await updateStatusContact(
    req.params.contactId,
    req.body.favorite
  );

  res.json({ contact });
};
