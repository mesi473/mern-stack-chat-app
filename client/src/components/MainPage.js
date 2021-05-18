import React,{useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from  '@material-ui/icons/AccountCircle';
import {Menu,MenuItem,IconButton,Typography
    ,Toolbar,Divider,ListItemText,ListItem,List,ListItemIcon,Drawer,Badge } from '@material-ui/core'
import NotetifIcon from '@material-ui/icons/NotificationsNone';
import ChatIcon from '@material-ui/icons/ChatBubbleOutline';
import PowerIcon from '@material-ui/icons/PowerSettingsNew';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import ProfileIcon from '@material-ui/icons/AccountCircleOutlined';
import FriendIcon from '@material-ui/icons/EmojiPeopleSharp';
import AddFriendIcon from '@material-ui/icons/AddCircleOutline';
import MessageIcon from '@material-ui/icons/MessageOutlined';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import Login from './Login';
import Home from './Home';
import AddFriend from './AddFriend';
import Friends from  './Friends';
import Chat from './Chat';
import Profile from './Profile';
import Search from './Search';
import Message from './Messages';
import {User,UserFriends,fetchTimeline,peopleYouMayKnow} from '../actions/index';
import URL from './Env'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  profilePic:{
    border:'1px solid black',
    width:"50px",
    height:"50px",
    position:'relative',
    left:'40%',
    top:'10px',
    borderRadius:100
  },
  drawer:{
    backgroundColor:"lightseagreen",
    height:'100%'
  }
}));

export default function MainPage() {
  const classes = useStyles();
  const [isOpen,setIsOpen]=React.useState(false);
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const userName=useSelector(state=>state.signUpReducer.userName);
  const user=useSelector(state=>state.signUpReducer.user);
  const userFriends=useSelector(state=>state.signUpReducer.friends);
  const people_you_may_know=useSelector(state=>state.signUpReducer.people_you_may_know);
  const dispatch=useDispatch();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [state,setState]=React.useState({
    nameOfPage:"Home",
  });
  const handleClose = () => {
    setAnchorEl(null);
  };
  const list = () => (
    <div
      role="presentation"
      onClick={()=>setIsOpen(false)}
      onKeyDown={()=>setIsOpen(false)}
      className={classes.drawer}
      style={{width:"250px"}}
    >
      <div>
          <div className={classes.profilePic}>
            <img src={`${URL}/${user.profilePic}`} alt="profile pic" style={{width:"100%",height:"100%",borderRadius:100}}/>
          </div>
          <div style={{display:'flex',flexDirection:'column' ,alignItems:'center'}}>
            <h1 className="font">{userName}</h1>
            <Badge badgeContent={userFriends?userFriends.length:0} color="primary">
              <div style={{padding:"1%"}}> friends </div>
            </Badge>
            <Badge badgeContent={people_you_may_know.confirm?people_you_may_know.confirm.length:0} color='primary'>
              <div>friend reguest</div>
            </Badge>
          </div>
      </div>
      <List >
        <ListItem button  onClick={()=>{setState({nameOfPage:"Home"});dispatch(fetchTimeline(userName));}} >
            <ListItemIcon><HomeIcon/></ListItemIcon>
            <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={()=>{setState({nameOfPage:"Profile"});dispatch(User(userName));}} >
            <ListItemIcon><ProfileIcon/></ListItemIcon>
            <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={()=>{setState({nameOfPage:"Chat"});}} >
            <ListItemIcon><ChatIcon/></ListItemIcon>
            <ListItemText primary="Chat" />
        </ListItem>
        <ListItem button onClick={()=>{setState({nameOfPage:"Friends"});dispatch(UserFriends(userName))}} >
            <ListItemIcon><FriendIcon/></ListItemIcon>
            <ListItemText primary="friends" />
        </ListItem>
        <ListItem button onClick={()=>{setState({nameOfPage:"Add Friends"});dispatch(peopleYouMayKnow(userName));}} >
            <ListItemIcon><AddFriendIcon/></ListItemIcon>
            <ListItemText primary="add friends" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={()=>{setState({nameOfPage:"Messages"})}} >
            <ListItemIcon><MessageIcon/></ListItemIcon>
            <ListItemText primary="messages" />
        </ListItem>
        <ListItem button onClick={()=>{setState({nameOfPage:"Search"})}} >
            <ListItemIcon><SearchIcon/></ListItemIcon>
            <ListItemText primary="search" />
        </ListItem>
      </List>
      <IconButton  onClick={()=>{setState({nameOfPage:"Log Out"})}} >
           <PowerIcon />
           <Typography>Log Out</Typography>
      </IconButton>
    </div>
  );
  useEffect(()=>{
    // dispatch(UserFriends(userName));
    // dispatch(User(userName));
  })
  return (
    <Router>
      <div className={classes.root}>
      <AppBar position="fixed" >
        <Toolbar>
          <IconButton onClick={()=>{setIsOpen(true);dispatch(User(userName));dispatch(UserFriends(userName));}} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {state.nameOfPage}
          </Typography>
            <div>
            <IconButton >
                <Badge badgeContent={userFriends?userFriends.length:0} color="secondary">
                    <NotetifIcon fontSize="small"/>
                </Badge>
            </IconButton>
            <IconButton>
                <Badge badgeContent={1} color="secondary">
                    <ChatIcon fontSize="small"/>
                </Badge>
            </IconButton>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',  
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={Boolean(isOpen)}  onClose={()=>{setIsOpen(false)}}>
            {list()}
      </Drawer>
    </div>
        <div style={{marginTop:"100px"}}>
            {state.nameOfPage==="Home"?<Home/>:state.nameOfPage==="Add Friends"?<AddFriend/>:state.nameOfPage==="Profile"?<Profile/>:
            state.nameOfPage==="Messages"?<Message/>:state.nameOfPage==="Search"?<Search/>:state.nameOfPage==="Chat"?<Chat/>:
            state.nameOfPage==="Friends"?<Friends/>:null}
        </div>
      <Route exact path="/login" component={Login}/>
    </Router>
  );
}
