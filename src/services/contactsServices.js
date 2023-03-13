import { Contact } from "../db/contactModel.js";
import { ParametersError, ValidationError } from "../helpers/errors.js";

export const listContacts = async (page, limit, favorite, id) => {
  if (favorite) {
    return await Contact.find({ favorite }).skip(page).limit(limit);
  }

  return await Contact.find({ owner: id }).skip(page).limit(limit);
};
export const getContactById = async (id) => {
  const contact = await Contact.findById(id);

  if (!contact) {
    throw new ValidationError("Not found");
  }

  return contact;
};

export const addContact = async (contact, id) => {
  return await Contact.create({ ...contact, owner: id });
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
