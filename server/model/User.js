const mongoose=require('mongoose');

const newUser=mongoose.Schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    userName:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:new Date()
    },
    friends:Array,
    profilePic:{
        type:String,
    },
    profilePicDate:{
        type:Date,
    },
    timelinePic:{
        type:Array
    },
    timelinePicDate:{
        type:Date,
    }
})

module.exports=UserModel=mongoose.model("users",newUser)