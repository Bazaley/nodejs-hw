import { Contact } from "../db/contactModel.js";
import { ParametersError, ValidationError } from "../helpers/errors.js";

export const listContacts = async () => {
  return await Contact.find();
};

export const getContactById = async (id) => {
  const contact = await Contact.findById(id);

  if (!contact) {
    throw new ValidationError("Not found");
  }

  return contact;
};

export const addContact = async (contact) => {
  return await Contact.create({ ...contact });
};

export const removeContact = async (id) => {
  await Contact.findByIdAndDelete(id);
};

export const updateContact = async (id, contact) => {
  await Contact.findByIdAndUpdate(id, contact);

  return await getContactById(id);
};

export const updateStatusContact = async (id, favorite) => {
  if (favorite === undefined) {
    throw new ParametersError("missing field favorite");
  }
  await Contact.findByIdAndUpdate(id, { $set: { favorite } });

  return await getContactById(id);
};
