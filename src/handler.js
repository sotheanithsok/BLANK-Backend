const Database= require('./database');
class Handler{
    constructor(){  
        this._database=new Database();
    }
    handleMessagePostRequest(req, res){
        let data = req.body;
        //To-Do: Check if data has all the needed variable

        //To-Do: Inject new property into data object

        //Add data to database
        this._database.add(data);
        res.status(201).end();
    }

    handleMessageGetRequest(req,res){
        let dataPack =[];
        //To-Do: Get the owner;

        for(let i = 0; i<this._database.database.length;i++){
            let data= this._database.getAtIndex(i);
            //To-Do: Check criteria  

            //If passed, at object to package
            dataPack.push(data);
        }
        res.send(dataPack);
        res.status(200).end();
    }
    
    handleMessagesGetAllRequest(req,res){
        let dataPack =[];
        //To-Do: Get the owner;

        for(let i = 0; i<this._database.database.length;i++){
            let data= this._database.getAtIndex(i);
            //To-Do: Check criteria  

            //If passed, at object to dataPack
            dataPack.push(data);
        }
        res.send(dataPack);
        res.status(200).end();
    }
    
}

module.exports=Handler;