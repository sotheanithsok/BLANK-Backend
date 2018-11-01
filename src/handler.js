const Utilities = require('./utilities');
const Message = require('./message');
const User = require('./user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Handler that deals with request after complete the authentication.
class Handler {
    constructor() {
        this._messagesDatabase = Utilities.messageDB;
        this._usersDatabase = Utilities.userDB;
    }

    //Let a user post a message
    handleMessagePostRequest(req, res) {
        let user =req.user;
        let data = req.body;
        let isPassed = data.hasOwnProperty('receiver') &&
            data.hasOwnProperty('content') &&
            data.hasOwnProperty('key') &&
            data.hasOwnProperty('tag') &&
            data.receiver.trim() &&
            data.content.trim() &&
            data.key.trim() &&
            data.tag.trim();
        if (isPassed) {
            this._messagesDatabase.add(new Message(-1, user.name,data.receiver.trim(), data.content.trim(), data.key.trim(), data.tag.trim()));
            res.status(201).end();
        } else {
            res.status(400).end();
        }
    }

    //Get unreaded message
    handleMessageGetRequest(req, res) {    
        let user =req.user;    
        let temp = this._messagesDatabase.getItemsByCriteria(e => e.receiver === user.name && e.isRead === false);

        //If there is data to be send back.
        if (temp.length > 0) {
            let dataPack = [];
            temp.forEach(element => {
                element.isRead = true; //Mark message as read
                //Prepare data to be send
                dataPack.push({
                    sender: element.sender,
                    content: element.content,
                    key: element.key,
                    tag: element.tag
                });
            });
            //Write neccessary change to database
            this._messagesDatabase.writeToFile();
            res.send(dataPack);
            res.status(200).end();

        } else { //If there isn't any data to send back
            res.status(404).end();
        }
    }

    //Get all message including read and unreaded message
    handleMessagesGetAllRequest(req, res) {
        let user = req.user;

        let temp = this._messagesDatabase.getItemsByCriteria(e=>e.receiver===user.name);
        //If there is data to be send back.
        if (temp.length > 0) {
            let dataPack = [];
            temp.forEach(element => {
                element.isRead = true; //Mark message as read
                //Prepare data to be send
                dataPack.push({
                    sender: element.sender,
                    content: element.content,
                    key: element.key,
                    tag: element.tag
                });
            });
            //Write neccessary change to database
            this._messagesDatabase.writeToFile();
            res.send(dataPack);
            res.status(200).end();

        } else { //If there isn't any data to send back
            res.status(404).end();
        }
    }

    //Handle signup request by saving user data into the database
    handleSignupRequest(req, res) {
        let data = req.body;
        let isPassed = data.hasOwnProperty('username') &&
            data.hasOwnProperty('email') &&
            data.hasOwnProperty('name') &&
            data.hasOwnProperty('password') &&
            data.username.trim() &&
            data.email.trim() &&
            data.name.trim() &&
            data.password.trim();
        let temp = [];
        if (isPassed) {
            temp = this._usersDatabase.getItemsByCriteria(e => e.email === data.email || e.username === data.username);
        }

        if (temp.length === 0 && isPassed) {
            //Generate 4 digits number and attached to a username;
            while (true) {
                let num = Math.floor(Math.random() * (9999 - 1000) + 1000);
                let completeName = data.name + "#" + num;
                let a = this._usersDatabase.getItemsByCriteria(e => e.name === completeName);
                if (a.length === 0) {
                    data.name = completeName;
                    break;
                }
            }
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(data.password, salt, function (err, hash) {
                    Utilities.userDB.add(new User(-1, data.username.trim(), data.email.trim(), data.name.trim(), salt.trim(), hash.trim()));
                    res.status(201).end();
                });
            });
        } else {
            res.status(400).end();
        }

    }

    //Handle login request by return a jwt token
    handleLoginRequest(req, res) {
        let user = req.user;
        let token = jwt.sign({}, Utilities.key, {
            audience: Utilities.audience,
            issuer: Utilities.issuer,
            subject: user.name,
            expiresIn: '7d'
        })
        res.send({
            token: token
        });
        res.status(200).end();
    }
}

module.exports = Handler;