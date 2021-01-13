import React, {useState} from 'react'
import {useSpring, animated} from 'react-spring';
import styles from './Tutorial.module.css'


const Tutorial = () => {

    const [pressed, setPressed] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
  
    const props = useSpring({opacity: pressed ? 0: 1, top: pressed ? "100%": "15%"})
  
    const backgroundProps = useSpring({opacity: pressed ? 0: 1})

    switch(currentPage){
        case 1:
          return (
            <>
            <animated.div style={props} className={styles.container}>
              <h1>Welcome to MyHospitality</h1>
              <p>To navigate around this app, </p>
              <div className={styles.inner}>
                <button onClick={() => setCurrentPage(currentPage + 1)}>Next Page</button>
                <button onClick={() => setPressed(true)}>Close and Continue</button>
              </div>
            </animated.div>
            {!pressed? <animated.div style={backgroundProps} className="background"></animated.div>: null}
            </>
          );
          default:
            return (
              <>
              <animated.div style={props} className={styles.container}>
                <h1>Tutorial</h1>
                <p>If you have never used this training app before, it is extremely reccommended that you take this tutorial</p>
                <p>This tutorial will take you through the basics of how to nativate and use this application</p>
                <div className={styles.inner}>
                  <button onClick={() => setCurrentPage(currentPage + 1)}>Play Tutorial?</button>
                  <button onClick={() => setPressed(true)}>Close and Continue</button>
                </div>
              </animated.div>
              {!pressed? <animated.div style={backgroundProps} className="background"></animated.div>: null}
              </>
            );

    }
  
    
  }

export default Tutorial