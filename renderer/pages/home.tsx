import React,{ useRef, useState, useEffect } from 'react';
import { signup, login, logout, useAuth, getData } from "./firebase";
import Head from 'next/head';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(4),
    },
  })
);

function Home() {
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
  const classes = useStyles({});
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleClick = () => setOpen(true);
  const [ loading, setLoading ] = useState(false);
  const currentUser = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [userArr, setUser] = useState([]);

  useEffect(async () => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
    if(currentUser != undefined){
      let newArr = await getData('userlist');
      let filterArr = await newArr.filter((item) => currentUser.email !== item.email);
      await setUser([...filterArr]);
    }
}, [currentUser])
  async function handleSignup() {
    setLoading(true);
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }
  async function handleLogin() {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }
  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
      await setPhotoURL('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png');
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }
  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron</title>
      </Head>
      <div className={classes.root}>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>LOGIN
            {currentUser != undefined ? <div>Currently logged in as : {currentUser.email}
            <Button variant="contained" color="secondary" disabled={ loading || !currentUser  } onClick={handleLogout}>Log Out</Button></div> : null}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              { 
              !currentUser && <>
              Email:<input ref ={emailRef} type="text" placeholder="Email"/><br/>
              Password:<input ref ={passwordRef} type="password" placeholder="Password"/>
              <Button variant="contained" color="secondary"  disabled={ loading  } onClick={handleLogin}>Log In</Button>
              <div>
              <Button variant="contained"  onClick={handleClick}><Link href="/next">Sign Up</Link></Button>
              </div>
              </>
              }
              </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleClose}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Typography variant="h4" gutterBottom>
          <b>Coding Test</b>
        </Typography>
        {currentUser != undefined ? userArr.map((user, index) => (
            <p>{index + 1} {user.nickName} <Button variant="contained" color="secondary" >
              <Link href="/chatting" style={{color: "white"}}>Chatting</Link>
              </Button></p>
          )) : null}
        <Typography variant="subtitle1" gutterBottom>
          <ul style={{ listStyle: "none", width:"90%"}}>
          <b >
            Use Stack
          </b>
            <li>
            Typescript
            </li>
            <li>
              Nextron.js
            </li>
            <li>
              React
            </li>
            <li>
              Firebase
            </li>
            <li>
              Git
            </li>
          </ul>
          {currentUser != undefined ? currentUser.email :null}
        </Typography>
        
        
       { 
       !currentUser && 
       <div>
        <Button variant="contained" color="secondary" onClick={handleClick}>
          Log In
        </Button>
        <Button variant="contained" color="secondary">
          <Link href="/next" style={{color: "white"}}>Sign Up</Link>
          </Button>
       </div> 
        } 
        
        {currentUser != undefined ?
        <Typography variant="subtitle1" gutterBottom  style={{marginTop:"3px"}}>
          <img src={photoURL} 
            alt="Avatar" 
            style={{ verticalAlign:"middle", width:"80px", height:"80px", borderRadius:"50%", borderWidth:"5px", borderColor:"gray", borderStyle:"outset"}}
            />
            <Button><Link href="avatar">Profile</Link></Button>
          <Button variant="contained" color="secondary" disabled={ loading } onClick={handleLogout}>Log Out</Button><br />
          <Button variant="contained" color="secondary" disabled={ loading } onClick={handleLogout}>
            <Link href="/friendsList" style={{color: "white"}}>친구 목록</Link>
          </Button>
        </Typography> : null }
        
      </div>
      
    </React.Fragment>
  );
};

export default Home;
