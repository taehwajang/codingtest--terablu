import React,{ useState, useRef } from 'react';
import Head from 'next/head';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';
import { signup, useAuth, logout} from "./firebase";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(4),
    },
  })
);

function Next() {
  const currentUser = useAuth();
  const [ loading, setLoading ] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const classes = useStyles({});

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }
  async function handleSignup() {
    setLoading(true);
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }
  
  return (
    <React.Fragment>
      <Head>
        <title>Next - Nextron </title>
      </Head>
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom>
          회원가입
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          <form action="">
          Email:<input ref ={emailRef} type="text" placeholder="Email"/><br/>
          Password:<input ref ={passwordRef} type="password" placeholder="Password"/><br/>
          </form>
        </Typography>
        <Typography gutterBottom>
          <Link href="/home">Go to the home page</Link>
        </Typography>
        <Button variant="contained" color="primary" onClick={handleSignup}>
          가입하기
        </Button>
        {currentUser != undefined ? <div>Currently logged in as : {currentUser.email}
            <Button variant="contained" color="secondary" disabled={ loading || !currentUser  } onClick={handleLogout}>Log Out</Button></div> : null}
      </div>
    </React.Fragment>
  );
};

export default Next;
