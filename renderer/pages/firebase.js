import { useState, useEffect } from "react"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBggmbr1rYd-2wO0gSKqFxg9QX5eOv5Big",
  authDomain: "project-test-7af73.firebaseapp.com",
  projectId: "project-test-7af73",
  storageBucket: "project-test-7af73.appspot.com",
  messagingSenderId: "831204101439",
  appId: "1:831204101439:web:8705c0b06ae0a4dc4cd78a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

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