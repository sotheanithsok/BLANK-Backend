const Database= require('./database');
const Message=require('./message');
const User = require('./user');

class Handler{
    constructor(){  
        this._messagesDatabase=new Database("./assets/messagesDatabase.json", Message);
        this._usersDatabase=new Database("./assets/usersDatabase.json", User);
    }
    
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
    
}

module.exports=Handler;