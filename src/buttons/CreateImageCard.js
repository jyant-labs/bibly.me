import Button from '@material-ui/core/Button';
import ImageIcon from '@material-ui/icons/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@material-ui/core/TextField';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import uuid from 'react-uuid';
import { auth, firestore, storage } from "../firebase";
import LinearProgress from '@material-ui/core/LinearProgress';

function CreateImageCard() {
    const [{userPage}, dispatch] = useStateValue();
    const [show, setShow] = useState(false);
    const [imageOption, setImageOption] = useState("online")
    const [imageDescription, setImageDescription] = useState("")
    const [onlineImage, setOnlineImage] = useState("")
    const [localImage, setLocalImage] = useState("")
    const [progress, setProgress] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (event) => {
        setImageOption(event.target.value);
    };

    const createImageCard = async(e) => {
        const uid = uuid();
        let localUserPage = userPage;

        if(imageOption == "online") {
            localUserPage.cards[uid] =
            {
                id:uid,
                type:'ImageCard',
                details:{
                    imageDescription: imageDescription,
                    imageURL:onlineImage
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
            setProgress(true)
            const rf = new FileReader();
            rf.readAsDataURL(localImage); 
            rf.onloadend = function (event) {
                const body = new FormData();
                body.append("image", event.target.result.split(",").pop()); //To delete 'data:image/png;base64,' otherwise imgbb won't process it.
                fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_API}`, {
                    method: "POST",
                    body: body
                })
                .then(res => {
                    res.json().then(r => {
                        setProgress(false)
                        localUserPage.cards[uid] =
                        {
                            id:uid,
                            type:'ImageCard',
                            details:{
                                imageDescription: imageDescription,
                                imageURL:r.data.display_url
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
                .catch(err => console.log(err));
            }
        }  
    }

    return (
        <>
        <Dialog centered open={show} onClose={handleClose}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Add an image
                <IconButton aria-label="close" style={{position:'absolute', right:5, top:5}} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <TextField value={imageDescription} onChange={(e) => setImageDescription(e.target.value)} style={{marginBottom:10}} fullWidth id="outlined-basic" label="Image description" variant="outlined" />
                <RadioGroup aria-label="imageOption" name="imageOption" value={imageOption} onChange={handleChange}>
                    <FormControlLabel value="online" control={<Radio />} label="Use online link" />
                    {imageOption == "online" ? 
                    (
                        <TextField value={onlineImage} onChange={(e) => setOnlineImage(e.target.value)} style={{marginBottom:10}} fullWidth id="outlined-basic" label="URL link" variant="outlined" />
                    ):(null)}
                    <FormControlLabel value="local" control={<Radio />} label="Upload local image" />
                    {imageOption == "local" ? 
                    (
                        <>
                        <input onChange={e => setLocalImage(e.target.files[0])} type="file"/>
                        {progress ?
                        (
                            <LinearProgress style={{marginTop:10}} />
                        ):(null)}
                        </>
                    ):(null)}
                </RadioGroup>
                
            </DialogContent>

            <DialogActions>
                <Button onClick={() => handleClose()}>Close</Button>
                <Button onClick={() => createImageCard()} style={{backgroundColor:'#4169e1', color:'white'}}>Add</Button>
            </DialogActions>
        </Dialog>
        <Button onClick={() => handleShow()} style={{marginBottom: 10, backgroundColor:'white', color:'black'}} variant="contained" startIcon={<ImageIcon />}>Image</Button>
        </>
    )
}

export default CreateImageCard
