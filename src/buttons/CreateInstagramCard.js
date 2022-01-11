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
import InstagramIcon from '@material-ui/icons/Instagram';
import { actionTypes } from '../reducer';
import uuid from 'react-uuid';
import React from 'react'

function CreateInstagramCard() {
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

    const createInstagramPostCard = () => {
        const uid = uuid();
        let localUserPage = userPage;
        localUserPage.cards[uid] =
        {
            id:uid,
            type:'InstagramPostCard',
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

    const createInstagramProfileCard = () => {
        const uid = uuid();
        let localUserPage = userPage;
        localUserPage.cards[uid] =
        {
            id:uid,
            type:'InstagramBioCard',
            details:{
                username: profileUsername,
                url: "http://www.instagram.com/" + profileUsername
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
                Add Instagram handle
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
                        <TextField value={profileUsername} onChange={e => setProfileUsername(e.target.value)} style={{marginBottom:10}} fullWidth id="outlined-basic" label="Page URL" variant="outlined" />
                    )
                    :(
                        <TextField value={postUrl} onChange={(e) => setPostUrl(e.target.value)} style={{marginBottom:10}} fullWidth id="outlined-basic" label="Post URL" variant="outlined" />
                    )}
            </DialogContent>

            <DialogActions>
                <Button onClick={() => handleClose()}>Close</Button>
                <Button onClick={() => {socialOption == 'profile' ? (createInstagramProfileCard()):(createInstagramPostCard())}} style={{backgroundColor:'#4169e1', color:'white'}}>Add</Button>
            </DialogActions>
        </Dialog>
        <Button onClick={() => handleShow()} style={{marginBottom: 10, color:'white',background:'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)'}} variant="contained" startIcon={<InstagramIcon />}>Instagram</Button>
        </>
    )
}

export default CreateInstagramCard
