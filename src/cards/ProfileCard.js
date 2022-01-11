import React from 'react'
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';

function ProfileCard({id, details}) {
    const [{userPage}, dispatch] = useStateValue();

    return (
        <div id="hover" style={{wordWrap:'break-word', display:'flex', flexDirection:'column', width:'90%', backgroundColor:userPage.cardColor, padding:10, borderRadius:5, margin:'auto', boxShadow:'rgb(0 0 0 / 8%) 0px 4px 8px 0px', marginTop:5, marginBottom:5}}>
            <img src={details.profilePicture} style={{backgroundColor:'black', borderRadius:'100%', width:'50%', maxWidth:100, aspectRatio:'1/1', margin:'auto', objectFit:'cover', border:'1px solid lightgrey'}}></img>
            <h3 style={{textAlign:'center', color:userPage.textColor, margin:0,marginTop:10}}>{details.name}</h3>
            <p style={{textAlign:'center', color:userPage.textColor,margin:0}}>{details.description}</p>
        </div>
    )
}

export default ProfileCard
