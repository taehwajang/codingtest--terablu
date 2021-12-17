import React,{ useState, useEffect } from 'react';
import Head from 'next/head';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';
import {  useAuth, upload} from "./firebase";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(4),
    },
  })
);

function Avatar() {
  
  const currentUser = useAuth();
  const [ photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
  const classes = useStyles({});

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }
function handleClick() {
    upload(photo, currentUser, setLoading);
}
useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
}, [currentUser])

  return (
    <React.Fragment>
      <Head>
        <title>avatar - Nextron </title>
      </Head>
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom>
          프로필 만들기
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
        <div>
          <Input type="file"  onChange={handleChange}/><br />
          <Button disabled= { loading || !photo } 
          onClick={handleClick}>Upload</Button>
        <br />
          <img src={photoURL} 
          alt="Avatar" 
          style={{ verticalAlign:"middle", width:"80px", height:"80px", borderRadius:"50%", borderWidth:"5px", borderColor:"gray", borderStyle:"outset"}}/>
      </div>
        </Typography>
        <Typography gutterBottom>
          <Link href="/home">Go to the home page</Link>
        </Typography>
        
        
      </div>
    </React.Fragment>
  );
};

export default Avatar;
