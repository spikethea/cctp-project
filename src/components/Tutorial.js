import React, {useEffect, useState, useRef} from 'react'
import {useSpring, animated} from 'react-spring';
import styles from './PopUp.module.css'


const Tutorial = () => {

    const [pressed, setPressed] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
  
    const props = useSpring({opacity: pressed ? 0: 1, top: pressed ? "-200%": "50%"})
  
    const backgroundProps = useSpring({opacity: pressed ? 0: 1})

    const inner = useRef();

    useEffect(() => {
      if (inner.current) {
        
        console.log(pages[currentPage].image)
        inner.current.scrollTo(0, 0);
      }
    }, [currentPage])

    const pages = [
      {
        title: "ServiceLearn Guide",
        image: {
          alt: "Cartoon image of Business man and woman - positive looking",
          src: "../assets/svg/publicdomainq-business-man-and-woman-positive-looking.svg"
        },
        description: [
          "Hi! Welcome to ServiceLearn, my names Angelica and I work in HR.",
          "If you have never used this training app before, I extremely recommended that you take this tutorial!",
          "This tutorial will take you through the basics of how to navigate and use this application. So dont miss it."
        ],
      },
      {
        title: "Nagivation",
        video: "../assets/video/tutorial/navigation.mp4",
        description: [
          "Welcome to the Venue. This is our home ground, where staff and customers alike come to the stadium, for shifts or entertainment.",
          "To navigate around this app, click the home button to select stages.",
          "On the homepage, select one of your unlocked stages to start learning.",
        ],
      },
      {
        title: "Stages and Levels",
        video: "./assets/video/tutorial/stages.mp4",
        description: [
          "When you select a stage, you also need to chose a level first, to choose the difficulty.",
          "The more difficult the level, the greater experience points you can receive.",
          "Completing levels will earn you experience points to level up, which will unlock further stages.",
        ],
      },
      {
        title: "InfoBoxes and Badges",
        video: "./assets/video/tutorial/stages.mp4",
        description: [
          "There are Information Boxes all over this App providing you with valuable information, which will help you complete Quizzes",
          "Badges are also unlockable content, which reward you for going the extra mile. Find these by being insightful.",
          "Once either is unlocked, it will be available in the Archive Page to recall details and practice.",
        ],
      },
      {
        title: "Quizzes and Tokens",
        video: "./assets/video/tutorial/stages.mp4",
        description: [
          "Quizzes are the end goal of this app. To complete and be reward with your certificate, you must complete all the quizzes!",
          "The Catch is, that you need tokens to attempt quizzes. Everytime you fail, you lose another token.",
          "The Only way you can earn new tokens, is by finding new infoboxes and badges, so be careful with your quiz choices.",
        ],
      },
    ]

    if (currentPage < pages.length) {
      return (
      <animated.div>
      <animated.div style={props} className={styles.container}>
      <div>
          <h1>{pages[currentPage].title}</h1>
          {pages[currentPage].video ? 
            <video loop autoPlay>
                <source src={pages[currentPage].video}/>
            </video>
          : null}
          {pages[currentPage].image ? <img style={{width:"50%"}} alt={pages[currentPage].image.alt} src={pages[currentPage].image.src}/> : null}
        </div>
        <div ref={inner} className={styles.inner}>
          <section>
            <h3>{pages[currentPage].description[0]}</h3>
            <h3>{pages[currentPage].description[1]}</h3>
            <h3>{pages[currentPage].description[2]}</h3>
            {currentPage === 0 ? <p>Scroll Down...</p>: null}
          </section>
          
          {currentPage === 0 ? 
            <div className={styles.buttonContainer}>
              <button onClick={() => setPressed(true)}>Close and Continue</button>
              <button onClick={() => setCurrentPage(currentPage + 1)}>Play Tutorial?</button>
            </div>
          :
            <div className={styles.buttonContainer}>
            <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            <button onClick={() => setCurrentPage(currentPage + 1)}>Next Page</button>
        </div>
      }
        </div>
      </animated.div>
      {!pressed ? <div style={backgroundProps} className="background"></div> : null}
      </animated.div>
    );
  } else 
  return (
      <animated.div>
      <animated.div style={props} className={styles.container}>
        <div>
          <h1>End of Tutorial</h1>
          <img src="../assets/svg/publicdomainq-business-man-and-woman-laughing.svg" alt="Cartoon image of two people laughing."/>
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

export default Tutorial