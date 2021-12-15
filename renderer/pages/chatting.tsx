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

function Chatting() {
  const currentUser = useAuth();
  const classes = useStyles({});

  
  return (
    <React.Fragment>
    <Head>
      <title>chatting - Nextron </title>
    </Head>
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        <b>채팅하기</b>
      </Typography>
      {currentUser != undefined ? <div>환영합니다.{currentUser.email}님</div> : null}
      
      <Typography gutterBottom>
        <Link href="/home">Go to the home page</Link>
      </Typography>
      
      
    </div>
  </React.Fragment>
  );
};

export default Chatting;
