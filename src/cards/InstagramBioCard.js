import React from 'react'
import Button from '@material-ui/core/Button';
import InstagramIcon from '@material-ui/icons/Instagram';

function InstagramBioCard({id, details}) {
    return (
        <div id="hover" style={{width:'90%', margin:'auto', boxShadow:'rgb(0 0 0 / 8%) 0px 4px 8px 0px', marginTop:5, marginBottom:5}}>
            <Button onClick={(e) => {
                e.preventDefault();
                window.open(`${details.url}`);
            }}
            style={{width:'100%', color:'white',background:'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)', fontSize:12.5}} variant="contained" startIcon={<InstagramIcon />}>@{details.username}</Button>
        </div>
    )
}

export default InstagramBioCard
