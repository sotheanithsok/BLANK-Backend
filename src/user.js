//A generic representation of User
class User {
    constructor(id, username, email, name, verifier) {
        this._id = id; //Id in the datbase
        this._username = username; // username uses to login
        this._email = email; //email associates with this user
        this._name = name; //in-app unique name
        this._verifier = verifier; // hashed password
    }
    set id(val) {
        this._id = val;
    }
    set username(val) {
        this._username = val;
    }
    set email(val) {
        this._email = val;
    }
    set name(val) {
        this._name = val;
    }

    set verifier(val) {
        this._verifier = val;
    }

    get id() {
        return this._id;
    }
    get username() {
        return this._username;
    }
    get email() {
        return this._email;
    }
    get name() {
        return this._name;
    }

    get verifier() {
        return this._verifier;
    }
}

module.exports = User;