import React from 'react'
import home from '../assets/home.png';
import logonotext from '../assets/logonotext.svg'
import { useMediaQuery } from 'react-responsive'
import Button from 'react-bootstrap/Button';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory
  } from "react-router-dom";

function HomeScreen() {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const history = useHistory()

    if(!isTabletOrMobile) {
        return (
            <div style={{flex:1, placeItems:'center', alignItems:'center',justifyContent:'center',display:'flex',backgroundColor:'#333333', height:'100%', minHeight:'100vh'}}>
                <div style={{display:'flex', flexDirection:'column',width:'50%', justifyContent:'center', alignItems:'center'}}>
                <img src={logonotext} style={{width:'fit-content', height:100, objectFit:'contain', marginBottom:20}}></img>

                    <h1 style={{fontFamily:'headline, Roboto', color:'white', textAlign:'center', fontSize:100, color:'white'}}>Bibly.me</h1>
                    <p style={{color:'lightgray', textAlign:'center', fontSize:25, fontStyle:'italic'}}>- Let people know about you -</p>
                    <Button onClick={() => history.push("/authenticate")} style={{fontWeight:'bold', marginRight:'auto', marginLeft:'auto', fontSize:30, backgroundColor:'white', color:'#333333', marginTop:10}} variant="primary">Try now</Button>
                    <p style={{color:'lightgray', textAlign:'center', fontSize:15, marginTop:5}}>Made with ❤️. Free now and will always be free to use ✨</p>
                </div>
                <div style={{width:'50%', display:'flex'}}>
                    <img style={{width:500, height:'100%', objectFit:'contain', margin:'auto'}} src={home}></img>
                </div>
            </div>
        )
    } else {
        return(
            <div style={{flex:1, placeItems:'center', alignItems:'center',justifyContent:'center',display:'flex',backgroundColor:'#333333', minHeight:'100%', height:'100vh', flexDirection:'column'}}>
                <img style={{width:'100%', height:'45%', objectFit:'contain', marginTop:10}} src={home}></img>
                <img src={logonotext} style={{width:'fit-content', height:100, objectFit:'contain', marginTop:50, marginBottom:20}}></img>
                <h1 style={{color:'white', textAlign:'center', fontSize:50, fontFamily:'headline, Roboto', color:'white'}}>Bibly.me</h1>
                <p style={{color:'lightgray', textAlign:'center', fontSize:20, fontStyle:'italic'}}>- Let people know about you -</p>
                <Button onClick={() => history.push("/authenticate")}s style={{fontWeight:'bold', marginRight:'auto', marginLeft:'auto', fontSize:20, backgroundColor:'white', color:'#333333', marginTop:10}} variant="primary">Try now</Button>
                <p style={{color:'lightgray', textAlign:'center', fontSize:15, marginTop:5}}>Made with ❤️. Free now and will always be free to use ✨</p>
            </div>
        )
    }
    
}

export default HomeScreen
