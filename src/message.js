//A generic representation of Message object
class Message {
    constructor(id, sender, receiver, content, key, tag) {
        this._id = id;
        this._sender = sender;
        this._receiver = receiver;
        this._isRead = false;
        this._content = content;
        this._key = key;
        this._tag = tag;
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