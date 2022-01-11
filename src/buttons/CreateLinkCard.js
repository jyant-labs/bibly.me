import Button from '@material-ui/core/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
import { useState } from 'react';
import LinkIcon from '@material-ui/icons/Link';
import uuid from 'react-uuid';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { auth, firestore, storage } from "../firebase";
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react'

function CreateLinkCard() {
    const [{userPage, isDrawerOpen}, dispatch] = useStateValue();
    const [show, setShow] = useState(false);
    const [linkURL,setLinkURL] = useState("");
    const [linkTitle, setLinkTitle] = useState("");
    const [onlineImage, setOnlineImage] = useState("")
    const [localImage, setLocalImage] = useState("")
    const [imageOption, setImageOption] = useState("default")
    const [progress, setProgress] = useState(0);


    const handleChange = (event) => {
        setImageOption(event.target.value);
    };
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const createAutoLink = () => {
        const uid = uuid();
        let localUserPage = userPage;

        if(imageOption == "online") {
            localUserPage.cards[uid] =
            {
                id:uid,
                type:'AnyLinkCard',
                details:{
                    title: linkTitle,
                    url:linkURL,
                    image: onlineImage
                }
            }
            localUserPage.layout.cardsOrder.push(uid);
            dispatch({
                type: actionTypes.SET_USERPAGE,
                userPage: localUserPage
            })
            handleClose()
            dispatch({
                type: actionTypes.SET_ISDRAWEROPEN,
                isDrawerOpen: false
            }) 
        }

        if(imageOption == "default") {
            localUserPage.cards[uid] =
            {
                id:uid,
                type:'AnyLinkCard',
                details:{
                    title: linkTitle,
                    url:linkURL,
                    image: "default"
                }
            }
            localUserPage.layout.cardsOrder.push(uid);
            dispatch({
                type: actionTypes.SET_USERPAGE,
                userPage: localUserPage
            })
            handleClose()
            dispatch({
                type: actionTypes.SET_ISDRAWEROPEN,
                isDrawerOpen: false
            }) 
        }
        
        if(imageOption == "local") {
            const uploadTask = storage.ref(`/images/${uid}`).put(localImage)
            uploadTask.on('state_changed', 
            (snapShot) => {
              //takes a snap shot of the process as it is happening
            //   console.log(snapShot)
            setProgress((snapShot.bytesTransferred/snapShot.totalBytes)*100)
            }, (err) => {
              //catches the errors
              console.log(err)
            }, () => {
              // gets the functions from storage refences the image storage in firebase by the children
              // gets the download url then sets the image from firebase as the value for the imgUrl key:
              storage.ref('images').child(uid).getDownloadURL()
               .then(fireBaseUrl => {
                    localUserPage.cards[uid] =
                    {
                        id:uid,
                        type:'AnyLinkCard',
                        details:{
                            title: linkTitle,
                            url:linkURL,
                            image: fireBaseUrl
                        }
                    }
                localUserPage.layout.cardsOrder.push(uid);
                dispatch({
                    type: actionTypes.SET_USERPAGE,
                    userPage: localUserPage
                })
                handleClose()
                dispatch({
                    type: actionTypes.SET_ISDRAWEROPEN,
                    isDrawerOpen: false
                }) 
               })
            })  
        }
    }

    return (
        <>
        <Dialog centered open={show} onClose={handleClose}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Add a link
                <IconButton aria-label="close" style={{position:'absolute', right:5, top:5}} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <TextField valie={linkTitle} onChange={(e) => setLinkTitle(e.target.value)} style={{marginBottom:10}} fullWidth id="outlined-basic" label="Link title" variant="outlined" />
                <TextField value={linkURL} onChange={(e) => setLinkURL(e.target.value)} style={{marginBottom:10}} fullWidth id="outlined-basic" label="URL" variant="outlined" />
                <Typography>Thumbnail:</Typography>
                <RadioGroup aria-label="imageOption" name="imageOption" value={imageOption} onChange={handleChange}>
                    <FormControlLabel value="default" control={<Radio />} label="Use default thumbnail" />
                    <FormControlLabel value="online" control={<Radio />} label="Use online image" />
                    {imageOption == "online" ? 
                    (
                        <TextField value={onlineImage} onChange={(e) => setOnlineImage(e.target.value)} style={{marginBottom:10}} fullWidth id="outlined-basic" label="Image link" variant="outlined" />
                    ):(null)}
                    <FormControlLabel value="local" control={<Radio />} label="Upload local image" />
                    {imageOption == "local" ? 
                    (
                        <>
                        <input onChange={e => setLocalImage(e.target.files[0])} type="file"/>
                        <LinearProgress style={{marginTop:10}} variant="determinate" value={progress} />
                        </>
                    ):(null)}
                </RadioGroup>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => handleClose()}>Close</Button>
                <Button onClick={() => createAutoLink()} style={{backgroundColor:'#4169e1', color:'white'}}>Add</Button>
            </DialogActions>
        </Dialog>
        <Button onClick={() => handleShow()} style={{marginBottom: 10, backgroundColor:'white', color:'black'}} variant="contained" startIcon={<LinkIcon />}>Link</Button>
        </>
    )
}

export default CreateLinkCard
