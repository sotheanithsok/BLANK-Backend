//A representation of user object
class User{
    constructor(id, username, email, password, salt){
        this._id=id;
        this._username=username;
        this._email=email;
        this._password=password;
        this._salt =salt;
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
    set password(val){
        this._password=val;
    }
    set salt(val){
        this._salt=val;
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
    get password(){
        return this._password
    }
    get salt(){
        return this._salt;
    }
}   
module.exports = User;