import React from 'react';
import { Html } from 'drei';

const InfoBubble = ({onClick, scaleFactor, sign, color}) => {

    return (
        <Html
            zIndexRange={[1, 0]}
            scaleFactor={scaleFactor ? scaleFactor : 20}
          >
            <p 
              onClick={onClick} 
              style={{WebkitBoxShadow:"0px 5px 17px 0px rgba(0,0,0,0.25)", boxShadow: "0px 5px 17px 0px rgba(0,0,0,0.25)", transform:"translate(-10px, -40px)", width:"2em",height:"2em", padding:"5px",borderRadius:"50%", backgroundColor:color ? color : "white", zIndex:"-3", color: color ? "white" :"black", fontWeight: sign ? "normal": "bold", fontFamily: !sign ? "system-ui": null}}
            >{sign ? sign : "!"}</p>
          </Html>
    )
}

export default InfoBubble