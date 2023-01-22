const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function getContacts() {
  try {
    const contactsList = await fs.readFile(contactsPath);
    return JSON.parse(contactsList);
  } catch (error) {
    console.log(error);
  }
}
function setContacts(contacts) {
  const stringifiedContacts = JSON.stringify(contacts);
  fs.writeFile(contactsPath, stringifiedContacts);
}

async function listContacts() {
  try {
    const contacts = await getContacts();
    console.table(contacts);
  } catch (error) {
    // console.warn(`\x1B[31m ${error}`);
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contactList = await getContacts();
    const contact = contactList.find(({ id }) => id === contactId);
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
    const contactIndex = contactList.findIndex(({ id }) => id === contactId);
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

function addContact(name, email, phone) {
  // ...твій код
}

// listContacts();
// getContactById('3');
// removeContact('11');
