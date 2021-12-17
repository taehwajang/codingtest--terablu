import React ,{ useState, useEffect  }from 'react';
import Head from 'next/head';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';
import { useAuth, getData  } from "./firebase";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(4),
    },
  })
);

function FriendsList() {
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
  const currentUser = useAuth();
  const classes = useStyles({});
  const [userArr, setUser] = useState([]);


  useEffect(async () => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
    if(currentUser != undefined){
      let newArr = await getData('userlist');
       await setUser([...newArr]);
    }
}, [currentUser])
  return (
    <React.Fragment>
    <Head>
      <title>friendsList - Nextron </title>
    </Head>
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        <b>친구 목록</b>
      </Typography>
        <div>환영합니다.</div> 

        {currentUser != undefined ? userArr.map((user, index) => user.email === currentUser.email ? null : (
            <p>{index + 1} {user.nickName} <Link href={`/chat/${user.uid}`}><a><button>Chat</button></a></Link></p>
          )) : null}
      
      <Typography gutterBottom>
        <Link href="/home">Go to the home page</Link>
      </Typography>
      
      
    </div>
  </React.Fragment>
  );
};

export default FriendsList;
