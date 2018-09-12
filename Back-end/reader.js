//This module will be responsible for reading database object.
const loader=require('./loader');
const database = loader.getDatabase();

function searchByReceiver(receiver){
    console.log(`Looking for ${receiver}`);
    return database;
}
function searchByReceiverAndSender(receiver, sender){
    console.log(`Looking for ${receiver} and ${sender}`);
    return true;
}

module.exports.searchByReceiver=searchByReceiver;
module.exports.searchByReceiverAndSender=searchByReceiverAndSender;