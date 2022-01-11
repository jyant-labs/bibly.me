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
import ShowChartIcon from '@material-ui/icons/ShowChart';
import React from 'react'

function EditSEO() {
    const [{userPage, isDrawerOpen}, dispatch] = useStateValue();
    const [show, setShow] = useState(false);
    const [pageTitle, setPageTitle] = useState(userPage.pageTitle);
    const [pageDescription, setPageDescription] = useState(userPage.pageDescription);
    const [keywords, setKeywords] = useState(userPage.keywords);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updateSEO = () => {
        let localUserPage = userPage;
        localUserPage.pageTitle = pageTitle;
        localUserPage.pageDescription = pageDescription;
        localUserPage.keywords = keywords;

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
                Edit SEO
                <IconButton aria-label="close" style={{position:'absolute', right:5, top:5}} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <TextField value={pageTitle} onChange={(e) => setPageTitle(e.target.value)} style={{marginBottom:10}} fullWidth id="outlined-basic" label="Page title" variant="outlined"/>
                <TextField value={pageDescription} onChange={(e) => setPageDescription(e.target.value)} style={{marginBottom:10}} fullWidth id="outlined-basic" label="Page description" variant="outlined" />
                <TextField value={keywords} onChange={(e) => setKeywords(e.target.value)} fullWidth multiline rows={4} id="outlined-basic" label="Keywords / tags" variant="outlined" placeholder="(use commas to separate each keyword)" />
            </DialogContent>

            <DialogActions>
                <Button onClick={() => handleClose()}>Close</Button>
                <Button onClick={() => updateSEO()} style={{backgroundColor:'#4169e1', color:'white'}}>Update</Button>
            </DialogActions>
        </Dialog>
        <Button onClick={() => handleShow()} style={{marginBottom: 10, backgroundColor:'white', color:'black'}} variant="contained" startIcon={<ShowChartIcon />}>SEO</Button>
        </>
    )
}

export default EditSEO
