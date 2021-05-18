import React,{useState} from 'react';
import {  makeStyles,TextField,Button,
      Grid,RadioGroup, FormControl,FormControlLabel,FormLabel,Radio
    ,IconButton,InputAdornment,InputLabel,OutlinedInput} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import PersonIcon from '@material-ui/icons/PeopleAltOutlined';
import clsx from 'clsx'
import Login from './Login';
import {useDispatch,useSelector} from 'react-redux';
import {RegisterAction} from '../actions/index'
import {Route,Link,Redirect,BrowserRouter as Router} from 'react-router-dom'
import '../app.css';
import MainPage from './MainPage';
import {addUserName} from '../actions/index'


const useStyles=makeStyles(theme=>({
    RegisterCard:{
        position:"absolute",
        top:"30%",
        left:"10%",
        width:"80%",
        height:"80%",
        margin: theme.spacing(1),
    },
    cardActions: {
        padding: '0 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    margin: {
        margin: theme.spacing(1),
      },
    withoutLabel: {
        marginTop: theme.spacing(3),
      },
    chatName:{
        position:"relative",
        left:"25%",
        fontFamily:"myFont",
        fontSize: "5rem",
        color:"white",
    },
    PersonIcon:{
        width:"50px",height:"50px",color:"black",opacity:0.4
    }
}));

export default function Register() {
    const styles=useStyles();
    const [i,setI]=useState(0);
    const dispatch=useDispatch();
    const [uname,setUname]=useState('')
    const [values, setValues] = React.useState({
        password: '',
        conPassword:'',
        userName:'',
        firstName:'',
        lastName:'',
        email:"",
        gender:"male",
        showPassword: false,
      });
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
      const message=useSelector(state=>state.signUpReducer.message);
      const success=useSelector(state=>state.signUpReducer.success);
    if(success===true) { dispatch(addUserName(uname)); return <MainPage/>} 
    if(i===0)
    return (
        <Router>
            <label align="center" className={styles.chatName}>Me Chat</label>
                   <div>
                   <form  >
                    <div style={{position:"absolute",left:"50%"}}>
                        <PersonIcon align="center" className={styles.PersonIcon}/>
                        <h1 className="font" align="center" style={{color:"white"}}>Register</h1>
                    </div>
                        <Grid  container alignItems="center" className={styles.RegisterCard} spacing={3}>
                        
                        {!success?message.map((message,index)=>(
                            <h1 className="font" key={index} style={{color:"red"}}>{message}</h1>
                        )):null}
                            <Grid item sm={5}  >
                                <TextField value={values.firstName} className={clsx(styles.margin, styles.textField)} onChange={(e)=>setValues({...values,firstName:e.target.value})} name="firstName" variant="outlined" label="First Name" fullWidth />
                                <TextField value={values.lastName} className={clsx(styles.margin, styles.textField)} onChange={(e)=>setValues({...values,lastName:e.target.value})} name="lastName" variant="outlined" label="Last Name" fullWidth/>
                                <TextField value={values.email} className={clsx(styles.margin, styles.textField)} onChange={(e)=>setValues({...values,email:e.target.value})} name="email" variant="outlined" label="email" fullWidth/>
                                <TextField value={values.userName} className={clsx(styles.margin, styles.textField)} onChange={(e)=>setValues({...values,userName:e.target.value})} name="userName" variant="outlined" label="userName" fullWidth/>
                            </Grid>
                            <Grid item sm={6} >
                                <FormControl className={clsx(styles.margin, styles.textField)}>
                                    <FormLabel>Gender</FormLabel>
                                    <RadioGroup row={true} value={values.gender} onChange={(e)=>setValues({...values,gender:e.target.value})}>
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                                    </RadioGroup>
                                </FormControl>
                                <FormControl className={clsx(styles.margin, styles.textField)} variant="outlined" fullWidth>
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        labelWidth={70}
                                    />
                                </FormControl>
                                <FormControl className={clsx(styles.margin, styles.textField)} variant="outlined" fullWidth>
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.conPassword}
                                        onChange={handleChange('conPassword')}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        labelWidth={70}
                                    />
                                </FormControl>
                                <div >
                                    <Link to={`/user/${values.userName}`}>
                                        <Button variant="contained" size="large" color="primary" 
                                        onClick={()=>{
                                            dispatch(RegisterAction(values));
                                            setUname(values.userName);
                                        }}
                                        style={{margin:"1%"}}>Submit</Button>
                                    </Link>
                                    <Button variant="contained" size="large" color="secondary" onClick={()=>setValues({})}>Clear</Button>
                                </div>
                            </Grid>
                        </Grid>
                    </form>
                        <div style={{
                            padding:"1%"
                        }}>
                            <p className="font" style={{color:"white",fontSize:20 }}>I already have an account </p>
                            <Link to="/login" >
                                <Button variant="contained" size="small" style={{
                                    backgroundColor:"lightseagreen",color:"white"
                                }} onClick={()=>setI({i:1})}>Login</Button>
                            </Link>
                        </div>
                   </div> 
                    
            <Route  path="/user/:userName" exact strict  render={()=>{
                if(success){
                    return <MainPage/>
                }else if(success===false){
                    return <Redirect to="/register"/>
                }
                }}/>
            <Route exact path="/login" component={Login}/>
            
        </Router>
    )
    else return <Login/>
}
