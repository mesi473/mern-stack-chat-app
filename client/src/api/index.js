import axios from 'axios';
import url from '../components/Env';

export const Login=(user)=>axios.put(`${url}/login`,user);
export const Register=(newUser)=>axios.post(`${url}/register`,newUser);
export const aboutUser=(userName)=>axios.get(`${url}/userInfo/${userName}`);
export const peopleYouMayKnow=(userName)=>axios.get(`${url}/users/${userName}`);
export const FetchMessages=(userName,user2)=>axios.get(`${url}/messages/${userName}/${user2}`);
export const AcceptFriendRequest=(reciever,sender)=>axios.patch(`${url}/frinedReguestAcceptance`,{reciever,sender});
export const AskFriendRequest=(sender,reciever)=>axios.get(`${url}/freindRequests/${sender}/${reciever}`);
export const User=(userName)=>axios.get(`${url}/user/${userName}`);
export const UserFriends=(userName)=>axios.get(`${url}/userFriends/${userName}`);
export const sendMessage=(sender,reciever,message)=>axios.post(`${url}/sendMessage`,{sender,reciever,message});
export const EditProfile=(userInfo,userName1)=>axios.patch(`${url}/editProfile/${userName1}`,userInfo);
export const AddProfilePic=(formData,userName)=>axios.patch(`${url}/addProfilePic/${userName}`,formData);
export const AddTimeline=(formData,userName)=>axios.post(`${url}/addTimeline/${userName}`,formData);
export const fetchTimeline=(userName)=>axios.get(`${url}/timelines/${userName}`);
