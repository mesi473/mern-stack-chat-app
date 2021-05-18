import React,{useState,useEffect} from 'react'
import {Button,CardActions,Card,makeStyles,TextField} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import {useDispatch,useSelector} from 'react-redux';
import {fetchMessage,SendMessage} from '../actions/index';
import './style.css';
import URL from './Env'

const useStyle=makeStyles({
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '80%',
        position: 'absolute',
        width:"70%"
      },
      cardActions: {
        display: 'flex',
        justifyContent: 'space-between',
      },
      cardContainet:{
        width: '90%',
        height:"80%"
      }
})
export default function Chat() {
    const friends=useSelector(state=>state.signUpReducer.friends);
    const userName=useSelector(state=>state.signUpReducer.userName);
    const [state,setState]=useState({
        i:0,
        name:[]
    });
    const dispatch=useDispatch();
    if(state.i===0)
    return (
        <div >
            {friends.lenght!==0?
                friends.map((user,index)=>
                    (<div style={{
                        display:"flex",
                        flexDirection:"row",
                    }} key={index}>
                        <div style={{
                            marginRight:"3%",
                            borderRadius:100,
                            padding:0
                        }}><img src={`${URL}/${user[0].profilePic}`} alt="profile pic" style={{width:"80px",height:"80px",borderRadius:100}}/>
                        </div>
                        <Button onClick={()=>{
                            setState({i:1,name:user[0]});
                            dispatch(fetchMessage(userName,user[0].userName));
                        }}>
                        <div style={{
                            border:"1px solid black",
                            borderRadius:100,  
                            width:"400px",
                            color:"white",
                            backgroundColor:"black",
                            opacity:0.4,
                        }}><h1 style={{
                            marginLeft:"50%",
                            fontSize:"100%"
                        }}>{user[0].userName}</h1></div>
                        </Button>
                    </div>)
                )
        :<h1>you have no friend for know!!</h1>}
        </div>
    )
    else if(state.i===1)
          return <ChatBox name={state.name}/>      
}
const ChatBox=(props)=>{
    const dispatch=useDispatch();
    const messages=useSelector(state=>state.signUpReducer.messages);
    const userName=useSelector(state=>state.signUpReducer.userName);
    const user=useSelector(state=>state.signUpReducer.user);
    const [message,setMessage]=useState('');
    const [timer,setTimer]=useState(0);
    setInterval(() => {
            setTimer(1)
    }, 8000);
    useEffect(()=>{
        if(timer===1){
            dispatch(fetchMessage(userName,props.name.userName));
            setTimer(0)
        }
    },[timer,props.name.userName])
    const styles=useStyle();
    return (
        <div style={{display:"flex",flexDirection:'row'}}>
            <Card className={styles.card}>
            <div style={{
                        display:"flex",
                        flexDirection:"row",
                    }}><img style={{
                            border:"1px solid black",
                            marginRight:"3%",
                            borderRadius:100,
                            width:"80px",height:"80px"
                        }} src={`${URL}/${props.name.profilePic}`} alt="profile pic" 
                        />
                        <div style={{
                            border:"1px solid black",
                            borderRadius:100,  
                            width:"400px",
                            color:"white",
                            backgroundColor:"black",
                            opacity:0.4,
                            
                        }}><h1 style={{
                            marginLeft:"50%",
                            fontSize:"100%",
                            marginTop:"5%"
                        }}>{props.name.userName}</h1></div>
                    </div>
                    <div className="messageContainer" style={{
                        position:"absolute",
                        marginTop:"100px",
                        left:"10%",
                        border:"1px solid black",
                        height:"60%",
                        width:"80%",
                        borderRadius:50,
                        paddingLeft:"10%",
                        paddingRight:"10%",
                        paddingBottom:"2%",
                        paddingTop:"3%",
                        overflowX:'scroll',
                        overflowY:'auto',
                        }}>
                        {
                            messages.map((message,index)=>(
                            <div key={index}>
                                {message.reciever===userName?
                                <div style={{display:"flex",flexDirection:"row",marginBottom:"5%"}}>
                                <div style={{
                                    padding:"2%",
                                    borderWidth:1,
                                    borderColor:'#4382e8',
                                    color:'#4382e8',
                                    backgroundColor:"#0eed67",
                                    borderRadius:40
                                }}>{message.message}</div>
                                <div style={{
                                    marginLeft:"3%",
                                    borderRadius:100,
                                }}>
                                    <img src={`${URL}/${props.name.profilePic}`} alt="profile pic" style={{width:"50px",height:"50px",borderRadius:100}}/>
                                </div>
                                </div>
                                :<div style={{display:"flex",flexDirection:"row",marginBottom:"5%",}}>
                                <div style={{
                                    marginRight:"3%",
                                    borderRadius:100,
                                }}>
                                    <img src={`${URL}/${user.profilePic}`} alt="profile pic" style={{width:"50px",height:"50px",borderRadius:100}}/>
                                </div>
                                <div style={{
                                            padding:"2%",
                                            borderWidth:1,
                                            borderColor:'#0eed67',
                                            color:'#0eed67',
                                            backgroundColor:"#4382e8",
                                            borderRadius:40
                                }}>{message.message}</div>
                                
                                </div>
                                }
                            </div>
                            ))
                        }
                    </div>
                
                <CardActions className={styles.cardActions}>
                    <TextField name="message" multiline
                        value={message}
                        variant="outlined" label="message" 
                        style={{
                            width:"80%"
                        }}
                        onChange={(e)=>{setMessage(e.target.value)}}/>
                    <Button  variant="contained" color="primary" 
                    style={{
                        width:"15%",
                        height:"50px"
                    }}
                    onClick={()=>{dispatch(SendMessage(userName,props.name.userName,message));setMessage('');dispatch(fetchMessage(userName,props.name.userName));}}>
                        <SendIcon />
                        &nbsp; send &nbsp;
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}
