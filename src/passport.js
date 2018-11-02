const userDatabase = require('./utilities').userDB;
const Utilities = require('./utilities');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');


//This is a function that initialize the passport
function initialzie(passport) {
    serialize(passport);
    deserialize(passport);
    jwtStrategy(passport);
    localStategy(passport);
};

function serialize(passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    })
};

function deserialize(passport) {
    passport.deserializeUser(function (id, done) {
        user = userDatabase.getById(id);
        done(null, user);
    })
};

function jwtStrategy(passport) {
    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: Utilities.key,
        issuer: Utilities.issuer,
        audience: Utilities.audience
    }, function (payload, done) {
        let temp = userDatabase.getItemsByCriteria(e => e.name === payload.sub);
        if (temp.length != 0) {
            return done(null, temp[0]);
        } else {
            return done(null, false);
        }
    }));
}

function localStategy(passport) {
    passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password', session: false },
        function (username, password, done) {
            let user = userDatabase.database.find(function (element) {
                if (username === element.username) {
                    return element
                }
            })
            if (user === null || typeof user === "undefined") {
                return done(null, false)
            }
            else {
                bcrypt.compare(password, user.verifier, function (err, res) {
                    if (res === true) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                });
            }
        }))

};

module.exports = initialzie;