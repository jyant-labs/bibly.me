import React from 'react'
import EmailIcon from '@material-ui/icons/Email';import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@material-ui/core/Button';

function MailCard({id, details}) {

    return (
        <div id="hover" style={{width:'90%', margin:'auto', boxShadow:'rgb(0 0 0 / 8%) 0px 4px 8px 0px', marginTop:5, marginBottom:5}}>
            <Button onClick={(e) => {
                e.preventDefault();
                window.open(`mailto:${details.mail}`)
            }}
            style={{width:'100%', color:'white',background:'#ff9f00', fontSize:12.5}} variant="contained" startIcon={<EmailIcon />}>{details.mail}</Button>
        </div>
    )
}

export default MailCard
