const express=require('express');
const app = express();
const handle=require('./src/handler');

const handler=new handle();

app.use(express.json());

//Post new message
app.post('/messages',(req,res)=>{
    handler.handleMessagePostRequest(req,res);
    
});

//Get unread message request
app.get('/messages/:owner',(req,res)=>{
    handler.handleMessageGetRequest(req,res);
});

//Get all message 
app.get('/messagesAll/:owner',(req,res)=>{
    handler.handleMessagesGetAllRequest(req,res);
});


//Extra request handles

//Setup page
app.get('/setup', (req,res)=>{
    res.sendFile('assets/setup.html',{root: __dirname });
    
});

//Home page
app.get('/',(req,res)=>{
    res.sendFile('assets/default.html',{root: __dirname});
});

// Login
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

//Redirect all unknow request to homepage.
app.all('*',(req,res)=>{
    res.redirect('/');
});

//Check port variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen to port ${port}`));
