import React from 'react'
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
import PhoneIcon from '@material-ui/icons/Phone';import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function PhoneCard({id, details}) {
    return (
        <div id="hover" style={{width:'90%', margin:'auto', boxShadow:'rgb(0 0 0 / 8%) 0px 4px 8px 0px', marginTop:5, marginBottom:5}}>
            <Button onClick={(e) => {
                e.preventDefault();
                window.open(`tel:${details.number}`);
            }}
            style={{width:'100%', color:'white',background:'#32cd32', fontSize:12.5}} variant="contained" startIcon={<PhoneIcon />}>{details.number}</Button>
        </div>
    )
}

export default PhoneCard
