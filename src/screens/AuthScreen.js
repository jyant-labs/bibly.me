import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import logonotext from '../assets/logonotext.svg'

function AuthScreen() {
    const [authOption, setAuthOption] = useState("login");

    return (
        <div style={{display:'flex', flex:1, backgroundColor:'#333333', width:'100%', height:'100%', minWidth:'100vw', minHeight:'100vh', flexDirection:'column'}}>
            <div style={{display:'flex', height:'fit-content', marginRight:'auto', marginLeft:'auto', marginTop:'auto'}}>
                <Button onClick={() => setAuthOption("login")} style={authOption == "login" ? ({color:'white', margin:'auto'}):({color:'lightgrey', margin:'auto'})}>
                    <Typography variant="p">Log in</Typography>
                </Button>
                <Typography style={{color:'white', margin:'auto'}}>|</Typography>
                <Button onClick={() => setAuthOption("signup")} style={authOption == "signup" ? ({color:'white', margin:'auto'}):({color:'lightgrey', margin:'auto'})}>
                    <Typography variant="p">Sign up</Typography>
                </Button>
            </div>
            {authOption == "login" ? 
            (
                <LoginScreen></LoginScreen>
            )
            :
            (
                <SignupScreen></SignupScreen>
            )}
            <div style={{display:'flex', flexDirection:'column', bottom:10, width:'100%', marginTop:'auto'}}>
                <img style={{width:50,  alignSelf:'center', margin:'auto'}} src={logonotext}></img>
                <h1 style={{color:'white', fontFamily:'headline', textAlign:'center', marginTop:10, fontSize:'2em'}}>Bibly.me</h1>
            </div>
        </div>
    )
}

export default AuthScreen
