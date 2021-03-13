import React from 'react';
import { Html } from 'drei';

const InfoBubble = ({onClick, scaleFactor, sign}) => {

    return (
        <Html
            zIndexRange={[1, 0]}
            scaleFactor={scaleFactor ? scaleFactor : 20}
          >
            <p 
              onClick={onClick} 
              style={{transform:"translate(-10px, -40px)", width:"2em",height:"2em", padding:"5px",borderRadius:"50%", backgroundColor:sign ? "gray" : "white", zIndex:"-3", color: sign ? "white" :"black", fontWeight: sign ? "normal": "bold", fontFamily: !sign ? "system-ui": null}}
            >{sign ? sign : "!"}</p>
          </Html>
    )
}

export default InfoBubble