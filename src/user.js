//A representation of user object
class User{
    constructor(id, username, email, salt, verifier){
        this._id=id;
        this._username=username;
        this._email=email;
        this._salt =salt;
        this._verifier = verifier;
    }
    set id(val){
        this._id=val;
    }
    set username(val){
        this._username=val;
    }
    set email(val){
        this._email=val;
    }
    set salt(val){
        this._salt=val;
    }

    set verifier(val){
        this._verifier=val;
    }

    get id(){
        return this._id;
    }
    get username(){
        return this._username;
    }
    get email(){
        return this._email;
    }
    get salt(){
        return this._salt;
    }
    get verifier(){
        return this._verifier;
    }
}   
module.exports = User;