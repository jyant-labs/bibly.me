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
import BrushIcon from '@material-ui/icons/Brush';
import { BlockPicker, ChromePicker, SwatchesPicker, TwitterPicker } from 'react-color';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import uuid from 'react-uuid';
import { auth, firestore, storage } from "../firebase";
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react'


function EditTheme() {
    const [{userPage}, dispatch] = useStateValue();
    const [show, setShow] = useState(false);
    const [backgroundOption, setBackgroundOption] = useState(userPage.background.includes("url") == false ? ('color'):(userPage.background.includes("firebasestorage") ? ('link'):('link')));
    const [backgroundColor, setBackgroundColor] = useState(userPage.background.includes("url") == true ? ('#a9a9a9'):(userPage.background))
    const [cardColor, setCardColor] = useState(userPage.cardColor)
    const [textColor, setTextColor] = useState(userPage.textColor)
    const [backgroundImage, setBackgroundImage] = useState("")
    const [progress, setProgress] = useState(false);
    const [onlineImage, setOnlineImage] = useState(userPage.background.includes("url") == false ? (''):(userPage.background.includes("firebasestorage") ? (userPage.background.substring(userPage.background.indexOf(`(`) + 2,userPage.background.indexOf(`)`) - 1)):(userPage.background.substring(userPage.background.indexOf(`(`) + 2,userPage.background.indexOf(`)`) - 1))))

    const handleBackgroundColorChangeComplete = (color) => {
        setBackgroundColor(color.hex);
    };
    const handleCardColorChangeComplete = (color) => {
        setCardColor(color.hex);
    };
    const handleTextColorChangeComplete = (color) => {
        setTextColor(color.hex);
    };

    const handleBackgroundOptionChange = (event) => {
        setBackgroundOption(event.target.value);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const updateTheme = () => {
        let localUserPage = userPage;

        if(backgroundOption == "color") {
            localUserPage.background = backgroundColor
            localUserPage.cardColor = cardColor;
            localUserPage.textColor = textColor;
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

        if(backgroundOption == "link") {
            localUserPage.background = `url("${onlineImage}")`
            localUserPage.cardColor = cardColor;
            localUserPage.textColor = textColor;
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

        if(backgroundOption == "image") {
            localUserPage.cardColor = cardColor;
            localUserPage.textColor = textColor;
            const uid = uuid();
            setProgress(true)
            const rf = new FileReader();
            rf.readAsDataURL(backgroundImage); 
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
                        localUserPage.background = `url("${r.data.display_url}")`
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
                Edit theme
                <IconButton aria-label="close" style={{position:'absolute', right:5, top:5}} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent style={{width:320}}>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>Background</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{display:'flex', flexDirection:'column'}}>
                        <RadioGroup aria-label="Background" name="Background" value={backgroundOption} onChange={handleBackgroundOptionChange}>
                            <FormControlLabel value="color" control={<Radio />} label="Color"/>
                            {backgroundOption == "color" ? 
                            (
                                <ChromePicker
                                    width="100%"
                                    color={backgroundColor}
                                    onChangeComplete={handleBackgroundColorChangeComplete}>
                                </ChromePicker>
                            )
                            :(
                                null
                            )}

                            <FormControlLabel value="link" control={<Radio />} label="Use online image"/>
                            {backgroundOption == "link" ? 
                            (
                                <TextField value={onlineImage} onChange={(e) => setOnlineImage(e.target.value)} style={{marginBottom:10}} fullWidth id="outlined-basic" label="URL link" variant="outlined" />
                            )
                            :(
                                null
                            )}

                            <FormControlLabel value="image" control={<Radio />} label="Upload local image" />
                            {backgroundOption == "image" ? 
                            (
                                <div style={{width:'100%'}}>
                                <input type="file" onChange={e => setBackgroundImage(e.target.files[0])}/>
                                {progress ?
                                (
                                    <LinearProgress style={{marginTop:10}} />
                                ):(null)}
                                </div>
                            )
                            :(
                                null
                            )}
                        </RadioGroup>
                        
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography>Card</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{display:'flex', flexDirection:'column'}}>
                        <Typography>Card color:</Typography>
                        <ChromePicker
                            width="100%"
                            color={cardColor}
                            onChangeComplete={handleCardColorChangeComplete}>
                        </ChromePicker>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography>Text</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{display:'flex', flexDirection:'column'}}>
                        <Typography>Text color:</Typography>
                        <ChromePicker
                            width="100%"
                            color={textColor}
                            onChangeComplete={handleTextColorChangeComplete}>
                        </ChromePicker>
                    </AccordionDetails>
                </Accordion>
                
            </DialogContent>

            <DialogActions>
                <Button onClick={() => handleClose()}>Close</Button>
                <Button onClick={() => updateTheme()} style={{backgroundColor:'#4169e1', color:'white'}}>UPDATE</Button>
            </DialogActions>
        </Dialog>
        <Button onClick={() => handleShow()} style={{marginBottom: 10, backgroundColor:'white', color:'black'}} variant="contained" startIcon={<BrushIcon />}>Theme</Button>
        </>
    )
}

export default EditTheme
