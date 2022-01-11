import ProfileCard from '../cards/ProfileCard';
import AnyLinkCard from '../cards/AnyLinkCard';
import ImageCard from '../cards/ImageCard';
import TextCard from '../cards/TextCard';
import { useEffect, useState } from 'react';
import InstagramBioCard from '../cards/InstagramBioCard';
import TikTokBioCard from '../cards/TikTokBioCard';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
import FacebookBioCard from '../cards/FacebookBioCard';
import HTMLBlockCard from '../cards/HTMLBlockCard';
import TwitterBioCard from '../cards/TwitterBioCard';
import YoutubeBioCard from '../cards/YoutubeBioCard';
import './DesktopEditScreen.css'
import { firestore } from "../firebase";
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import logonotext from "../assets/logonotext.png"
import {Helmet} from "react-helmet";
import MailCard from '../cards/MailCard';
import PhoneCard from '../cards/PhoneCard';
import Popover from '@material-ui/core/Popover';
import { Snackbar, Typography } from '@material-ui/core';
import Button from 'react-bootstrap/Button';
import {IoIosCopy} from 'react-icons/io'
import React from 'react'

function ViewingScreen(props) {
    const [isShareVisible, setIsShareVisible] = useState(false);
    const [isDataReady, setIsDataReady] = useState(false);  
    const [{userPage, isDrawerOpen, userInfo}, dispatch] = useStateValue();
    const [anchorEl, setAnchorEl] = useState(null);
    const [openCopy, setOpenCopy] = useState(false)

  let backgroundStyleNoImage = {
    width:'100%', display:'flex', backgroundColor: userPage.background, flex:1, flexDirection:'column'
  }

  let backgroundStyleWithImage = {
    width:'100%', display:'flex', backgroundImage: userPage.background, flex:1, flexDirection:'column', backgroundSize:'cover', backgroundRepeat:'no-repeat', backgroundPosition:'center'
  }

  useEffect(() => {
    firestore
    .collection("Users")
    .where("username", "==", props.match.params.id)
    .get()
    .then(querySnapshot => {
      if(querySnapshot.empty == false) {
        querySnapshot.forEach((doc) => {
          dispatch({
            type: actionTypes.SET_USERPAGE,
            userPage: doc.data().userPage
          })
          setIsDataReady(true)
        });
      } else {
        alert('This site does not exist.')
      }  
    })
  }, [])

    const renderCard = (id, index, info) => {
        return(
              <div style={{marginTop:5, marginBottom:5}}>
                {info.type == "ProfileCard" ? (<ProfileCard id={id} details={info.details}></ProfileCard>):(null)}
                {info.type == "ImageCard" ? (<ImageCard id={id} details={info.details}></ImageCard>):(null)}
                {info.type == "TextCard" ? (<TextCard id={id} details={info.details}></TextCard>):(null)}
                {info.type == "InstagramBioCard" ? (<InstagramBioCard id={id} details={info.details}></InstagramBioCard>):(null)}
                {info.type == "FacebookBioCard" ? (<FacebookBioCard id={id} details={info.details}></FacebookBioCard>):(null)}
                {info.type == "AnyLinkCard" ? (<AnyLinkCard id={id} details={info.details}></AnyLinkCard>):(null)}
                {info.type == "TikTokBioCard" ? (<TikTokBioCard id={id} details={info.details}></TikTokBioCard>):(null)}
                {info.type == "HTMLBlockCard" ? (<HTMLBlockCard id={id} details={info.details}></HTMLBlockCard>):(null)}
                {info.type == "TwitterBioCard" ? (<TwitterBioCard id={id} details={info.details}></TwitterBioCard>):(null)}
                {info.type == "YoutubeBioCard" ? (<YoutubeBioCard id={id} details={info.details}></YoutubeBioCard>):(null)}
                {info.type == "MailCard" ? (<MailCard id={id} details={info.details}></MailCard>):(null)}
                {info.type == "PhoneCard" ? (<PhoneCard id={id} details={info.details}></PhoneCard>):(null)}

              </div>
        )
    }

  if(isDataReady == true) {
    return (
      <div style={{display:'flex', flexDirection:'column', flex:1}}>
        <Popover
        id={1}
        open={isShareVisible}
        anchorEl={anchorEl}
        onClose={() => setIsShareVisible(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        >
          <div style={{padding:10, display:'flex', flexDirection:'column'}}>
            <p style={{margin:0, marginBottom:5, color:'grey'}}>Copy this link:</p>
            <div style={{display:'flex', alignItems:'center'}}>
              <Typography style={{padding:5, borderRadius:5, border:'1px solid lightgrey', width:'fit-content', minWidth:200, height:'fit-content'}}>bibly.me/{props.match.params.id}</Typography>
              <IconButton onClick={() => {navigator.clipboard.writeText(`https://bibly.me/${props.match.params.id}`);setOpenCopy(true)}}>
                <IoIosCopy color={'#333333'} />
              </IconButton>
            </div>
            <Button onClick={() => {window.open("https://www.bibly.me")}} style={{marginTop:10, backgroundColor:'#333333'}} variant={'primary'}>Make your own</Button>
          </div>
        </Popover>
        <Snackbar
          open={openCopy}
          autoHideDuration={3000}
          onClose={() => setOpenCopy(false)}
          message="Link copied !"
        />
        <Helmet>
          <meta charSet="utf-8" />
          <title>{userPage.pageTitle}</title>
          <meta name="description" content={userPage.pageDescription}></meta>
          <meta name="keywords" content={userPage.keywords} />
        </Helmet>
        <div style={{display:'flex', flex:1, height:'100%', minHeight:'100vh'}}>
          <div style={userPage.background.includes("url") == true ? (backgroundStyleWithImage):(backgroundStyleNoImage)}>
            <div style={{ backgroundColor:'rgba(0, 0, 0, 0.4)',maxWidth:400, width:'100%', marginRight:'auto', marginLeft:'auto', height:'fit-content'}}>
              <IconButton onClick={(e) => {setAnchorEl(e.currentTarget);setIsShareVisible(true)}} aria-label="delete">
                <ShareIcon style={{color:'#ffffff'}}/>
              </IconButton>
            </div>
            <div style={{backgroundColor:'rgba(0, 0, 0, 0.4)', maxWidth:400, width:'100%', marginRight:'auto', marginLeft:'auto', height:'100%', paddingTop:0, paddingBottom:10}}>
              {userPage.layout.cardsOrder.map((card,index) => {
                  return(
                      renderCard(card, index, userPage.cards[card])
                  )
              })}
            </div>
              <div style={{ backgroundColor:'rgba(0, 0, 0, 0.4)',maxWidth:400, width:'100%', marginRight:'auto', marginLeft:'auto', height:'fit-content', display:'flex', flexDirection:'column', paddingBottom:10, alignItems:'center', justifyContent:'center'}}>
                <div onClick={() => {window.open("https://bibly.me")}} style={{width:'fit-content', display:'flex', flexDirection:'column', alignItems:'center', cursor:'pointer'}}>
                  <p style={{margin:0, textAlign:'center', color:'lightgray'}}>made with</p>
                  <img style={{width:50, margin:"auto", alignSelf:'center', objectFit:'contain'}} src={logonotext}></img>
                  <h1 style={{fontFamily:'headline', color:'white', textAlign:'center', fontSize:25, marginTop:10}}>bibly.me</h1>
                </div>
              </div>
          </div>
        </div>
      </div>
      )
  } else {
    return(
      <div style={{display:'flex', flex:1, height:'100%', minHeight:'100vh', backgroundColor:'#1e1e1e'}}>
        <div style={{display:'flex', flexDirection:'column', width:'fit-content', margin:'auto', alignItems:'center'}}>
          <CircularProgress style={{margin:'auto', color:'white'}} size={35} />
          <p style={{textAlign:'center', marginTop:10, color:'white', fontSize:'1.5em'}}>Loading...</p>
        </div>
      </div>
    )    
  }

}

export default ViewingScreen
