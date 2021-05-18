const express=require('express');
const multer=require('multer');
const router=express();

const UserModel=require('../model/User');
const FreindRequestModel=require('../model/FriendReguestModel');
const MessageModel=require('../model/Message');
const TimelineModel=require('../model/TimelineModel');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    },
})
const upload=multer({storage:storage,limits:{fieldSize:24*1024*1024}});
router.put("/login",(req,res)=>{
    const user=req.body;
    UserModel.find({userName:user.userName,password:user.password}).then(
        user=>{
            if(user.length!=0){
                res.json({success:true});
            }else{
                res.json({success:false});
            }
        }
    ).catch(error=>console.log(error));
});
router.post("/register",async (req,res)=>{
    const userName=req.body.userName;
    const email=req.body.email;
    const password=req.body.password;
    const conPassword=req.body.conPassword;
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const gender=req.body.gender;
    const message=[];
    if(conPassword===password){
        await UserModel.find({userName:userName}).then(
            user=>{
                if(user.length!=0){
                    message.push("this user name is taken by other user")
                }else{
                   if(userName===''||lastName===''||gender===''||firstName===''||password===''||conPassword===''||email===''){
                       message.push("all fields are required");
                   }else{
                       new  UserModel({
                           userName:userName,
                           lastName:lastName,
                           firstName:firstName,
                           email:email,
                           password:password,
                           gender:gender
                       }).save();
                   }
                }
            }
        ).catch(error=>console.log(error));
    }else{
        message.push("password and confirm password must be equal")
    }
    if(message.length!=0){
        res.json({message:message});
    }else{
        res.json({success:true});
    }
});
router.get("/userInfo/:userName",(req,res)=>{
    console.log("mesi");
    const {userName}=req.params;
    console.log(req.params);
    console.log(userName);
});
router.get("/freindRequests/:sender/:reciever",async (req,res)=>{
    const sender=req.params.sender
    const reciever=req.params.reciever;
    if(sender!='' && reciever!=''){
        await new FreindRequestModel({
            sender:sender,
            reciever:reciever,
            acceptance:0
        }).save().then(
            res.json({success:"success",sender:sender,reciever:reciever})
        ).catch(err=>console.log(err));
    }
    else{
        res.json({error:"error"});
    }
});
router.get("/users/:userName",async (req,res)=>{
    const userName=req.params.userName;
    let array='';
    let array2=[];
    let array3='';
    let array4=[];
    let array5=[];
    let array6='';
    await FreindRequestModel.find({$or:[{sender:userName},{reciever:userName}]}).then(
        response=>{
            array=response;
        }
    ).catch(error=>console.log(error));
    for(let i=0;i<array.length;i++){
        if(array[i].sender===userName){
            array2.push(array[i].reciever);
        }else{
            array2.push(array[i].sender);
        }
    }
    await UserModel.find({$nor:[{userName:userName}]}).then(
        response=>{
            array3=[...response];
        }
    ).catch(error=>console.log(error));
    let xx=[];
    for(let i=0;i<array3.length;i++){
        var notFound=true;
        for(let x=0;x<array2.length;x++){
            if(array3[i].userName===array2[x]){
                notFound=false;
                break;
            }
        }
        if(notFound)xx.push(array3[i]);
    }
    await FreindRequestModel.find({$and:[{acceptance:0},{reciever:userName}]}).then(
        response=>{
            array4=response;
        }
    ).catch(error=>console.log(error));
    for(let i=0;i<array4.length;i++){
        await UserModel.find({userName:array4[i].sender}).then(
            response=>{
                array5.push(response);
            }
        ).catch(error=>console.log(error));
    }
    array6=array5[0];
    res.json({add:xx,confirm:array6});
});
router.get("/messages/:userName/:user2",async (req,res)=>{
    const userName=req.params.userName;
    const user2=req.params.user2;
    await MessageModel.find({$or:[{sender:userName,reciever:user2},{sender:user2,reciever:userName}]})
        .then(message=>{
            if(message){
                res.json(message);
            }else{
                res.json({error:'error'});
            }
    }).catch(err=>console.log(err));
});
router.get("/userFriends/:userName",async (req,res)=>{
    const userName=req.params.userName
    let array=[];
    let array2=[];
    await UserModel.findOne({userName:userName}).then(
        response=>{
            array=[...response.friends];
        }
    )
    for(let i=0;i<array.length;i++){
        await UserModel.find({userName:array[i]}).then(
            response=>{
                array2.splice(array2.length,0,response);
            }
        )
    }
    res.json(array2);
});
router.get("/user/:userName",(req,res)=>{
    const userName=req.params.userName
    UserModel.findOne({userName:userName}).then(
        response=>{
            res.json(response);
        }
    )

});

router.patch("/frinedReguestAcceptance",async (req,res)=>{
    const reciever=req.body.reciever;
    const sender=req.body.sender;
    let array=[];
    let array2=[];
    await UserModel.findOne({userName:sender}).then(
        response=>{
            if(response.friends.length!==0) {
                array=response.friends
            }
        }
    ).catch(error=>console.log(error));
    await UserModel.findOne({userName:reciever}).then(
        response=>{
            if(response.friends.length!==0) {
                array2=response.friends
            }
        }
    ).catch(error=>console.log(error));
    array.splice(array.length-1,0,reciever);
    array2.splice(array2.length-1,0,sender);
    await FreindRequestModel.updateOne({$and:[{sender:sender},{reciever:reciever}]},{acceptance:1}).catch(error=>console.log(error))
    await UserModel.updateOne({userName:sender},{friends:array}).catch(error=>console.log(error));
    await UserModel.updateOne({userName:reciever},{friends:array2}).catch(error=>console.log(error));
    res.end();
});
router.post("/sendMessage",async (req,res)=>{
    const reciever=req.body.reciever;
    const sender=req.body.sender;
    const message=req.body.message;
    await UserModel.find({$or:[{userName:reciever},{userName:sender}]}).then(
        user=>{
            if(user){
                new MessageModel({
                    reciever:reciever,
                    sender:sender,
                    message:message
                }).save().then(res.json({success:"success"})).catch(err=>console.log(err));
            }else{
                res.json({error:"error"});
            }
        }
    ).catch(err=>console.log(err));
});
router.patch("/editProfile/:userName",async (req,res)=>{
    const userName1=req.params.userName;
    const userName=req.body.userName;
    const password=req.body.password;
    const email=req.body.email;
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const gender=req.body.gender;
    await UserModel.updateOne({userName:userName1},{
        firstName:firstName,
        lastName:lastName,
        userName:userName,
        password:password,
        email:email,
        gender:gender,
    }).then(response=>res.json(true)).catch(error=>console.log(error));
});
router.patch("/addProfilePic/:userName",upload.single('profilePic'),async (req,res)=>{
    if(req.file!=null){
        await UserModel.updateOne({userName:req.params.userName},{
            profilePic:req.file.originalname
        }).then(response=>res.json(true)).catch(error=>console.log(error));
    }else{
        res.end();
    }
});
router.post("/addTimeline/:userName",upload.single('timelinePhoto'),async (req,res)=>{
    if(req.file!=null){
        await new TimelineModel({
            imageName:req.file.originalname,
            userName:req.params.userName,
            caption:req.body.caption
        }).save();
    }else{
        res.end();
    }
});
router.get("/timelines/:userName",async (req,res)=>{ 
    const uname=req.params.userName; 
    let array=[];
    let array2=[];
    await UserModel.find({userName:uname}).then((users)=>{ 
      if(users){
        array=[...users[0].friends];
      } else { 
        res.json({error:"error"}); 
      }
    }).catch(err=>res.json({error:"error"}));
    await TimelineModel.find({}).then(res=>array2=[...res]).catch(error=>console.log(error));
    array.push(uname)
    
    let xx=[];
    for(let i=0;i<array2.length;i++){
        var notFound=false;
        for(let x=0;x<array.length;x++){
            if(array2[i].userName===array[x]){
                notFound=true;
                break;
            }
        }
        if(notFound)xx.push(array2[i]);
    }
    res.json(xx);
  });
module.exports=router;