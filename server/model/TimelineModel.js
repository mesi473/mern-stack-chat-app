const mongoose =require('mongoose')

const Image=mongoose.Schema({
    imageName:{
        type:String,
        default:"none",
        required:true
    },
    userName:{
        type:String,
        required:true,
    },
    caption:{
        type:String,
    },
    date:{
        type:Date,
        required:true,
        default:Date.now
    }
});

module.exports=ImageModle=mongoose.model('images',Image);