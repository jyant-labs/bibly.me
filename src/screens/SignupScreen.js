import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { auth, firestore } from "../firebase";
import axios from 'axios';

function SignupScreen() {
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [userURL, setUserURL] = useState("")
    const [userDescription, setUserDescription] = useState("")

    function signUpNewUser() {
    if(userURL != 'edit' && userURL != "authentication" && userURL != "" && userURL != " ") {
        firestore
        .collection("Users")
        .where("username","==", userURL)
        .get()
        .then(querySnapshot => {
            if(querySnapshot.size == 0) {
                    auth.createUserWithEmailAndPassword(userEmail, userPassword).then(authUser => {
                        authUser.user.updateProfile(
                            {
                                displayName:userURL
                            }
                        )
                        axios.get(`https://ui-avatars.com/api/?name=${userURL}size=512&bold=true&background=1e1e1e&color=ffffff`)
                        .then(res => {
                            console.log(res.config.url)
                          const initialImage = res.config.url;
                          firestore
                          .collection("Users")
                          .doc(authUser.user.uid)
                          .set({
                              username:userURL,
                              description:userDescription,
                              userPage: {
                                  'pageTitle':`${userURL} - Bibly.me`,
                                  'pageDescription':userDescription,
                                  'keywords':"",
                                  'cardColor':'#707070',
                                  'textColor':'#ffffff',
                                  'background':'#333333',
                                  'cards':{
                                    'card-1':{
                                      type:'ProfileCard',
                                      id:"card-1",
                                      details:{
                                          'name':userURL,
                                          'description':userDescription,
                                          'profilePicture':initialImage
                                      }
                                    }
                                  },
                                  'layout': {
                                    id: 'layout',
                                    cardsOrder: ['card-1'],
                                  }
                              }
                          })
                        })
                        .catch(error => console.log(error));
                        
                    })
                    .catch(e => alert(e.message))
            } else {
                alert("This URL has already been taken. Please try a different URL.")
            }
        })
    } else {
        alert("You've entered one of our exclusive links. Please try a different URL.")
    }
    }


    return (
        <div style={{backgroundColor:'white', borderRadius:5, width:'80%', maxWidth:350, padding:10, height:'fit-content', marginRight:'auto', marginLeft:'auto',}}>
            <TextField value={userEmail} onChange={(e) => setUserEmail(e.target.value)} style={{marginBottom:10}} fullWidth label="Email" variant="outlined" />
            <TextField type={'password'} value={userPassword} onChange={(e) => setUserPassword(e.target.value)} style={{marginBottom:10}} fullWidth label="Password" variant="outlined" />
            <TextField
                value={userURL} onChange={(e) => setUserURL(e.target.value)}
                InputProps={{
                    startAdornment: <InputAdornment position="start">bibly.me/</InputAdornment>,
                }} 
                style={{marginBottom:10}} fullWidth label="URL" variant="outlined" />
            <TextField onKeyPress={e => {if(e.key == "Enter") {signUpNewUser()}}} value={userDescription} onChange={(e) => setUserDescription(e.target.value)} style={{marginBottom:10}} fullWidth id="outlined-basic" label="Description" placeholder="Something about yourself..." variant="outlined" />
            <Button onClick={() => signUpNewUser()} style={{background:'#333333', color:'white', width:'100%'}}>
                <Typography>Sign up</Typography>
            </Button>
        </div>
    )
}

export default SignupScreen
