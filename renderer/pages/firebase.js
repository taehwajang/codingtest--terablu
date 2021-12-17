import { useState, useEffect } from "react"

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { getFirestore, collection, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBggmbr1rYd-2wO0gSKqFxg9QX5eOv5Big",
  authDomain: "project-test-7af73.firebaseapp.com",
  databaseURL: "https://project-test-7af73-default-rtdb.firebaseio.com",
  projectId: "project-test-7af73",
  storageBucket: "project-test-7af73.appspot.com",
  messagingSenderId: "831204101439",
  appId: "1:831204101439:web:8705c0b06ae0a4dc4cd78a"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const db = getFirestore(app);

export async function getData(collectionName){
  const querySnapshot = await getDocs(collection(db, collectionName));
  let userArr = [];
  querySnapshot.forEach((doc) => {
    let obj = {};
    obj.nickName = doc.data().nickname;
    obj.email = doc.data().email;
    obj.uid = doc.data().uid;
    userArr.push(obj);
  });
  return userArr;
}

export async function getChatRoom(collectionName){
  const querySnapshot = await getDocs(collection(db, collectionName));
  let userArr = [];
  querySnapshot.forEach((doc) => {
    let obj = {};
    obj.sender = doc.data().sender;
    obj.content = doc.data().content;
    userArr.push(obj);
  });
  return userArr;
}
export async function setChatRoom(sender, recipient){
  const senderN = await getDocs(collection(db, 'userlist'));
  let newMembers = [];
  await senderN.forEach((doc) => {
    if(sender === doc.data().uid || recipient === doc.data().uid){
      newMembers.push(doc.data().nickname);
    }
  })
  await updateDoc(doc(db, "userlist", sender), {
    group: `${sender}${recipient}`
  })
  await updateDoc(doc(db, "userlist", recipient), {
    group: `${sender}${recipient}`
  })
  await setDoc(doc(db, "chat", `${sender}${recipient}`), {
    members: newMembers
  });
}

export async function sendMsg(sender, recipient, content){
  await setDoc(doc(db, "chat", `${sender}${recipient}`), {
    recipient,
    content
  });
}

export async function userlistAdd(email, nickname, uid){
  await setDoc(doc(db, "userlist", uid), {
    email,
    nickname,
    uid,
    group: ''
  });
}
export async function signup(email, password, nickname){
  await createUserWithEmailAndPassword(auth, email, password);
  await userlistAdd(email, nickname, getAuth().currentUser.uid);
  return;
}
export function login(email, password){
  return signInWithEmailAndPassword(auth, email, password)
}
export function logout(){
  return signOut(auth);
}
export function useAuth(){
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
   const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
   return unsub;
  }, [])
  return currentUser;
}
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);
try{
  await updateProfile(currentUser, {photoURL});
}catch(e){
  console.log(e);
}
  setLoading(false);
  alert("Uploaded file!");
}
