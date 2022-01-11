import Button from '@material-ui/core/Button';
import PhoneIcon from '@material-ui/icons/Phone';import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
import { useState } from 'react';
import uuid from 'react-uuid';
import React from 'react'

function CreatePhoneCard() {
    const [phone, setPhone] = useState("");
    const [{userPage, isDrawerOpen}, dispatch] = useStateValue();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const createPhoneCard = () => {
        const uid = uuid();
        let localUserPage = userPage;
        localUserPage.cards[uid] =
        {
            id:uid,
            type:'PhoneCard',
            details:{
                number:phone
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
                Add a phone number (Please remember to add country code !)
                <IconButton aria-label="close" style={{position:'absolute', right:5, top:5}} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <TextField value={phone} onChange={(e) => setPhone(e.target.value)} style={{marginBottom:10}} fullWidth id="outlined-basic" label="Phone number" variant="outlined" />
            </DialogContent>

            <DialogActions>
                <Button onClick={() => handleClose()}>Close</Button>
                <Button onClick={() => createPhoneCard()} style={{backgroundColor:'#4169e1', color:'white'}}>Add</Button>
            </DialogActions>
        </Dialog>
        <Button onClick={() => handleShow()} style={{marginBottom: 10, backgroundColor:'white', color:'black'}} variant="contained" startIcon={<PhoneIcon />}>Phone</Button>
        </>
    )
}

export default CreatePhoneCard
