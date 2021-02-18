import React, {useState} from 'react'
import {useSpring, animated} from 'react-spring';
import styles from './Tutorial.module.css'


const Tutorial = () => {

    const [pressed, setPressed] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    console.log(currentPage);
  
    const props = useSpring({opacity: pressed ? 0: 1, top: pressed ? "100%": "15%"})
  
    const backgroundProps = useSpring({opacity: pressed ? 0: 1})

    switch(currentPage){
        case 0:
          return (
            <animated.div>
            <animated.div style={props} className={styles.container}>
              <div>
                <h1>Welcome to ServiceLearn</h1>
              </div>
              <div className={styles.inner}>
                <p>If you have never used this training app before, it is extremely recommended that you take this tutorial</p>
              <p>This tutorial will take you through the basics of how to nativate and use this application</p>
                <div className={styles.buttonContainer}>
                  <button onClick={() => setCurrentPage(currentPage + 1)}>Play Tutorial?</button>
                  <button onClick={() => setPressed(true)}>Close and Continue</button>
                </div>
              </div>
            </animated.div>
            {!pressed ? <div style={backgroundProps} className="background"></div> : null}
            </animated.div>
          );
          case 1:
          return (
            <>
              <animated.div style={props} className={styles.container}>
                <div>
                  <h1>Nagivation</h1>
                </div>
                <div className={styles.inner}>
                  <p>To navigate around this app, click the home button to select stages to complete tasks to earn rewards and points</p>
                  <div className={styles.buttonContainer}>
                    <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                    <button onClick={() => setCurrentPage(currentPage + 1)}>Next Page</button>
                  </div>
                </div>
              </animated.div>
              <animated.div>
              {!pressed ? <div style={backgroundProps} className="background"></div> : null}
              </animated.div>
              </>
          );
          default:
            return (
              <animated.div>
              <animated.div style={props} className={styles.container}>
                <div>
                  <h1>End of Tutorial</h1>
                </div>
                <div className={styles.inner}>
                  <p>For more information, click the ? indicators to get more information</p>
                  <div className={styles.buttonContainer}>
                    <button onClick={() => setPressed(true)}>Close and Continue</button>
                  </div>
                </div>
              </animated.div>
              {!pressed ? <div style={backgroundProps} className="background"></div> : null}
              </animated.div>
            );

    }
  
    
  }

export default Tutorial