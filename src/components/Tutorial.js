import React, {useEffect, useState, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useSpring, animated} from 'react-spring';
import styles from './PopUp.module.css'
import { toggleTutorial } from './redux/actions';


const pages = [
  {
    title: "Tutorial",
    image: {
      alt: "Cartoon image of Business man and woman - positive looking",
      src: "/assets/svg/publicdomainq-business-man-and-woman-positive-looking.svg"
    },
    description: [
      "Hi! Welcome to ServiceLearn, my names Angelica and I work in HR.",
      "If you have never used this training app before, I extremely recommended that you take this tutorial!",
      "This tutorial will take you through the basics of how to navigate and use this application. So don’t miss it."
    ],
  },
  {
    title: "Nagivation",
    video: "/assets/video/tutorial/navigation.mp4",
    description: [
      "Welcome to the Venue. This is our home ground, where staff and customers alike come to the stadium, for shifts or entertainment.",
      "To navigate around this app, click the home button to select stages.",
      "Select one of your unlocked stages to start learning.",
    ],
  },
  {
    title: "Stages and Levels",
    video: "./assets/video/tutorial/stages.mp4",
    description: [
      "When you select a stage, you also need to chose a level first, ranging in difficulty and reward.",
      "The more difficult the level, the greater experience points you can receive.",
      "Completing levels will earn you experience points to level up, which will unlock further stages.",
    ],
  },
  {
    title: "InfoBoxes and Badges",
    video: "./assets/video/tutorial/stages.mp4",
    description: [
      "There are Information Boxes all over this App providing you with valuable information, which will help you complete Quizzes",
      "Badges are also unlockable content, rewarding for going the extra mile. Find these by being insightful.",
      "Unlocked, they will be available in the Archive Page to recall details and practice.",
    ],
  },
  {
    title: "The Archive Page",
    video: "./assets/video/tutorial/stages.mp4",
    description: [
      "When you unlock new badges and infoboxes, they will be saved in the Archive Page",
      "The Archive page is most important part of ServiceLearn, as you can use it to remember more information",
      "Top Tip: Revise your information in the Archive Page, and then attempt Quizzes",
    ],
  },
  {
    title: "Quizzes and Tokens",
    video: "./assets/video/tutorial/stages.mp4",
    description: [
      "Quizzes are the end goal of this app. To complete Service and be reward with your certificate, you must complete all the Quizzes!",
      "The Catch is, that you need tokens to attempt quizzes. Everytime you fail, you lose another token.",
      "The Only way you can earn new tokens, is by finding new infoboxes and badges, so be careful with your quiz choices.",
    ],
  },
]

const Tutorial = () => {

    const state = useSelector(state => state.info)
    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(0);
  
    const props = useSpring({opacity: state.displayingTutorial ? 1: 0, top: state.displayingTutorial ? "50%": "-200%"})
  
    const backgroundProps = useSpring({opacity: state.displayingTutorial ? 1: 0})

    const inner = useRef();

    // Reset the scroll position to the top every time its updates ( next page )
    useEffect(() => {
      if (inner.current) {
        
        
        inner.current.scrollTo(0, 0);
      }
    }, [currentPage, pages])

    //Rest the page and scroll the infomration to the top when reopening the tutorial
    useEffect(()=>{
      setCurrentPage(0);
      if (inner.current) {
        inner.current.scrollTo(0, 0);
      }
      
    }, [state.displayingTutorial, setCurrentPage, pages])

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
              <button onClick={() => dispatch(toggleTutorial())}>Close and Continue</button>
              <button onClick={() => setCurrentPage(currentPage + 1)}>Play Tutorial</button>
            </div>
          :
            <div className={styles.buttonContainer}>
            <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            <button onClick={() => setCurrentPage(currentPage + 1)}>Next Page</button>
        </div>
      }
        </div>
      </animated.div>
      {state.displayingTutorial ? <div style={backgroundProps} className="tutorial-background"></div> : null}
      </animated.div>
    );
  } else 
  return (
      <animated.div>
      <animated.div style={props} className={styles.container}>
        <div>
          <h1>End of Tutorial</h1>
          <img src="../assets/svg/publicdomainq-business-man-and-woman-laughing.svg" alt="Cartoon of two people laughing."/>
        </div>
        <div className={styles.inner}>
          <h3>For more information, click the ? indicators to get extra tips and tricks.</h3>
          <div className={styles.buttonContainer}>
            <button onClick={() => dispatch(toggleTutorial())}>Close and Continue</button>
          </div>
        </div>
      </animated.div>
      {state.displayingTutorial ? <div style={backgroundProps} className="tutorial-background"></div> : null}
      </animated.div>
    );
  
    
  }

export default Tutorial