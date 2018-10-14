const fs = require('fs');
const path = '../assets/database.json'
class Database{
    constructor(){
        if(!fs.existsSync(path)){
            this._database=[];
        }else{
            let rawData=fs.readFileSync(path);
            this._database=JSON.parse(rawData);
        }
        this.writeToFile();
    }

    //Add item to the database
    add(item){
        this._database.push(item);
        this.writeToFile();
    }

    //Remove the item from the database
    remove(item){
        let i = this._database.indexOf(item);
        if(i>-1){
           return this._database.splice(i,1);
        }
        this.writeToFile();
    }

    //Remove at specific index
    removeAtIndex(index){
        if(index>=0 && index<this._database.length){
            this._database.splice(index,1);
            this.writeToFile();
        }
    }
    //Get item at an index
    getAtIndex(index){
        return  this._database[index];
    }

    //Write database to file
    writeToFile(){
        fs.writeFileSync(path,JSON.stringify(this._database,null,4),(err)=>{
            if (err){
                console.log('Error has occured while trying to save database.');
            }else{
                console.log('Successfully saved database.');
            }
        });
    }

    //Get the database object itself
    get database(){
        return this._database;
    }
}
module.exports=Database;


