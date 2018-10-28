class Message{
    constructor(id, owner, content, key, tag){
        this._id=id;
        this._owner=owner;
        this._isRead=false;
        this._content=content;
        this._key = key;
        this._tag = tag;
    }

    get id(){
        return this._id;
    }
    get owner(){
        return this._owner;
    }
    get isRead(){
        return this._isRead;
    }
    get content(){
        return this._content;
    }
    get key(){
        return this._key;
    }
    get tag(){
        return this._tag;
    }

    set id(val){
        this._id =val;
    }
    set owner(val){
        this._owner =val;
    }
    set isRead(val){
        this._isRead =val;
    }
    set content(val){
        this._content =val;
    }
    set key(val){
        this._key =val;
    }
    set tag(val){
        this._tag = val;
    }

    getName(){
        return this._id;
    }

}
module.exports=Message;