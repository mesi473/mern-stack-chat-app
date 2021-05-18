import React,{useState} from 'react'
import {makeStyles,TextField,Button,Dialog,DialogTitle,DialogContent,
  Grid,RadioGroup, FormControl,FormControlLabel,FormLabel,Radio
,IconButton,InputAdornment,InputLabel,OutlinedInput,Typography,CardActions,CardContent,
Card,CardMedia
  } from '@material-ui/core'
import {useSelector,useDispatch} from 'react-redux'
import {User,editProfile,AddProfilePic} from '../actions/index';
import EditIcon from '@material-ui/icons/Edit'
import AddProfilePicIcon from '@material-ui/icons/AddAPhoto';
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import clsx from 'clsx';
import ExitIcon from '@material-ui/icons/Close';
import URL from './Env'

const useStyle=makeStyles(theme=>({
    media: {
      height: 0,
      paddingTop: '56.25%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    border: {
      border: 'solid',
    },
    fullHeightCard: {
      height: '100%',
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderRadius: '15px',
      height: '100%',
      position: 'relative',
    },
    overlay: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      color: 'white',
    },
    overlay2: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      color: 'white',
    },
    grid: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '20px',
    },
    title: {
      padding: '0 16px',
    },
    cardActions: {
      padding: '0 16px 8px 16px',
      display: 'flex',
      justifyContent: 'space-between',
    },
    RegisterCard:{
      width:"80%",
      height:"80%",
      margin: theme.spacing(1),
  },
  margin: {
      margin: theme.spacing(2),
    },
  withoutLabel: {
      marginTop: theme.spacing(3),
    }
  }));
export default function Profile() {
    const styles=useStyle();
    const dispatch=useDispatch();
    const userName=useSelector(state=>state.signUpReducer.userName);
    const user=useSelector(state=>state.signUpReducer.user);
    const [state,setState]=useState({
        popUp:false,
        profilePic:null,
        inputValue:true
    })
    const [values, setValues] = React.useState({
      password: '',
      userName:'',
      firstName:'',
      lastName:'',
      email:'',
      gender:'',
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
    // useEffect(()=>{
    //     dispatch(User(userName));
    // })
    return (
        <div>
            <Grid  container alignItems="stretch" spacing={3}>
                <Grid  item xs={12} sm={8}>
                <Card className={styles.card}>
                    <CardMedia className={styles.media}  image={`${URL}/${user.profilePic}`}/>
                    <div className={styles.overlay}>
                        <Typography variant="h6">{user.userName}</Typography>
                    </div>
                    <CardContent>
                          <CardActions className={styles.cardActions}>
                            <div >
                                <AddProfilePicIcon fontSize="small"/>
                                    &nbsp; Change Profile pic &nbsp;
                                <input type="file"  onChange={(e)=>{setState({...state,profilePic:e.target.files[0],inputValue:false})}}/>
                                <Button variant="contained" color="primary" onClick={()=>{
                                      const formData=new FormData();
                                      formData.append('profilePic',state.profilePic);
                                      // const config = {
                                      //     headers: {
                                      //         'content-type': 'multipart/form-data'
                                      //     }
                                      // };
                                      dispatch(AddProfilePic(formData,userName));
                                      if(state.profilePic!=='') setState({inputValue:true})
                                }} disabled={state.inputValue}>Change</Button>
                            </div>
                        </CardActions>                      
                        <Typography variant="body2" component="p">email: {user.email}</Typography>
                        <Typography  variant="body2" component="p">first Name :{user.firstName}</Typography>
                        <Typography  variant="body2" component="p">last Name  :{user.lastName}</Typography>
                        <Typography  variant="body2" component="p">gender     :{user.gender}</Typography>
                    </CardContent>
                    <CardActions className={styles.cardActions}>
                        <Button size="large" fullWidth color="primary" onClick={()=>{
                          setState({popUp:true});
                          setValues({
                            password: user.password,
                            userName:user.userName,
                            firstName:user.firstName,
                            lastName:user.lastName,
                            email:user.email,
                            gender:user.gender,
                            showPassword: false,
                          })
                        }}>
                            <EditIcon fontSize="small"/>
                                &nbsp; Edit profile &nbsp;
                        </Button>
                    </CardActions>
                    
                    </Card>
                </Grid>
            </Grid>


            <Dialog open={state.popUp} maxWidth="md">
            <DialogTitle>
                <div style={{display:"flex"}}>
                    <div style={{flexGrow:1}}>
                        <EditIcon/>
                        <Typography> Edit Profile</Typography>
                    </div>
                    <Button variant="contained" color="secondary" onClick={()=>{setState({popUp:false})}}>
                        <ExitIcon/>
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent>
            <hr/>
            <Grid  container alignItems="center" className={styles.RegisterCard} spacing={3}>
                            <Grid item sm={5}  >
                                <TextField value={values.firstName} className={clsx(styles.margin, styles.textField)} onChange={(e)=>setValues({...values,firstName:e.target.value})} name="firstName" variant="outlined" label="First Name" fullWidth />
                                <TextField value={values.lastName} className={clsx(styles.margin, styles.textField)} onChange={(e)=>setValues({...values,lastName:e.target.value})} name="lastName" variant="outlined" label="Last Name" fullWidth/>
                                <TextField value={values.email} className={clsx(styles.margin, styles.textField)} onChange={(e)=>setValues({...values,email:e.target.value})} name="email" variant="outlined" label="email" fullWidth/>
                                <TextField value={values.userName} className={clsx(styles.margin, styles.textField)} onChange={(e)=>setValues({...values,userName:e.target.value})} name="userName" variant="outlined" label="userName" fullWidth/>
                            </Grid>
                            <Grid item sm={6}>
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
                                <div >
                                    <Button variant="contained" size="large" color="primary" 
                                    onClick={()=>{
                                      const userName1=userName
                                      dispatch(editProfile(values,userName1));
                                      setState({popUp:false});
                                      dispatch(User(userName));
                                    }}
                                     style={{margin:"1%"}}>Edit</Button>
                                    <Button variant="contained" size="large" color="secondary" onClick={()=>setValues({
                                      password: '',
                                      userName:'',
                                      firstName:'',
                                      lastName:'',
                                      email:'',
                                      gender:'',
                                      showPassword: false,
                                      profilePic:''
                                    })} >Clear All</Button>
                                </div>
                            </Grid>
                        </Grid>                
            </DialogContent>
        </Dialog>
        </div>
    )
}
