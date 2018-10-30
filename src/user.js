//A generic representation of User
class User{
    constructor(id, username, email,name , salt, verifier){
        this._id=id;
        this._username=username;
        this._email=email;
        this._name=name;
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
    set name(val){
        this._name=val;
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
    get name(){
        return this._name;
    }
    get salt(){
        return this._salt;
    }
    get verifier(){
        return this._verifier;
    }
}   

module.exports = User;