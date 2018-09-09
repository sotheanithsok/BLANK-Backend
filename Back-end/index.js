const express= require('express');
const app = express();


//This is block of code is handling the writing request
//Default writing request
app.post('/api/write',(req, res)=>{
    const data = {
    
    }
});






//This is block of code is handling the reading request
//Default reading request
app.get('/api/read',(req, res)=>{
    res.send('You are attempting to read data. Cool!!!');
    res.end();
});

//Read by receiver
app.get('/api/read/:receiver',(req, res)=>{
    res.send(`You are attempting to read data from receiver ${req.params.receiver}. Cool!!!`);
    res.end();
});

app.get('/api/read/:receiver/:sender',(req, res)=>{
    res.send(`You are attempting to read data from receiver ${req.params.receiver} to sender ${req.params.sender}. Cool!!!`);
    res.end();
});
 
//Check port variable
const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Listen to port ${port}`));

