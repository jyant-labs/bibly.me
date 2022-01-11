import React from 'react'
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
import { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { actionTypes } from '../reducer';
import uuid from 'react-uuid';
import YoutubeIcon from '@material-ui/icons/YouTube';

function CreateYoutubeCard() {
    const [{userPage, isDrawerOpen}, dispatch] = useStateValue();
    const [show, setShow] = useState(false);
    const [socialOption, setSocialOption] = useState('profile');
    const [profileUsername, setProfileUsername] = useState('');
    const [postUrl, setPostUrl] = useState('');

    const handleSocialOption = (event) => {
        setSocialOption(event.target.value);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const createYoutubeProfileCard = () => {
        const uid = uuid();
        let localUserPage = userPage;
        localUserPage.cards[uid] =
        {
            id:uid,
            type:'YoutubeBioCard',
            details:{
                username: profileUsername,
                url: "http://www.youtube.com/c/" + profileUsername
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

    const createYoutubePostCard = () => {
        const uid = uuid();
        let localUserPage = userPage;
        localUserPage.cards[uid] =
        {
            id:uid,
            type:'YoutubePostCard',
            details:{
                url: postUrl
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
    
    return (
        <>
        <Dialog centered open={show} onClose={handleClose}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Add Youtube handle
                <IconButton aria-label="close" style={{position:'absolute', right:5, top:5}} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                {/* <RadioGroup aria-label="Link" name="Link" value={socialOption} onChange={handleSocialOption}>
                        <FormControlLabel value="profile" control={<Radio />} label="Profile page"/>
                        <FormControlLabel value="post" control={<Radio />} label="Post" />
                </RadioGroup> */}
                    {socialOption == "profile" ? 
                    (
                        <TextField value={profileUsername} onChange={e => setProfileUsername(e.target.value)} style={{marginBottom:10}} fullWidth id="outlined-basic" label="Username" variant="outlined" />
                    )
                    :(
                        <TextField value={postUrl} onChange={(e) => setPostUrl(e.target.value)} style={{marginBottom:10}} fullWidth id="outlined-basic" label="Post URL" variant="outlined" />
                    )}
            </DialogContent>

            <DialogActions>
                <Button onClick={() => handleClose()}>Close</Button>
                <Button onClick={() => {socialOption == 'profile' ? (createYoutubeProfileCard()):(createYoutubePostCard())}} style={{backgroundColor:'#4169e1', color:'white'}}>Add</Button>
            </DialogActions>
        </Dialog>
        <Button onClick={() => handleShow()} style={{marginBottom: 10, backgroundColor:'#FF0000', color:'white'}} variant="contained" startIcon={<YoutubeIcon />}>Youtube</Button>
        </>
    )
}

export default CreateYoutubeCard
