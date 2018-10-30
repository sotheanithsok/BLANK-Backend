const express=require('express');
const app = express();
const handle=require('./src/handler');
const passport=require('passport');
const init=require('./src/passport');

const handler=new handle();
app.use(express.json());
app.use(passport.initialize());

init(passport);

/////////Message Server
//Post new message
app.post('/messages',passport.authenticate('jwt',{session:false}),(req,res)=>{
    handler.handleMessagePostRequest(req,res);
    
});

//Get unread message request
app.get('/messages',passport.authenticate('jwt',{session:false}),(req,res)=>{
    handler.handleMessageGetRequest(req,res);
});

//Get all message 
app.get('/messagesAll',passport.authenticate('jwt', {session:false}),(req,res)=>{
    handler.handleMessagesGetAllRequest(req,res);
});

//Authentication

//Signup
app.post('/signup',(req,res)=>{
    handler.handleSignupRequest(req,res);
});

app.post('/login',passport.authenticate('local',{session:false}),(req,res)=>{
    handler.handleLoginRequest(req,res);
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

//Redirect all unknown request to homepage.
app.all('*',(req,res)=>{
    res.redirect('/');
});

//Check port variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen to port ${port}`));
