const express = require('express');
const app = express();
const writer = require('./write/writer');
const reader = require('./read/reader');

app.use(express.json());

//This is block of code is handling the writing request
//Default writing request
app.post('/api/write', (req, res) => {
    let result = writer.writeToDatabase(req.body);
    if (result) {
        res.status(200);
    } else {
        res.status(400);
    }
    res.end();

});






//This is block of code is handling the reading request
//Default reading request
app.get('/api/read', (req, res) => {
    if (result) {
        res.status(200);
    } else {
        res.status(400);
    }
    res.end();
});

//Read by receiver
app.get('/api/read/:receiver', (req, res) => {
    let result = reader.searchByReceiver(req.params.receiver);
    res.send(result);
    res.end();
});

app.get('/api/read/:receiver/:sender', (req, res) => {
    let result = reader.searchByReceiverAndSender(req.params.receiver, req.params.sender);
    res.send(result)
    res.end();
});


app.all('*',(req,res)=>{
    res.sendFile('database/default.html',{root: __dirname });
});
//Check port variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen to port ${port}`));