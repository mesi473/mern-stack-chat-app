import * as api from '../api/index'


const LoginAction=(user)=> async (dispatch)=>{
    try{
        const {data}=await api.Login(user);
        dispatch({
            type:"LOGIN",
            payload:data
        }) ;
    }
    catch(error){
        console.log(error)
    }
    
}
const RegisterAction=(user)=>async (dispatch)=>{
    try{
        api.Register(user).then(res=>{
            if(res.data){
                dispatch({
                    type:"REGISTER",
                    payload:res.data
                })
            }
        }).catch(error=>console.log(error))
        
    }catch(error){
        console.log(error);
    }
}
const ChangeSuccessStatus=()=>{
    return {
        type:"CHANGE-STATUS",
        payload:null
    }
}
const addUserName=(userName)=>{
    return {
        type:"ADD_USERNAME",
        payload:userName
    }
}
const peopleYouMayKnow=(userName)=>async (dispatch)=>{
    try{
        const {data}= await api.peopleYouMayKnow(userName);
        dispatch({
            type:"FEATCH_PEOPLE_YOU_MAY_KNOW",
            payload:data
        })
    }
    catch(error){
        console.log(error);
    }
    
}
const fetchMessage=(userName,user2)=>async (dispatch)=>{
    try{
        const {data}= await api.FetchMessages(userName,user2);
        dispatch({
            type:"FETCH_MESSAGE",
            payload:data
        })
    }catch(error){
        console.log(error);
    }
}
const AcceptFriendRequest=(reciever,sender)=>async (dispatch)=>{
    try{
        await api.AcceptFriendRequest(reciever,sender);
        dispatch({
            type:"ACCEPT_REQUEST"
        });
    }catch(error){
        console.log(error);
    }
}
const AskFriendRequest=(sender,reciever)=>async (dispatch)=>{
    try{
        await api.AskFriendRequest(sender,reciever)
        dispatch({
            type:"ASK_REQUEST"
        });
    }catch(error){
        console.log(error);
    }
}
const User=(userName)=>async (dispatch)=>{
    try{
        const {data}=await api.User(userName);
        dispatch({
            type:"USER",
            payload:data
        })
    }catch(error){
        console.log(error);
    }
}
const UserFriends=(userName)=>async (dispatch)=>{
    try{
        const {data}=await api.UserFriends(userName);
        dispatch({
            type:"USER-FRIENDS",
            payload:data
        })
    }catch(error){
        console.log(error);
    }
}
const SendMessage=(sender,reciever,message)=>async (dispatch)=>{
    try{
       await api.sendMessage(sender,reciever,message);
        dispatch({
            type:"SEND_MESSAGE",
        })
    }catch(error){
        console.log(error);
    }
}
const AddProfilePic=(fromData,userName)=>async (dispatch)=>{
    try{
       const {data}=await api.AddProfilePic(fromData,userName);
        dispatch({
            type:"ADD_PROFILE_PIC",
            payload:data
        })
    }catch(error){
        console.log(error);
    }
}
const editProfile=(userInfo,userName1)=>async (dispatch)=>{
    try{
       const {data}=await api.EditProfile(userInfo,userName1);
        dispatch({
            type:"EDIT_PROFILE",
            payload:data
        })
    }catch(error){
        console.log(error);
    }
}
const addTimeline=(fromData,userName,caption)=>async (dispatch)=>{
    try{
       const {data}=await api.AddTimeline(fromData,userName,caption);
        dispatch({
            type:"ADD_TIMELINE",
            payload:data
        })
    }catch(error){
        console.log(error);
    }
}
const fetchTimeline=(userName)=>async (dispatch)=>{
    try{
       const {data}=await api.fetchTimeline(userName);
        dispatch({
            type:"FETCH_TIMELINE",
            payload:data
        })
    }catch(error){
        console.log(error);
    }
}
export {
    LoginAction,RegisterAction,ChangeSuccessStatus,addUserName,peopleYouMayKnow,fetchMessage,AcceptFriendRequest
    ,AskFriendRequest,User,UserFriends,SendMessage,editProfile,AddProfilePic,addTimeline,fetchTimeline
}