import React,{ useRef, useState } from 'react';
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
import { signup, useAuth} from "./firebase";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(4),
    },
  })
);

function Home() {
  const classes = useStyles({});
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleClick = () => setOpen(true);
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  console.log(currentUser, '????');
  async function handleSignup(){
    setLoading(true);
    try{
    await signup(emailRef.current.value, passwordRef.current.value);
  } catch{
    alert("error!");
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
            {currentUser != undefined ? <div>Currently logged in as : {currentUser.email}</div> : null}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div>
              <input ref ={emailRef} type="text" placeholder="Email"/>
              <input ref ={passwordRef} type="password" placeholder="password"/>
              <Button disabled={ loading || currentUser != null } onClick={handleSignup}>Sign Up</Button>
              {/* <Button onClick={handleLogout}>Log Out</Button> */}
              <Button variant="contained" color="secondary" onClick={handleClick}>
                로그인
              </Button>
              <Button variant="contained"  onClick={handleClick}><Link href="/next">회원가입하러가기</Link></Button>
              </div>
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
        <Typography variant="subtitle1" gutterBottom>
          <ul style={{ listStyle: "none" }}>
          <b style ={{ fontSize:"25px"}}>
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
        </Typography>
        
        <img src="/images/jangtaehwa.jpg"  style={{width: "200px", height: "100%", borderRadius: "15px"}}/>
        <Typography gutterBottom>
          <Link href="/next">회원가입하러가기</Link>
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleClick}>
          로그인
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Home;
