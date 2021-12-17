import React ,{ useState, useEffect}from 'react';
import Head from 'next/head';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';
import { useAuth,  } from "./firebase";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(4),
    },
  })
);

function Chatting() {
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
  const currentUser = useAuth();
  const classes = useStyles({});



  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
}, [currentUser])

  return (
    <React.Fragment>
    <Head>
      <title>chatting - Nextron </title>
    </Head>
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        <b>채팅하기</b>
      </Typography>
      {currentUser != undefined ? <div>환영합니다.{currentUser.email}님  <br />      
      <img src={photoURL} 
            alt="Avatar" 
            style={{ verticalAlign:"middle", width:"80px", height:"80px", borderRadius:"50%", borderWidth:"5px", borderColor:"gray", borderStyle:"outset"}}
            /></div> : null }
      <Typography gutterBottom>
        <Link href="/home">Go to the home page</Link>
      </Typography>
      
      
    </div>
  </React.Fragment>
  );
};

export default Chatting;
