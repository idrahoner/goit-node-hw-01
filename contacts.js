const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
  try {
    const contactList = await fs.readFile(contactsPath);
    const contacts = JSON.parse(contactList);
    console.table(contacts);
  } catch (error) {
    // console.warn(`\x1B[31m ${error}`);
    console.log(error);
  }
}

function getContactById(contactId) {
  // ...твій код
}

function removeContact(contactId) {
  // ...твій код
}

function addContact(name, email, phone) {
  // ...твій код
}

listContacts();
