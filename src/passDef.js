const Str = require("passport-local").Strategy
const users = require("./users")
function passLocal(passport){
   serialize(passport)
   deserialize(passport)
   local(passport)
}
function serialize(passport){
    passport.serializeUser(function(user,done){// user is passed to this function. passport will save part of user
        done(null, user.id)// extract only id from user and save it internally
    })
}
function deserialize(passport){
    passport.deserializeUser(function(id, done){
        let user = users.find(function(element){// search id in users array and return the element(which is an object)
            if(id === element.id){
                return element;
            }
        })
        done(null,user)
    })

}
function local(passport){
    passport.use(new Str({usernameField: 'username', passwordField: 'password', session : false},
    function(username, password, done){
        let user = users.find(function(element){
            if(username === element.name){
                return element
            
            }

        })
        if (user === null) {
            return done (null, false)
        }
        else{
            if(password === user.password){
                return done(null, user)
            }else{
                return done(null, false)
            }
        }
    }))

}
module.exports = {
    passL: passLocal
}