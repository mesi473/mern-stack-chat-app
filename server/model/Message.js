const mongodb=require('mongoose');

const messages=mongodb.Schema({
    sender:{
        type:String,
        require:true
    },
    reciever:{
        type:String,
        require:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    message:{
        type:String,
        require:true
    }
})

module.exports=MessagesModel=mongodb.model('messages',messages);