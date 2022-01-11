import Button from '@material-ui/core/Button';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@material-ui/core/TextField';
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

function CreateTextCard() {
    const [{userPage, isDrawerOpen}, dispatch] = useStateValue();
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const createTextCard = () => {
        const uid = uuid();
        let localUserPage = userPage;
        localUserPage.cards[uid] =
        {
            id:uid,
            type:'TextCard',
            details:{
                title: title,
                content: content
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
                Add a paragraph
                <IconButton aria-label="close" style={{position:'absolute', right:5, top:5}} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <TextField value={title} onChange={(e) => setTitle(e.target.value)} style={{marginBottom:10}} fullWidth id="outlined-basic" label="Title" variant="outlined" />
                <TextField value={content} onChange={(e) => setContent(e.target.value)} fullWidth multiline rows={4} id="outlined-basic" label="Content" variant="outlined" />
            </DialogContent>

            <DialogActions>
                <Button onClick={() => handleClose()}>Close</Button>
                <Button onClick={() => createTextCard()} style={{backgroundColor:'#4169e1', color:'white'}}>Add</Button>
            </DialogActions>
        </Dialog>
        <Button onClick={() => handleShow()} style={{marginBottom: 10, backgroundColor:'white', color:'black'}} variant="contained" startIcon={<TextFieldsIcon />}>Text</Button>
        </>
    )
}

export default CreateTextCard
