const userDatabase = require('./utilities').userDB;
const Utilities=require('./utilities');
const LocalStrategy=require('passport-local').Strategy;
const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


//This is a function that initialize the passport
function initialzie(passport){
    serialize(passport);
    deserialize(passport);
    jwtStrategy(passport);
    localStategy(passport);
};
function serialize(passport){
    passport.serializeUser(function(user,done){
        done(null, user.id);
    })
};  
function deserialize(passport){
    passport.deserializeUser(function(id,done){
        user = userDatabase.getById(id);
        done(null, user);
    })
};
function jwtStrategy(passport){
    passport.use(new JwtStrategy({
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey:Utilities.key,
        issuer:Utilities.issuer,
        audience:Utilities.audience
    },function(payload,done){
        let temp = userDatabase.getItemsByCriteria(e=>e.id===parseInt(payload.sub));
        if(temp.length!=0){
            return done(null, temp[0]);
        }else{
            return done(null, false);
        }
    }));
} 
function localStategy(passport){
    passport.use(new LocalStrategy(
        {session: false},
        function(username,password, done){
            let result = userDatabase.getItemsByCriteria(e=>e.username===username);
            if(result.length===0){
                return done(null,false); //No user found
            }else{
                let user =result[0];
                if(user.verifier!=password){
                    return done(null,false);//Wrong password
                }else{
                    return done(null,user);//Right User
                }
            }
    }))
};

module.exports=initialzie;