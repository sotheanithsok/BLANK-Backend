let database=null;
const fs = require('fs');
const path='./database.json';


//Check if a file existed
if(!fs.existsSync(path)){
    createDatabase();
}
function createDatabase(){
    fs.writeFileSync(path,'[]',(err)=>{
        if (err){
              console.log('Error has occured');
        }else{
              console.log('Successfully created a database file.');
        }
    });
}


//Get the database object
function getDatabase(){

    if(database===null){
        //Read data
        let rawdata=fs.readFileSync('database.json');
        database=JSON.parse(rawdata);

    }
    return database;
}

//Write to the database object
function saveDatabase(){
    fs.writeFileSync(path,JSON.stringify(database),(err)=>{
        if (err){
            console.log('Error has occured while trying to save database.');
        }else{
            console.log('Successfully saved database.');
        }
    })
}

//Export functions 
module.exports.getDatabase=getDatabase();
module.exports.saveDatabase=saveDatabase();

