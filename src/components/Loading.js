import React from 'react';
import { Html } from 'drei';

const Loading = () => {
    return (
        <Html center>
            <div style={{fontWeight:"bold", width: "10em", height:"10em", borderRadius:"10em", zIndex: "10", position:"fixed", backgroundColor:"black", display:"flex", justifyContent: "center", alignItems:"center"}}>
                <h2 style={{color:"white"}}>Loading...</h2>
            </div>
        </Html>
    )
}

export default Loading 