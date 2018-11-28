const Utilities = require('./utilities'); //Utilities class contains useful object
const Message = require('./message'); //use to construct message object
const User = require('./user'); //use to construct user object.
const jwt = require('jsonwebtoken'); //jwt object uses to generate jwt token
const bcrypt = require('bcrypt'); //bcrypt uses to hash and validate password.

//Handler that deals with request after complete the authentication.
class Handler {
    constructor() {
        this._messagesDatabase = Utilities.messageDB; //Get messageDatabase reference from Utilities class
        this._usersDatabase = Utilities.userDB; //Get userDatabase reference from Utilities class
    }

    //Let a user post a message
    handleMessagePostRequest(req, res) {
        let user = req.user; //User that makes a request
        let data = req.body; //User sent information

        //Check if data sent is valid.
        let isPassed = data.hasOwnProperty('receiver') &&
            data.hasOwnProperty('content') &&
            data.hasOwnProperty('key') &&
            data.hasOwnProperty('tag') &&
            data.receiver.trim() &&
            data.content.trim() &&
            data.key.trim() &&
            data.tag.trim();

        if (isPassed) { //Successfully add a message to database
            this._messagesDatabase.add(new Message(-1, user.name, data.receiver.trim(), data.content.trim(), data.key.trim(), data.tag.trim()));
            res.status(201).end();
        } else { //Unsucessfully add a message to database.
            res.status(400).end();
        }
    }

    //Get unreaded message
    handleMessageGetRequest(req, res) {
        let user = req.user; //User that makes a request

        //Search datbase for unread messages for that user.
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
            res.status(204).end();
        }
    
    }

    //Get all message including read and unreaded message
    handleMessagesGetAllRequest(req, res) {
        let user = req.user; // user that makes a request

        //Search database for messages
        let temp = this._messagesDatabase.getItemsByCriteria(e => e.receiver === user.name);

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
            res.status(204).end();
        }
    }

    //Handle signup request by saving user data into the database
    handleSignupRequest(req, res) {

        //User sent data
        let data = req.body;

        //Data validation
        let isPassed = data.hasOwnProperty('username') &&
            data.hasOwnProperty('email') &&
            data.hasOwnProperty('name') &&
            data.hasOwnProperty('password') &&
            data.username.trim() &&
            data.email.trim() &&
            data.name.trim() &&
            data.password.trim();
        let temp = [];

        //Check if user already existed
        if (isPassed) {
            temp = this._usersDatabase.getItemsByCriteria(e => e.email === data.email || e.username === data.username);
        }

        if (temp.length === 0 && isPassed) {
            //Add a new user
            //Generate 4 digits number and attached to a username;
            while (true) {
                let num = Math.floor(Math.random() * (9999 - 1000) + 1000);
                let completeName = data.name + "-" + num;
                let a = this._usersDatabase.getItemsByCriteria(e => e.name === completeName); //Ensure that name is unique.
                if (a.length === 0) {
                    data.name = completeName;
                    break;
                }
            }

            //Hash password and store it.
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(data.password, salt, function (err, hash) {
                    Utilities.userDB.add(new User(-1, data.username.trim(), data.email.trim(), data.name.trim(), hash.trim()));
                    res.status(201).end();
                });
            });
        } else {
            res.status(400).end(); //End request and return error status.
        }

    }

    //Handle login request by return a jwt token
    handleLoginRequest(req, res) {
        //Get user who makes a request
        let user = req.user;

        //Generate jwt token
        let token = jwt.sign({}, //Options
            Utilities.key, //Key uses to sign the token
            {
                audience: Utilities.audience, //audience
                issuer: Utilities.issuer, //issuer
                subject: user.name, // who is this token issued to
                expiresIn: '7d'
            });

        //Send the token
        res.send({
            token: token
        });
        res.status(200).end();
    }

    handleSearchRequestName(req, res) {
    //Search database for all user name that match the request
        let result = [];
        let regex=new RegExp("("+req.params.name+")",'i');
        result = this._usersDatabase.getItemsByCriteria(e => regex.test(e.name) &&e.name!=req.user.name);
            if (result.length > 0) {
                 let dataPack = [];
                 for(let i=0;i<result.length;i++)
                 {
                        dataPack.push({name:result[i].name});
                 } 
                 res.status(200);
                 res.send(dataPack).end();
           } else { //If there isn't any data to send back
            res.status(204).end();
        }
    }
}
  


module.exports = Handler;