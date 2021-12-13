import Button from '@material-ui/core/Button';
import {useAuth, upload } from "./firebase"
import { useState, useEffect } from "react";

export default function Profile(){
    const currentUser = useAuth();
    const [photo, setPhoto]= useState(null);
    const [loading, setLoading]= useState(false);
    const [photoURL, setPhotoURL] = useState("https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=170667a&w=0&h=kEAA35Eaz8k8A3qAGkuY8OZxpfvn9653gDjQwDHZGPE=");
    function handleChange(e){
       if(e.target.files[0]){
           setPhoto(e.target.files[0])
       }
    }
    function handleClick(){
        upload(photo, currentUser, setLoading);
    }
    useEffect(() =>{
        if(currentUser?.photoURL){
            setPhotoURL(currentUser.photoURL);
        }
    },[currentUser])
    return (
        <div>
            <input type="file"  onChange={handleChange}/>
            <Button disabled={loading || !photo} 
            onClick={handleClick}>Upload</Button>
            <img src={photoURL} 
            alt="Avatar" 
            style={{ verticalAlign:"middle", width:"80px", height:"80px", borderRadius:"50%", borderWidth:"5px", borderColor:"gray", borderStyle:"outset"}}/>
        </div>

    )
}