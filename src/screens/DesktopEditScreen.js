import ProfileCard from '../cards/ProfileCard';
import AnyLinkCard from '../cards/AnyLinkCard';
import { ReactTinyLink } from "react-tiny-link";
import ImageCard from '../cards/ImageCard';
import TextCard from '../cards/TextCard';
import Button from '@material-ui/core/Button';
import YoutubeIcon from '@material-ui/icons/YouTube';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import SettingsIcon from '@material-ui/icons/Settings';
import EmailIcon from '@material-ui/icons/Email';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import InstagramBioCard from '../cards/InstagramBioCard';
import TikTokBioCard from '../cards/TikTokBioCard';
import DeleteIcon from '@material-ui/icons/Delete';
import reducer, {initialState} from "../reducer";
import {StateProvider} from "../StateProvider";
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
import CreateTextCard from '../buttons/CreateTextCard';
import CreateImageCard from '../buttons/CreateImageCard';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CreateLinkCard from '../buttons/CreateLinkCard';
import AddIcon from '@material-ui/icons/Add';
import EditTheme from '../buttons/EditTheme';
import CreateFacebookCard from '../buttons/CreateFacebookCard';
import CreateInstagramCard from '../buttons/CreateInstagramCard';
import FacebookBioCard from '../cards/FacebookBioCard';
import CreateTikTokCard from '../buttons/CreateTikTokCard';
import CreateHTMLBlock from '../buttons/CreateHTMLBlock';
import HTMLBlockCard from '../cards/HTMLBlockCard';
import InnerHTML from 'dangerously-set-html-content'
import CreateTwitterCard from '../buttons/CreateTwitterCard';
import TwitterBioCard from '../cards/TwitterBioCard';
import CreateYoutubeCard from '../buttons/CreateYoutubeCard';
import YoutubeBioCard from '../cards/YoutubeBioCard';
import './DesktopEditScreen.css'
import EditSEO from '../buttons/EditSEO';
import CreateProfileCard from '../buttons/CreateProfileCard';
import { auth, firestore } from "../firebase";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import CreateMailCard from '../buttons/CreateMailCard';
import MailCard from '../cards/MailCard';
import PhoneCard from '../cards/PhoneCard';
import CreatePhoneCard from '../buttons/CreatePhoneCard';
import logonotext from '../assets/logonotext.png'
import React from 'react'

function DesktopEditScreen() {
    const [forceRerender, setForceRerender] = useState(true);
    const [{userPage, isDrawerOpen, userInfo}, dispatch] = useStateValue();
    const [openAlert, setOpenAlert] = useState(false);
    const [isDataReady, setIsDataReady] = useState(false);

  let backgroundStyleNoImage = {
    width:'100%', display:'flex', backgroundColor: userPage.background, flex:1, flexDirection:'column'
  }

  let backgroundStyleWithImage = {
    width:'100%', display:'flex', backgroundImage: userPage.background, flex:1, flexDirection:'column', backgroundSize:'cover', backgroundRepeat:'no-repeat', backgroundPosition:'center'
  }

  const publishPage = () => {
    firestore
    .collection("Users")
    .doc(auth.currentUser.uid)
    .update({
      userPage: userPage
    })

    navigator.clipboard.writeText(`bibly.me/${userInfo.username}`)
    setOpenAlert(true)
  }

  useEffect(() => {
    firestore
    .collection("Users")
    .doc(auth.currentUser.uid)
    .get()
    .then(doc => {
      dispatch({
        type: actionTypes.SET_USERPAGE,
        userPage: doc.data().userPage
      })
      dispatch({
        type: actionTypes.SET_USERINFO,
        userInfo: doc.data()
      })
      setIsDataReady(true)
    })
  }, [])
  
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    

    var layout = userPage.layout;
    var newCardsOrder = Array.from(layout.cardsOrder);
    newCardsOrder.splice(source.index, 1);
    newCardsOrder.splice(destination.index, 0, draggableId);

    var newUserPage = userPage;
    newUserPage.layout.cardsOrder = newCardsOrder;
    dispatch({
      type: actionTypes.SET_USERPAGE,
      userPage: newUserPage
    })
  }

  const deleteCard = (index, id) => {
    var layout = userPage.layout;
    var newCardsOrder = Array.from(layout.cardsOrder);
    newCardsOrder.splice(index, 1);

    var newUserPage = userPage;
    newUserPage.layout.cardsOrder = newCardsOrder;
    delete newUserPage.cards[id]

    // setMockData(newMockData)
    dispatch({
      type: actionTypes.SET_USERPAGE,
      userPage: newUserPage
    })
    // setForceRerender(!forceRerender)
  }

  const renderDroppable = () => {
    return(
      <div>
        <Droppable droppableId={userPage.layout.id}>
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {userPage.layout.cardsOrder.map((card,index) => {
                return(
                  renderDraggable(card, index, userPage.cards[card])
                )
              })}
              {provided.placeholder}
              <div style={{display:'flex'}}>
                <Button style={{width:'90%', height:200, color:'white',backgroundColor:'rgba(255,255,255, 0.1)',padding:5, borderRadius:5, margin:'auto', boxShadow:'rgb(0 0 0 / 8%) 0px 4px 8px 0px', marginTop:5, marginBottom:5}} onClick={() =>
                dispatch({
                  type: actionTypes.SET_ISDRAWEROPEN,
                  isDrawerOpen: true
                })}>
                  <div style={{display:'flex', flexDirection:'column'}}>
                    <AddIcon style={{margin:'auto'}}></AddIcon>
                    <p>Click to add more cards / edit settings</p>
                  </div>
                  </Button>
              </div>
            </div>
          )}
        </Droppable>
      </div>
    )
  }

  const renderDraggable = (id, index, info) => {
    return(
      <Draggable key={id} draggableId={id} index={index}>
        {provided => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Button onClick={() => deleteCard(index, id)} style={{backgroundColor:'#ff0038', color:'white'}} variant="contained" startIcon={<DeleteIcon />}>Delete</Button>
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

            {/* {info.type == "InstagramPostCard" ? (<InstagramPostCard id={id} details={info.details}></InstagramPostCard>):(null)} */}
            {/* {info.type == "FacebookPostCard" ? (<FacebookPostCard id={id} details={info.details}></FacebookPostCard>):(null)} */}
            {/* {renderIframe()} */}
          </div>
        )}
      </Draggable>
    )
  }

  const renderIframe = (id, details) => {
    return(
      <div style={{width:'90%', display:'flex', flexDirection:'column', backgroundColor:'white', padding:10, borderRadius:5, margin:'auto', boxShadow:'rgb(0 0 0 / 8%) 0px 4px 8px 0px', marginTop:5, marginBottom:5, alignItems:'center'}}>
        <InnerHTML html={details.content}></InnerHTML>
      </div>
      
    )
  }

  if(isDataReady == true) {
    return (
      <div style={{display:'flex', flexDirection:'column', flex:1}}>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
        <MuiAlert elevation={6} variant="filled" onClose={(e) => {setOpenAlert(false)}} severity="success">
          Site is successfully published. Check it out now ! 
        </MuiAlert>
      </Snackbar>
        <div style={{display:'flex', position:'absolute', top:0, margin:0, width:'100%', justifyContent:'space-between', padding:10, borderBottom:'0.5px solid lightgrey'}}>
          <div style={{display:'flex', alignItems:'center'}}>
            <img style={{width:50, margin:"auto", objectFit:'contain'}} src={logonotext}></img>
            <Typography variant="h6" style={{color:'white', marginLeft:10, fontFamily:'headline'}}>
              Bibly.me
            </Typography>
          </div>
          
          
          <Button onClick={(e) => {e.preventDefault(); auth.signOut()}} style={{backgroundColor:'white', color:"#1e1e1e"}}>Log out</Button>
        </div>
      <div style={{display:'flex', flex:1, height:'100%', minHeight:'100vh'}}>
        <div style={userPage.background.includes("url") == true ? (backgroundStyleWithImage):(backgroundStyleNoImage)}>
          <div style={{display:'flex', maxWidth:350, width:'100%', marginRight:'auto', marginLeft:'auto', height:'fit-content', marginTop:65, justifyContent:'space-evenly'}}>
            <div id={"scroll"} style={{width:'70%', overflowX:'none', height:'fit-content', overflowX:'auto', scrollbarWidth:0, padding:10, backgroundColor:'rgba(0, 0, 0, 0.5)', borderRadius:5}}>
              <p style={{color:'#fafafa', marginBottom:0}}>bibly.me/{userInfo.username}</p>
            </div>
            <div style={{width:'25%'}}>
              <Button onClick={() => publishPage()} style={{maxWidth:'100%', backgroundColor:'white', height:'fit-content', padding:10}}>
                PUBLISH
              </Button>
            </div>
          </div>

          <div style={{backgroundColor:'rgba(0, 0, 0, 0.2)', maxWidth:400, width:'100%', marginRight:'auto', marginLeft:'auto', height:'fit-content', marginTop:10, paddingTop:10, paddingBottom:10}}>
            <p style={{color:'lightgray', textAlign:'center',margin:0, marginBottom:10}}>(Drag and drop to change a card's position)</p>
            <DragDropContext onDragEnd={onDragEnd}>
              <div>
                  {renderDroppable()}
              </div>
            </DragDropContext>
          </div>
        </div>

        <Drawer anchor={"left"} open={isDrawerOpen} onClose={() =>
        dispatch({
            type: actionTypes.SET_ISDRAWEROPEN,
            isDrawerOpen: false
        })}>
          <div style={{padding:20, width:'fit-content', height:'fit-content'}}>
            <h6 style={{marginBottom: 5}}>Add Social Media</h6>
            <div style={{display:'flex',flexDirection:'column', width:'fit-content'}}>
              <CreateInstagramCard></CreateInstagramCard>
              <CreateTikTokCard></CreateTikTokCard>
              <CreateYoutubeCard></CreateYoutubeCard>
              <CreateTwitterCard></CreateTwitterCard>
              <CreateFacebookCard></CreateFacebookCard>
            </div>
            <h6 style={{marginBottom: 5}}>Add Content</h6>
            <div style={{display:'flex',flexDirection:'column', width:'fit-content'}}>
              <CreateProfileCard></CreateProfileCard>
              <CreateLinkCard></CreateLinkCard>
              <CreateTextCard></CreateTextCard>
              <CreateImageCard></CreateImageCard>
              <CreateMailCard></CreateMailCard>
              <CreatePhoneCard></CreatePhoneCard>
              <CreateHTMLBlock></CreateHTMLBlock>
            </div>
            <h6 style={{marginBottom: 5}}>Settings</h6>
            <div style={{display:'flex',flexDirection:'column', width:'fit-content'}}>
              <EditTheme></EditTheme>
              <EditSEO></EditSEO>
              {/* <Button style={{marginBottom: 10, backgroundColor:'white', color:'black'}} variant="contained" startIcon={<EmailIcon />}>Newsletter</Button> */}
            </div>
          </div>
        </Drawer>
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

export default DesktopEditScreen
