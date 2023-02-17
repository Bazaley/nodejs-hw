import { readFile, writeFile } from "fs/promises";
import { nanoid } from "nanoid";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const getContacts = async () => {
  return JSON.parse(
    await readFile(join(__dirname, "../models/contacts.json"), "utf-8")
  );
};

const writeContacts = async (contacts) => {
  await writeFile(
    join(__dirname, "../models/contacts.json"),
    JSON.stringify(contacts)
  );
};

export const listContacts = async (req, res) => {
  try {
    const contacts = await getContacts();

    res.json({ contacts });
  } catch (error) {
    console.log(error);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const contacts = await getContacts();

    const contact = contacts.find(({ id }) => id === req.params.contactId);

    if (!contact) {
      throw new Error();
    }

    res.json({ contact });
  } catch {
    res.status(404).json({ message: "Not found" });
  }
};

export const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;

  try {
    const contacts = await getContacts();
    const contact = { id: nanoid(), name, email, phone };
    contacts.push(contact);

    await writeContacts(contacts);

    res.status(201).json({ contact });
  } catch (error) {
    console.log(error);
  }
};

export const removeContact = async (req, res, next) => {
  try {
    let contacts = await getContacts();

    const contactId = contacts.some(({ id }) => id === req.params.contactId);

    if (!contactId) {
      throw new Error();
    }

    contacts = contacts.filter(({ id }) => id !== req.params.contactId);

    await writeContacts(contacts);

    res.json({ message: "contact deleted" });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

export const updateContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const data = await getContacts();

    const contacts = data.map((contact) => {
      if (contact.id === req.params.contactId) {
        return {
          id: contact.id,
          name,
          email,
          phone,
        };
      }
      return contact;
    });

    const contact = contacts.find(({ id }) => id === req.params.contactId);

    await writeContacts(contacts);

    res.json({ contact });
  } catch (error) {
    console.log(error);
  }
};
