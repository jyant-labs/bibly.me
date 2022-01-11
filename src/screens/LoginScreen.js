import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { auth } from '../firebase';
import firebase from 'firebase'

function LoginScreen() {
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    function loginUser() {
        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
            auth.signInWithEmailAndPassword(userEmail, userPassword).catch(e => alert(e.message))
        })
    }

    function forgotPassWord() {
        var forgotEmail = prompt("Please enter your email. We'll send a password reset link to this email:");

        if (forgotEmail != null) {
            auth.sendPasswordResetEmail(forgotEmail);
            alert('An email has been sent !')
        } 
    }
 
    return (
        <div style={{backgroundColor:'white', borderRadius:5, width:'80%', maxWidth:350, padding:10, height:'fit-content', marginRight:'auto', marginLeft:'auto', border:'1px solid lightgrey'}}>
            <TextField value={userEmail} onChange={(e) => setUserEmail(e.target.value)} style={{marginBottom:10}} fullWidth label="Email" variant="outlined" />
            <TextField onKeyPress={e => {if(e.key == "Enter") {loginUser()}}} type={'password'} value={userPassword} onChange={(e) => setUserPassword(e.target.value)} style={{marginBottom:10}} fullWidth label="Password" variant="outlined" />
            <Button onClick={(e) => {e.preventDefault();loginUser()}} style={{background:'#333333', color:'white', width:'100%'}}>
                <Typography>LOG IN</Typography>
            </Button>
            <Button onClick={() => forgotPassWord()} variant="text" fullWidth >
                Forgot your password ?
            </Button>
        </div>
    )
}

export default LoginScreen
