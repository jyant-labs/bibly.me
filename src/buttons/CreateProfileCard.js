import Button from '@material-ui/core/Button';
import ImageIcon from '@material-ui/icons/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@material-ui/core/TextField';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
import { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PersonIcon from '@material-ui/icons/Person';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import uuid from 'react-uuid';
import { auth, firestore, storage } from "../firebase";
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react'

function CreateProfileCard() {
    const [{userPage}, dispatch] = useStateValue();
    const [show, setShow] = useState(false);
    const [imageOption, setImageOption] = useState("online")
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [onlineProfilePicture, setOnlineProfilePicture] = useState("")
    const [localImage, setLocalImage] = useState("")
    const [progress, setProgress] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (event) => {
        setImageOption(event.target.value);
    };

    const createProfileCard = () => {
        const uid = uuid();
        let localUserPage = userPage;

        if(imageOption == "online") {
            localUserPage.cards[uid] =
            {
                id:uid,
                type:'ProfileCard',
                details:{
                    name:name,
                    description:description,
                    profilePicture:onlineProfilePicture
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
        } else {
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
                    localUserPage.cards[uid] = {
                        id:uid,
                        type:'ProfileCard',
                        details:{
                            name:name,
                            description:description,
                            profilePicture:fireBaseUrl
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
                Add a profile section
                <IconButton aria-label="close" style={{position:'absolute', right:5, top:5}} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <TextField value={name} onChange={(e) => setName(e.target.value)} style={{marginBottom:10}} fullWidth id="outlined-basic" label="Name" variant="outlined" />
                <TextField value={description} onChange={(e) => setDescription(e.target.value)} style={{marginBottom:10}} fullWidth id="outlined-basic" label="About me" variant="outlined" />
                <Typography>Profile image:</Typography>
                <RadioGroup aria-label="imageOption" name="imageOption" value={imageOption} onChange={handleChange}>
                    <FormControlLabel value="online" control={<Radio />} label="Use online link" />
                    {imageOption == "online" ? 
                    (
                        <TextField value={onlineProfilePicture} onChange={(e) => setOnlineProfilePicture(e.target.value)} style={{marginBottom:10}} fullWidth id="outlined-basic" label="URL link" variant="outlined" />
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
                <Button onClick={() => createProfileCard()} style={{backgroundColor:'#4169e1', color:'white'}}>Add</Button>
            </DialogActions>
        </Dialog>
        <Button onClick={() => handleShow()} style={{marginBottom: 10, backgroundColor:'white', color:'black'}} variant="contained" startIcon={<PersonIcon />}>Profile</Button>
        </>
    )
}

export default CreateProfileCard
