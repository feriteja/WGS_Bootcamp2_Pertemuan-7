const fs = require("fs");

const checkContactFile = () => {
  const dirPath = "./data";
  const isFolderExist = fs.existsSync(dirPath);
  if (!isFolderExist) {
    console.log("Creating folder 'data'");
    fs.mkdirSync(dirPath);
  }

  const dataPath = "./data/Contact.json";
  if (!fs.existsSync(dataPath)) {
    console.log("Creating file 'Contact'");
    fs.writeFileSync(dataPath, "[]", "utf-8");
  }
};

const validatingContact = (contact) => {
  const file = fs.readFileSync("data/Contact.json", "utf8");
  const contacts = JSON.parse(file);
  const isNameDuplicate = contacts.some((cons) => cons.name === contact.name);
  const isEmailValid = validator.isEmail(contact.email);
  const isNumber = validator.isMobilePhone(contact.mobile, "id-ID");
  if (isNameDuplicate) {
    console.warn("Name is Duplicated, Please enter something else");
    return false;
  }
  if (!isEmailValid) {
    console.warn("Email is not valid");
    return false;
  }
  if (!isNumber) {
    console.warn("Number is not valid");
    return false;
  }
  return true;
};

const loadContact = () => {
  const file = fs.readFileSync("data/contact.json", "utf8");
  const contacts = JSON.parse(file);
  return contacts;
};

const saveContactFile = (contact) => {
  checkContactFile();

  const contacts = loadContact();

  const isContactValid = validatingContact(contact);
  if (!isContactValid) {
    return console.warn("Sorry the data is already exist/not valid");
  }

  contacts.push(contact);
  fs.writeFileSync("data/Contact.json", JSON.stringify(contacts));

  console.log("Thank you, Name already saved :)");
};

const listContact = () => {
  const contacts = loadContact();
  console.log("Contact list: ");
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}, ${contact.name}-${contact.mobile}`);
  });
};

const showDetailContact = (name) => {
  const contacts = loadContact();

  const contact = contacts.find((contact) => contact.name === name);
  console.log(
    `name: ${contact.name}, mobile: ${contact.mobile}, email: ${contact.email}`
  );

  return contact;
};

const deleteContact = (name) => {
  const contacts = loadContact();

  const newContact = contacts.filter((contact) => contact.name !== name);

  fs.writeFileSync("data/Contact.json", JSON.stringify(newContact));

  console.log("Contact has been deleted");
};

module.exports = {
  checkContactFile,
  saveContactFile,
  listContact,
  showDetailContact,
  deleteContact,
};
