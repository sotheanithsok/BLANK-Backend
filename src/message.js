//A generic representation of Message object
class Message {
    constructor(id, sender, receiver, content, key, tag) {
        this._id = id; //Id in the database
        this._sender = sender; //who is the sender
        this._receiver = receiver; //who is the receiver
        this._isRead = false; //has the message been read
        this._content = content; //content of the message
        this._key = key; //key uses to encrypt the message
        this._tag = tag; // tag uses to verify the message
    }

    get id() {
        return this._id;
    }
    get sender() {
        return this._sender;
    }
    get receiver() {
        return this._receiver;
    }
    get isRead() {
        return this._isRead;
    }
    get content() {
        return this._content;
    }
    get key() {
        return this._key;
    }
    get tag() {
        return this._tag;
    }

    set id(val) {
        this._id = val;
    }
    set sender(val) {
        this._sender = val;
    }
    set receiver(val) {
        this._receiver = val;
    }
    set isRead(val) {
        this._isRead = val;
    }
    set content(val) {
        this._content = val;
    }
    set key(val) {
        this._key = val;
    }
    set tag(val) {
        this._tag = val;
    }
}
module.exports = Message;