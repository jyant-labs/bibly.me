import React from 'react'
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';

function TextCard({id, details}) {
    const [{userPage}, dispatch] = useStateValue();

    return (
        <div id="hover" style={{wordWrap:'break-word', width:'90%', backgroundColor:userPage.cardColor, padding:10, borderRadius:5, margin:'auto', boxShadow:'rgb(0 0 0 / 8%) 0px 4px 8px 0px', marginTop:5, marginBottom:5}}>
            <h3 style={{color:userPage.textColor}}>{details.title}</h3>
            <p style={{color:userPage.textColor}}>
                {details.content}
            </p>
        </div>
    )
}

export default TextCard
