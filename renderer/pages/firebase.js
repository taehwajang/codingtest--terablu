import { useState, useEffect } from "react"

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBggmbr1rYd-2wO0gSKqFxg9QX5eOv5Big",
  authDomain: "project-test-7af73.firebaseapp.com",
  projectId: "project-test-7af73",
  storageBucket: "project-test-7af73.appspot.com",
  messagingSenderId: "831204101439",
  appId: "1:831204101439:web:8705c0b06ae0a4dc4cd78a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();

export function signup(email, password){
  return createUserWithEmailAndPassword(auth, email, password)
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
export async function upload(file, currentUser, setLoading){
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);

  const snapshot= await uploadBytes(fileRef, file);

  const photoURL = await getDownloadURL(fileRef);
  updateProfile(currentUser, {photoURL});

  setLoading(false);
  alert("uploaded file!");
}


