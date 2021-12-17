import React ,{ useState, useEffect  }from 'react';
import Head from 'next/head';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '../../components/Link';
import {useRouter} from 'next/router';

import { useAuth, getChatRoom, setChatRoom, sendMsg, getData  } from "../firebase";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(4),
    },
  })
);

function ChatRoom() {
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
  const currentUser = useAuth();
  const classes = useStyles({});
  const [userArr, setUser] = useState([]);
  const router = useRouter()
  const { recipient } = router.query;
  const [content, setCon] = useState('');

  useEffect(async () => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
    if(currentUser != undefined){
      let newArr = await getChatRoom('chat');
      let user = await getData('userlist');
      if(newArr.length == 0){
        await setChatRoom(currentUser.uid, recipient);
      }
      let filterArr =  await user.filter((item) => recipient == item.uid);
       await setUser([...filterArr]);
    }
}, [currentUser]);

  const sendMessage = () => {
    sendMsg(currentUser.uid, recipient, content);
  };

  return (
    <React.Fragment>
    <Head>
      <title>friendsList - Nextron </title>
    </Head>
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
      </Typography>
        <h3>{userArr.length === 0 ? null : userArr[0].nickName}님과의 채팅방</h3> 
      <div>
        <input type="text" onChange={(e) => setCon(e.target.value)} />
        <button onClick={sendMessage}>SEND</button>
      </div>
      <Typography gutterBottom>
        <Link href="/home">Go to the home page</Link>
      </Typography>
      
      
    </div>
  </React.Fragment>
  );
};

export default ChatRoom;
