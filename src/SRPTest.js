 const srpC = require('secure-remote-password/client');
 const srpS = require('secure-remote-password/server');
 const bcrypt = require('bcrypt');
 const saltRounds= 10;

 const username = "thetheanith@gmail.com";
 const password = "$uper$ecure";

 //Signup
 //Server stores: salt, username, and verifier
 const salt =bcrypt.genSaltSync(saltRounds);
 const key = bcrypt.hashSync(`${username}:${password}`,salt);
 const privateKey =  Buffer.from(key,'utf8').toString('hex');
 const verifier = srpC.deriveVerifier(privateKey);

 //Login Process
 //Step 1 : Generate clientEphemeral (LOCAL)
 let clientEphemeral= srpC.generateEphemeral();


 //Step 2: Generate serverEphermeral (SERVER)
 let serverEphermeral=srpS.generateEphemeral(verifier);

 //Step 3: Client dervies strong session key and proof(LOCAL)
 //Client regenerate the privateKey using Bcrypt and convert it to hex
 let tKey = bcrypt.hashSync(`${username}:${password}`,salt);
 let pKey = Buffer.from(tKey,'utf8').toString('hex');

let clientSession = srpC.deriveSession(clientEphemeral.secret, serverEphermeral.public, salt, username, pKey);

//Step 4: Server verification (SERVER)
let serverSession;
try{
    serverSession= srpS.deriveSession(serverEphermeral.secret,clientEphemeral.public,salt,username,verifier,clientSession.proof);
    console.log('Succesfully verified the client');
}catch(err){
    console.error("Failed to verify client")
}

//Step 5: Client verification (LOCAL)
try{
    srpC.verifySession(clientEphemeral.public, clientSession, serverSession.proof);
    console.log('Succesfully verified the server');
}catch(err){
    console.error('Failed to verify server');
}
