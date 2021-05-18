import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {peopleYouMayKnow,AcceptFriendRequest,AskFriendRequest} from '../actions/index';
import {Button,Grid,Typography,CardContent,CardActions,Card,CardMedia} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Refrash from '@material-ui/icons/Refresh';
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
    const dispatch=useDispatch();
    const people_you_may_know=useSelector(state=>state.signUpReducer.people_you_may_know);
    const userName=useSelector(state=>state.signUpReducer.userName);
    // useEffect(()=>{
    //     dispatch(peopleYouMayKnow(userName));
    // });
    return (
        <div >
              <Button variant="contained" color="primary" onClick={()=>{dispatch(peopleYouMayKnow(userName));}}><Refrash/></Button>
            
            {
              <Grid  container alignItems="stretch" spacing={3}>
              {people_you_may_know.confirm?people_you_may_know.confirm.map((user,index)=>(
                      
                      <Grid key={index}  item xs={12} sm={3}>{console.log(user.profilePic)}
                      <Card className={styles.card} >
                          <CardMedia className={styles.media} image={`${URL}/${user.profilePic}`} />
                          <div className={styles.overlay}>
                              <Typography variant="h6">{user.userName}</Typography>
                          </div>
                          <div className={styles.details}>
                              <Typography variant="body2" color="textSecondary">email: {user.email}</Typography>
                          </div>
                          <CardContent>
                              <Typography  variant="body2" component="p">first Name :{user.firstName}</Typography>
                              <Typography  variant="body2" component="p">last Name  :{user.lastName}</Typography>
                              <Typography  variant="body2" component="p">gender     :{user.gender}</Typography>
                          </CardContent>
                          <CardActions className={styles.cardActions}>
                              <Button size="small" color="primary" onClick={()=>{dispatch(AcceptFriendRequest(userName,user.userName));dispatch(peopleYouMayKnow(userName));}}>
                                  <AddIcon fontSize="small"/>
                                  &nbsp; confirm &nbsp;
                              </Button>
                          </CardActions>
                      </Card>
                      </Grid>
                  )):null}
                  {people_you_may_know.add?people_you_may_know.add.map((user,index)=>(
                      <Grid  item xs={12} sm={3}>
                      <Card className={styles.card} key={index}>
                          <CardMedia className={styles.media} image="" title={user.firstName+" "+user.lastName}/>
                          <div className={styles.overlay}>
                              <Typography variant="h6">{user.userName}</Typography>
                          </div>
                          <div className={styles.details}>
                              <Typography variant="body2" color="textSecondary">email: {user.email}</Typography>
                          </div>
                          <CardContent>
                              <Typography  variant="body2" component="p">first Name :{user.firstName}</Typography>
                              <Typography  variant="body2" component="p">last Name  :{user.lastName}</Typography>
                              <Typography  variant="body2" component="p">gender     :{user.gender}</Typography>
                          </CardContent>
                          <CardActions className={styles.cardActions}>
                              <Button size="small" color="primary" onClick={()=>{dispatch(AskFriendRequest(userName,user.userName));dispatch(peopleYouMayKnow(userName));}}>
                                  <AddIcon fontSize="small"/>
                                  &nbsp; Add &nbsp;
                              </Button>
                          </CardActions>
                      </Card>
                      </Grid>
                  )):null}

              </Grid>
            }
            
        </div>
    )
}
