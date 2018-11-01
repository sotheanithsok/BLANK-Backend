const fs = require('fs');

//A generic representation of database
class Database{
    constructor(path, type){
        this._path=path;
        this._type=type;
        if(!fs.existsSync(this._path)){
            this._database=[];
            this.writeToFile();
        }else{
            let rawData=fs.readFileSync(this._path);
            this._database=JSON.parse(rawData);
            //Rebuild from JSON object back to Data object
            let temp =[];
            while(this._database.length>0){
                temp.push(this._database.pop());
            }
            while(temp.length>0){
                 let k = new this._type();
                 Object.assign(k,temp.pop())
                 this._database.push(k)
            }
            
        }
    }

    //Add item to the database
    add(item){
        item.id = this._database.length; 
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

    //Return all item that meet that criteria
    getItemsByCriteria(criteria){
       return this._database.filter(criteria);
    }

    //Return item of that id
    getById(val){
        return this._database.find(e=>e.id===val);
    }
    
    //Get size of the database
    getSize(){
        return this._database.length;
    }

    //Return a specific item from a database
    getItem(item){
        let i =this._database.indexOf(item);
        return this._database[i];
    }

    //Write database to file
    writeToFile(){
       fs.writeFile(this._path,JSON.stringify(this._database,null,4),(err)=>{
           if(err){
            console.error(err);
           }
       });
    }

    //Get the database object itself
    get database(){
        return this._database;
    }
}
module.exports=Database;


