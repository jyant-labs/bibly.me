import React, { useEffect, useState } from 'react'
import InnerHTML from 'dangerously-set-html-content'
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';

function HTMLBlockCard({id,details}) {
    const [renderedHTML, setRenderedHTML] = useState();
    const [{userPage, isDrawerOpen}, dispatch] = useStateValue();

    useEffect(() => {
        var iframeContainer = document.createElement("div")
        if(details.content.includes('iframe')) {
            iframeContainer.innerHTML = details.content
            iframeContainer.children[0].width = 'auto'
            iframeContainer.children[0].height = 'auto'
            setRenderedHTML(iframeContainer.children[0].outerHTML)
        } else {
            setRenderedHTML(details.content)
        }
        
    }, [])
 
    return (
        <div id="hover" id="container" style={{width:'90%', display:'flex', flexDirection:'column', backgroundColor:userPage.cardColor, padding:10, borderRadius:5, margin:'auto', boxShadow:'rgb(0 0 0 / 8%) 0px 4px 8px 0px', marginTop:5, marginBottom:5, alignItems:'center'}}>
            <InnerHTML html={renderedHTML}></InnerHTML>
        </div>
    )
}

export default HTMLBlockCard
