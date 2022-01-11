import React from 'react'
import Button from '@material-ui/core/Button';
import TwitterIcon from '@material-ui/icons/Twitter';

function TwitterBioCard({id, details}) {
    return (
        <div id="hover" style={{width:'90%', margin:'auto', boxShadow:'rgb(0 0 0 / 8%) 0px 4px 8px 0px', marginTop:5, marginBottom:5}}>
            <Button onClick={(e) => {
                e.preventDefault();
                window.open(`${details.url}`);
            }}
            style={{width:'100%', color:'white',background:'#00acee', fontSize:12.5}} variant="contained" startIcon={<TwitterIcon />}>@{details.username}</Button>
        </div>
    )
}

export default TwitterBioCard
