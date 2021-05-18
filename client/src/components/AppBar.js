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
import {whichCompWillRender} from '../actions/index'

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

export default function MenuAppBar() {
  const classes = useStyles();
  const [isOpen,setIsOpen]=React.useState(false);
  const [state,setState]=React.useState({
      nameOfPage:"Home",
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const userName=useSelector(state=>state.signUpReducer.userName)
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(whichCompWillRender(state.nameOfPage))
  });

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const list = () => (
    <div
      role="presentation"
      onClick={()=>setIsOpen(false)}
      onKeyDown={()=>setIsOpen(false)}
      className={classes.drawer}

    >
      <div>
          <div className={classes.profilePic}>
            profile pic
          </div>
          <div style={{display:'flex',flexDirection:'column' ,alignItems:'center'}}>
            <h1 className="font">{userName}</h1>
            <Badge badgeContent={4} color="primary">
              <div style={{padding:"1%"}}> friends </div>
            </Badge>
            <Badge badgeContent={4} color='primary'>
              <div>friend reguest</div>
            </Badge>
          </div>
      </div>
      <List >
        <ListItem button  onClick={()=>{setState({nameOfPage:"Home"})}} >
            <ListItemIcon><HomeIcon/></ListItemIcon>
            <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={()=>{setState({nameOfPage:"Profile"})}} >
            <ListItemIcon><ProfileIcon/></ListItemIcon>
            <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={()=>{setState({nameOfPage:"Chat"})}} >
            <ListItemIcon><ChatIcon/></ListItemIcon>
            <ListItemText primary="Chat" />
        </ListItem>
        <ListItem button onClick={()=>{setState({nameOfPage:"Friends"})}} >
            <ListItemIcon><FriendIcon/></ListItemIcon>
            <ListItemText primary="friends" />
        </ListItem>
        <ListItem button onClick={()=>{setState({nameOfPage:"Add Friends"})}} >
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
  
  return (
    <Router>
      <div className={classes.root}>
      <AppBar position="absolute">
        <Toolbar>
          <IconButton onClick={()=>setIsOpen(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {state.nameOfPage}
          </Typography>
            <div>
            <IconButton >
                <Badge badgeContent={4} color="secondary">
                    <NotetifIcon fontSize="small"/>
                </Badge>
            </IconButton>
            <IconButton>
                <Badge badgeContent={4} color="secondary">
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
      <Route exact path="/login" component={Login}/>
    </Router>
  );
}