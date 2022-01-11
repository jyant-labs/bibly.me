import React from 'react'
import { ReactTinyLink } from "react-tiny-link";
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
import LinkIcon from '@material-ui/icons/Link';

function AnyLinkCard({id, details}) {
  const [{userPage, isDrawerOpen}, dispatch] = useStateValue();

    if(details.image == "default") {
      return (
        <div id="hover" style={{width:'90%', backgroundColor:userPage.cardColor, padding:10, borderRadius:5, margin:'auto', boxShadow:'rgb(0 0 0 / 8%) 0px 4px 8px 0px', marginTop:5, marginBottom:5}}>
            <div onClick={(e) => {
                  e.preventDefault();
                  if (details.url.substring(0, 4) !== "http") {
                    details.url = 'http://' + details.url;
                    window.open(`${details.url}`);
                  } else {
                    window.open(`${details.url}`);
                  }
                }} style={{display:'flex', width:'100%'}}>
              <div style={{width:'25%', maxWidth:50, display:'flex'}}>
                <LinkIcon style={{color:userPage.textColor, margin:'auto'}}></LinkIcon>
              </div>
              <div style={{width:'75%',wordBreak: 'break-word', marginTop:'auto', marginBottom:'auto', marginLeft:10, paddingTop:10, paddingBottom:10}}>
                <h5 style={{margin:0, color:userPage.textColor}}>{details.title}</h5>
                {/* <div style={{display:'inline-block', width:'100%', textOverflow:'ellipsis', overflow:'hidden', whiteSpace:'nowrap'}}>
                  <p style={{margin:0, fontStyle:'italic', color:'grey'}}>{details.url}</p>
                </div> */}
              </div>
            </div>
        </div>
      )
    } else {
      return (
        <div id="hover" style={{width:'90%', backgroundColor:userPage.cardColor, padding:10, borderRadius:5, margin:'auto', boxShadow:'rgb(0 0 0 / 8%) 0px 4px 8px 0px', marginTop:5, marginBottom:5}}>
            {/* <ReactTinyLink
            style={{backgroundColor:'red'}}
            cardSize="small"
            showGraphic={true}
            maxLine={2}
            minLine={1}
            proxyUrl={'https://cors.bridged.cc'}
            url="https://loremipsum.io/"
            /> */}
            <div onClick={(e) => {
                  e.preventDefault();
                  if (details.url.substring(0, 4) !== "http") {
                    details.url = 'http://' + details.url;
                    window.open(`${details.url}`);
                  } else {
                    window.open(`${details.url}`);
                  }
                }} style={{display:'flex', width:'100%'}}>
              <div style={{width:'25%', maxWidth:50, display:'flex'}}>
                <img  style={{width:'100%', aspectRatio:'1/1', objectFit:'cover', marginRight:'auto', borderRadius:5}}src={details.image}></img>
              </div>
              <div style={{width:'75%',wordBreak: 'break-word', marginTop:'auto', marginBottom:'auto', marginLeft:10, paddingTop:10, paddingBottom:10}}>
                <h5 style={{margin:0, color:userPage.textColor}}>{details.title}</h5>
                {/* <div style={{display:'inline-block', width:'100%', textOverflow:'ellipsis', overflow:'hidden', whiteSpace:'nowrap'}}>
                  <p style={{margin:0, fontStyle:'italic', color:'grey'}}>{details.url}</p>
                </div> */}
              </div>
            </div>
        </div>
      )
    }

}

export default AnyLinkCard
