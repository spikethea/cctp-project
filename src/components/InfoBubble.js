import React from 'react';
import { Html } from 'drei';

const InfoBubble = ({onClick, scaleFactor}) => {

    return (
        <Html
            zIndexRange={[1, 0]}
            scaleFactor={scaleFactor ? scaleFactor : 20}
          >
            <p 
              onClick={onClick} 
              style={{transform:"translate(-10px, -40px)", marginBottom:"1em",padding:"5px",borderRadius:"50%", backgroundColor:"white", width:"180%", zIndex:"-3", color:"black"}}
            >?</p>
          </Html>
    )
}

export default InfoBubble