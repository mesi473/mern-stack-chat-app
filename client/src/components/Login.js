import React,{useState} from 'react';
import {makeStyles, Typography,TextField,Button} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/PeopleAltOutlined';
import Register from './Register';
import {Route,Link,BrowserRouter as Router,Redirect} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {LoginAction,addUserName} from '../actions/index';
import MainPage from './MainPage';

const useStyles=makeStyles({
    loginCard:{
        position:"absolute",
        top:"20%",
        left:"30%",
        width:"40%",
        height:"60%",
    },
    icon:{
    },
    cardActions: {
        padding: '0 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    chatName:{
        position:"relative",
        left:"25%",
        fontFamily:"myFont",
        fontSize: "5rem",
        color:"white",
    },
    PersonIcon:{
        width:"50px",height:"5%",color:"lightseagreen",marginTop:"20px"
    },
    loginLabelColor:{
        color:"lightseagreen"
    },
    incorrect:{
        color:"red",
        fontFamily:"myFont",
    },
    loginArea:{
        margin:"2%",marginTop:"2%"
    },
    userNameTextField:{
        marginBottom:"5%"
    },
    loginButton:{
        backgroundColor:"lightseagreen",color:"white"
    },
    form:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-end",
        padding:"1%",
    },
    createAcountLabel:{
        color:"white",marginRight:"1%",fontSize:25,fontFamily:"myFont",
    }
})

export default function Login() {
    const styles=useStyles();
    const [i ,setI]=useState(0);
    const [values,setValues]=useState({
        userName:'',
        password:'',
    });
    const dispatch=useDispatch();
    const isSuccess=useSelector(state=>state.signUpReducer.success);
    if(isSuccess===true) { dispatch(addUserName(values.userName)); return <MainPage/>}
    else if(i===0)
    return (
        <Router>
            <div>
            <label align="center" className={styles.chatName} >Me Chat</label>
                <form className={styles.loginCard}>
                <div  align="center" elevation={3}>
                    <PersonIcon  className={styles.PersonIcon}/>
                    <Typography variant="h5" align="center" className={styles.loginLabelColor}>Login</Typography>
                </div>
                {(isSuccess===false)?<h1 className={styles.incorrect}>incorrect user name or password</h1>:null}
                <div className={styles.loginArea}>
                    <TextField name="userName" variant="outlined" 
                        onChange={(e)=>setValues({...values,userName:e.target.value})} 
                        label="user name" fullWidth className={styles.userNameTextField}
                        value={values.userName}
                        />
                    <TextField name="password" 
                        value={values.password}
                        variant="outlined" label="password" fullWidth
                        onChange={(e)=>setValues({...values,password:e.target.value})}/>
                    <Link  to={`/user/${values.userName}`}>
                        <Button onClick={()=>{
                            dispatch(LoginAction(values));
                        }}
                            variant="contained" size="large" style={{backgroundColor:"lightseagreen",color:"white",marginTop:"3%"}} fullWidth >
                            Login
                        </Button>
                    </Link>
                </div>
                
                </form>
                <div className={styles.form}>
                    <p className={styles.createAcountLabel}>create an account </p>
                    <Link to="/register">
                        <Button variant="contained" size="small" className={styles.loginButton}
                         onClick={()=>setI({i:1})}>Register</Button>
                    </Link>
                </div>
            </div>
            
            <Route exact path="/register" component={Register}/>
            <Route  path="/user/:userName" exact strict  render={()=>{
                if(isSuccess){
                    return <MainPage/>
                }else if(isSuccess===false){
                    return <Redirect to="/"/>
                }
            }}/>
        </Router>
    )
    else { return <Register/>}
}
