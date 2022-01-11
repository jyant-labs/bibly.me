import React from 'react'
import Button from '@material-ui/core/Button';
import { SiTiktok } from "react-icons/si";
import YoutubeIcon from '@material-ui/icons/YouTube';

function YoutubeBioCard({id, details}) {
    return (
        <div id="hover" style={{width:'90%', margin:'auto', boxShadow:'rgb(0 0 0 / 8%) 0px 4px 8px 0px', marginTop:5, marginBottom:5}}>
            <Button onClick={(e) => {
                e.preventDefault();
                window.open(`${details.url}`);
            }}
            style={{width:'100%', color:'white',background:'#FF0000', fontSize:12.5}} variant="contained" startIcon={<YoutubeIcon />}>@{details.username}</Button>
        </div>
    )
}

export default YoutubeBioCard
