import React, {useState} from 'react'
import {useSpring, animated} from 'react-spring';
import styles from './PopUp.module.css'


const Tutorial = () => {

    const [pressed, setPressed] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
  
    const props = useSpring({opacity: pressed ? 0: 1, top: pressed ? "-200%": "50%"})
  
    const backgroundProps = useSpring({opacity: pressed ? 0: 1})

    switch(currentPage){
        case 0:
          return (
            <animated.div>
            <animated.div style={props} className={styles.container}>
              <div>
                <h1>Guide to ServiceLearn</h1>
                <img style={{width:"50%"}} alt="Business man and woman - positive looking" src="../assets/svg/publicdomainq-business-man-and-woman-positive-looking.svg"/>
              </div>
              <div className={styles.inner}>
                <section>
                  <h3>If you have never used this training app before, it is extremely recommended that you take this tutorial</h3>
                  <h3>This tutorial will take you through the basics of how to navigate and use this application</h3>
                  <p>Scroll Down...</p>
                </section>
                
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
                  <video loop autoPlay>
                    <source src="./assets/video/tutorial/navigation.mp4"/>
                  </video>
                </div>
                <div className={styles.inner}>
                  <h3>To navigate around this app, click the home button to select stages.</h3>
                  <h3>On the homepage, select one of your unlocked stages to start learning.</h3>
                  <div className={styles.buttonContainer}>
                    <button onClick={() => setCurrentPage(currentPage + 1)}>Next Page</button>
                    <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                  </div>
                </div>
              </animated.div>
              <animated.div>
              {!pressed ? <div style={backgroundProps} className="background"></div> : null}
              </animated.div>
              </>
          );
          case 2:
            return (
              <>
                <animated.div style={props} className={styles.container}>
                  <div>
                    <h1>Stages and Levels</h1>
                    <video loop autoPlay>
                      <source src="./assets/video/tutorial/stages.mp4"/>
                    </video>
                  </div>
                  <div className={styles.inner}>
                    <h3>Inside a stage, you need to select a level to choose the difficulty.</h3>
                    <h3>Complete stages to complete tasks to earn rewards and points.</h3>
                    <div className={styles.buttonContainer}>
                    <button onClick={() => setCurrentPage(currentPage + 1)}>Next Page</button>
                    <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
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
                  <h3>For more information, click the ? indicators to get more information</h3>
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