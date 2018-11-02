const Database = require('./database');
const Message = require('./message');
const User = require('./user');
const crypto = require('crypto');
const fs = require('fs');

//A utilities class that contains all constant variable. 


const messagesDatabase = new Database("./assets/messagesDatabase.json", Message); //Create a new message database
const usersDatabase = new Database("./assets/usersDatabase.json", User); //Create a new user database.

//JWT informations
const issuer = 'Crush next doors';
const audience = 'www.cgencryptedchat.me'
let key = 'You shouldn\' be able to read this';

//Write key to file if it doesn't exist
if (!fs.existsSync('./assets/HMACKey.txt')) {
    let temp = crypto.randomBytes(32).toString('hex');
    fs.writeFileSync('./assets/HMACKey.txt', temp);
}

//Read key from file.
try {
    key = fs.readFileSync('./assets/HMACKey.txt');
} catch (err) {
    console.log(error);
}

module.exports = {
    userDB: usersDatabase,
    messageDB: messagesDatabase,
    issuer: issuer,
    audience: audience,
    key: key
}