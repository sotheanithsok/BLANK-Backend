//This module will be responsible for writing to the database object.
const loader=require('../database/loader');
const database = loader.getDatabase();


//This function is used to verified the data. If it is valid, it will be push to database.
function writeToDatabase(data){
    database.push(data);
    loader.saveDatabase();
    return true;
}

module.exports.writeToDatabase=writeToDatabase;