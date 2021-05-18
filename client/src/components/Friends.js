import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Grid,Typography,CardContent,Card,CardMedia,Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import Refrash from '@material-ui/icons/Refresh';
import {UserFriends} from '../actions/index'
import URL from './Env'
const useStyle=makeStyles({
    media: {
      height: 0,
      paddingTop: '56.25%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backgroundBlendMode: 'darken',
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
  });

export default function AddFriend() {
    const styles=useStyle();
    const userName=useSelector(state=>state.signUpReducer.userName);
    const userFriends=useSelector(state=>state.signUpReducer.friends);
    const dispatch=useDispatch();
    return (
        <div >
          <Button variant="contained" color="primary" onClick={()=>{dispatch(UserFriends(userName))}}><Refrash/></Button>
           <Grid  container alignItems="stretch" spacing={3}>
                {userFriends.length!==0?userFriends.map((user,index)=>(
                <Grid key={index} item xs={12} sm={3}>
                <Card className={styles.card}>
                    <CardMedia className={styles.media} image={`${URL}/${user[0].profilePic}`} />
                    <div className={styles.overlay}>
                        <Typography variant="h6">{user[0].userName}</Typography>
                    </div>
                    <div className={styles.details}>
                        <Typography variant="body2" color="textSecondary">email: {user[0].email}</Typography>
                    </div>
                    <CardContent>
                        <Typography  variant="body2" component="p">first Name :{user[0].firstName}</Typography>
                        <Typography  variant="body2" component="p">last Name  :{user[0].lastName}</Typography>
                        <Typography  variant="body2" component="p">gender     :{user[0].gender}</Typography>
                    </CardContent>
                </Card>
                </Grid>
            )):null}
        </Grid>
        </div>
    )
}
