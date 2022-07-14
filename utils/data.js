
const fs = require('fs')

if (!fs.existsSync('./data')) {
    fs.mkdirSync('data')
}
if (!fs.existsSync('./data/contact.json')) {
    fs.writeFileSync('./data/contact.json', '[]', 'utf-8')
}
function masukJSON() {
    const file = fs.readFileSync('data/contact.json', 'utf-8')
    const contacts = JSON.parse(file)
    return contacts

}
function namaData(nama) {
    const contact = masukJSON()
    const contacts = contact.find((a) => a.nama === nama)
    return contacts
}
//! membuat json menajdin string json
const arr = (contacts) => {
    //! ini mengunakan file sync
    fs.writeFileSync('./data/contact.json', JSON.stringify(contacts))
}

//!push ke json dan menampilkanya
const addContact = (contact) => {
    const contacts = masukJSON()
    contacts.push(contact)
    arr(contacts)
}

const namaValid = (nama) => {
    const contact = masukJSON()
    const contacts = contact.find((a) => a.nama === nama)
    return contacts
}

module.exports = { masukJSON, namaData, addContact, namaValid }
