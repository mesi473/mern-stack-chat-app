import React,{useState} from 'react'
import {makeStyles,Button, Dialog, 
    DialogTitle, Typography, DialogContent, TextField,
    Card,CardMedia,CardContent,Grid} from '@material-ui/core';
import ExitIcon from '@material-ui/icons/Close';
import AddProfilePicIcon from '@material-ui/icons/Photo';
import {addTimeline,fetchTimeline} from '../actions/index';
import {useDispatch,useSelector} from 'react-redux';
import Refrash from '@material-ui/icons/Refresh';
import moment from 'moment';
import URL from './Env'
const useStyle=makeStyles(theme=>({
    media: {
      height: 0,
      paddingTop: '100%',
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
    RegisterCard:{
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
      margin: theme.spacing(2),
    },
  withoutLabel: {
      marginTop: theme.spacing(3),
    },
  makePostButton:{
    marginLeft:"20px"
  }
  }));
export default function Home() {
    const [value,setValue]=useState({
        isOpen:false,
        isDisabled:true,
        profilePic:'',
        caption:'',
        no:1,
    });
    const [newPost, setNewPost]=useState(true);
    const dispatch=useDispatch();
    const userName=useSelector(state=>state.signUpReducer.userName);
    const timelines=useSelector(state=>state.signUpReducer.timelines);
    const styles=useStyle();
    
    // useEffect(()=>{
        
    //     dispatch(fetchTimeline(userName));
    // })
    setInterval(() => {
      if(newPost){
        dispatch(fetchTimeline(userName));
      }
      setNewPost(false);
    }, 500);
    return (
        <div>
            <div
            style={{
              padding:"20px"
            }}
            >
            <Button className={styles.makePostButton} onClick={(e)=>{setValue({...value,isOpen:true});e.preventDefault();}} variant="contained" color="primary"
            
            >Make Post</Button>
            <Button variant="contained" color="primary" onClick={()=>{dispatch(fetchTimeline(userName))}}><Refrash/></Button>
            </div>
            <Grid  container alignItems="center" spacing={3} style={{marginTop:"2%"}}>
                {timelines.length!==0?timelines.map((user,index)=>(
                <Grid key={index} item xs={12} sm={6} >
                <Card className={styles.card}>
                    <CardMedia className={styles.media} image={`${URL}/${user.imageName}`} />
                    <div className={styles.overlay}>
                        <Typography variant="h6" color="black">{user.userName}</Typography>
                    </div>
                    <CardContent>
                        <Typography  variant="body2" component="p">{user.caption}</Typography>
                        <Typography variant="body2" color="black">{moment(user.date).fromNow()}</Typography>
                    </CardContent>
                </Card>
                </Grid>
            )):null}
            </Grid>
            <Dialog open={value.isOpen}>
                <DialogTitle>
                    <div style={{display:"flex"}}>
                    <Typography style={{flexGrow:1}}>Make Post</Typography>
                    <Button variant="contained" color="secondary" onClick={()=>{setValue({...value,isOpen:false})}}>
                        <ExitIcon/>
                    </Button>
                    </div>
                </DialogTitle>
                <DialogContent>
                <hr/>
                <div style={{display:"flex",flexDirection:"column",padding:"5%"}}>
                    <div style={{marginBottom:"2%"}}><AddProfilePicIcon fontSize="small"/>
                        &nbsp; choose photo &nbsp;</div>
                    <input style={{marginBottom:"10%"}} type="file"  onChange={(e)=>{setValue({...value,profilePic:e.target.files[0],isDisabled:false})}}/>
                    <TextField multiline style={{marginBottom:"2%"}} name="caption" variant="outlined" label="caption"
                        onChange={(e)=>{
                            setValue({...value,caption:e.target.value});
                        }}
                    />
                    <Button variant="contained" color="primary" onClick={()=>{
                            const formData=new FormData();
                            formData.append('timelinePhoto',value.profilePic);
                            formData.append('caption',value.caption);
                            // const config = {
                            //     headers: {
                            //         'content-type': 'multipart/form-data'
                            //     }
                            // };
                            dispatch(addTimeline(formData,userName));
                            setValue({isOpen:false});
                            dispatch(fetchTimeline(userName));
                    }} disabled={value.isDisabled}>Post</Button>
                </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
