const fs = require('fs').promises;
const shortid = require('shortid');
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function getContacts() {
  const contactsList = await fs.readFile(contactsPath);
  return JSON.parse(contactsList);
}

function setContacts(contacts) {
  const stringifiedContacts = JSON.stringify(contacts, null, '\t');
  fs.writeFile(contactsPath, stringifiedContacts);
}

async function listContacts() {
  try {
    const contacts = await getContacts();
    console.table(contacts);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contactList = await getContacts();
    const contact = contactList.find(({ id }) => id === contactId.toString());
    if (!contact) {
      throw new Error('The requested contact does not exist!');
    }
    console.log(contact);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contactList = await getContacts();
    const contactIndex = contactList.findIndex(
      ({ id }) => id === contactId.toString()
    );
    if (contactIndex === -1) {
      throw new Error('The requested contact does not exist!');
    }
    contactList.splice(contactIndex, 1);
    setContacts(contactList);
    console.log('The contact was removed successfully!');
  } catch (error) {
    console.log(error);
  }
}

const normalizeString = (...args) =>
  args.map(element => element.toString().trim());

async function addContact(inputName = '', inputEmail = '', inputPhone = '') {
  try {
    const [name, email, phone] = normalizeString(
      inputName,
      inputEmail,
      inputPhone
    );
    if (!name || !email || !phone) {
      throw new Error('All fields are required!');
    }
    const contactsList = await getContacts();
    const newContacts = {
      id: shortid.generate(),
      name,
      email,
      phone,
    };
    setContacts([...contactsList, newContacts]);
    console.log('The contact was added successfully!');
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
