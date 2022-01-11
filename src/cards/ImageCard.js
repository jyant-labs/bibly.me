import React from 'react'
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';

function ImageCard({id, details}) {
    const [{userPage}, dispatch] = useStateValue();

    return (
        <div id="hover" style={{width:'90%', backgroundColor:userPage.cardColor, padding:10, borderRadius:5, margin:'auto', boxShadow:'rgb(0 0 0 / 8%) 0px 4px 8px 0px', marginTop:5, marginBottom:5}}>
            <h3 style={{marginBottom:5, color:userPage.textColor}}>{details.imageDescription}</h3>
            <img style={{width:'100%',height:'auto'}} src={details.imageURL}></img>
        </div>
    )
}

export default ImageCard
