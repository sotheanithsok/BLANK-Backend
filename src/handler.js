const Utilities= require('./utilities');
const Message=require('./message');
const User = require('./user');
const jwt= require('jsonwebtoken');

//Handler that deals with request after complete the authentication.
class Handler{
    constructor(){  
        this._messagesDatabase=Utilities.messageDB;
        this._usersDatabase=Utilities.userDB;
    }

    //Let a user post a message
    handleMessagePostRequest(req, res){
        let data = req.body;
        let isPassed= data.hasOwnProperty('owner') 
                        && data.hasOwnProperty('content') 
                        && data.hasOwnProperty('key') 
                        && data.hasOwnProperty('tag') 
                        && data.owner.trim() 
                        && data.content.trim() 
                        && data.key.trim()
                        && data.tag.trim();
        if(isPassed){
            this._messagesDatabase.add(new Message(-1,data.owner.trim(),data.content.trim(),data.key.trim(),data.tag.trim()));
            res.status(201).end();
        }else{
            res.status(400).end();
        }        
    }

    //Get unreaded message
    handleMessageGetRequest(req,res){        
       let a = this._messagesDatabase.getItemsByCriteria(e => e.owner==req.params.owner && e.isRead===false);

       //If there is data to be send back.
       if(a.length>0){
        let dataPack = [];
        a.forEach(element => {
           element.isRead=true; //Mark message as read
           //Prepare data to be send
           dataPack.push({
                 owner: element.owner,
                 content: element.content,
                 key: element.key,
                 tag: element.tag
            });
        });
        //Write neccessary change to database
        this._messagesDatabase.writeToFile();
        res.send(dataPack);
        res.status(200).end();

       }else{ //If there isn't any data to send back
           res.status(404).end();
       }
    }
    
    //Get all message including read and unreaded message
    handleMessagesGetAllRequest(req,res){
        let a = this._messagesDatabase.getItemsByCriteria(e => e.owner==req.params.owner);

        //If there is data to be send back.
        if(a.length>0){
         let dataPack = [];
         a.forEach(element => {
            element.isRead=true; //Mark message as read
            //Prepare data to be send
            dataPack.push({
                  owner: element.owner,
                  content: element.content,
                  key: element.key,
                  tag: element.tag
             });
         });
         //Write neccessary change to database
         this._messagesDatabase.writeToFile();
         res.send(dataPack);
         res.status(200).end();
 
        }else{ //If there isn't any data to send back
            res.status(404).end();
        }
    }

    //Handle signup request by saving user data into the database
    handleSignupRequest(req,res){
        let data = req.body;
        let isPassed = data.hasOwnProperty('username')
                    && data.hasOwnProperty('email')
                    && data.hasOwnProperty('salt')
                    && data.hasOwnProperty('verifier')
                    && data.username.trim()
                    && data.email.trim()
                    && data.email.trim()
                    && data.verifier.trim();
        let temp=[];
        if(isPassed){
            temp = this._usersDatabase.getItemsByCriteria(e=>e.email===data.email || e.username === data.username);
        }

        if(temp.length===0 && isPassed){
            this._usersDatabase.add(new User(-1,data.username.trim(),data.email.trim(),data.salt.trim(),data.verifier.trim()));
            res.status(201).end();
        }else{
            res.status(400).end();
        }
        
    }

    //Handle login request by return a jwt token
    handleLoginRequest(req,res){
        let id= this._usersDatabase.getItemsByCriteria(e=>e.username=req.body.username)[0].id;
        let token =jwt.sign({},Utilities.key,{
            audience:Utilities.audience,
            issuer:Utilities.issuer,
            subject:id.toString(),
            expiresIn:'7d'})
        res.send({
            token:token
        });
        res.status(200).end();
    } 
}

module.exports=Handler;