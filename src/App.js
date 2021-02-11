import React, { Suspense, useRef, useState} from 'react';
import './App.css';
import goodEye from './assets/svg/badges/goodEye.svg'
import Hospitality from './assets/images/hospitality'

//Packages
import {useSpring, animated} from 'react-spring';

import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';


//Components
import Header from './components/Header';
import UserInterface from './components/UserInterface';
import StageSelector from './components/StageSelector';
import Tutorial from './components/Tutorial';
import QuizTemplate from './components/QuizTemplate';
import LevelSelect from './components/LevelSelect';

//Redux
import { showUserInterface, closeInfoBox, hideBadge, switchPage } from './components/redux/actions';


//Main App Function
function App() {
  
  const [App, setApp] = useState(false);

  if (App) {
    console.log(App);
    return (
    
    <div className="App">
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Header />
        <Router>
          <UserInterface/>
        </Router>
        <InfoBox/>
        <BadgeNotification/>
        <Tutorial/>
        <QuizTemplate/>
        {/* <Question/> */}
        <LevelSelect/>
        <StageSelector/>
      </Suspense>
      
    </div>
  )} else return(
    <div className="landing-page">
      <header>
      <h1>ServiceLearn</h1>
      </header>
        <section className="intro">
          <div>
            <img alt="Hospitality Staff" src={Hospitality}/>
          </div>
          <div>
            <h2>A Interactive Staff Training system design for Hospitality staff, by Hospitality staff</h2>
            <button onClick={()=>setApp(true)}>Enter Training</button>
          </div>
        </section>
        <section className="explanation">
          <h2>Why use ServiceLearn</h2>
          <ul>
            <li>Teaches you wide variety of skills ready for work</li>
            <li>Designed to be an engaging experience </li>
            <li>Works cross-platform, on laptop, mobile or whiteboard etc.</li>
          </ul>
        </section>
        <section className="reviews">
          <h2>User Reviews</h2>
          <ul>
            <li>Teaches you wide variety of skills ready for work</li>
            <li>Designed to be an engaging experience </li>
            <li>Works cross-platform, on laptop, mobile or whiteboard etc.</li>
          </ul>
        </section>
        <footer>
          <p>UWE Bristol</p>
          <p>Made with ReactJS, Redux and react-three-fiber</p>
          <p>Developed by <a href="http://quincegorerodney.panel.uwe.ac.uk/portfolio/">Quince Gore-Rodney</a></p>
          <p>2020</p>
        </footer>
    </div>
  );
}

//UI

const BadgeNotification = () => {
  
  const info = useSelector(state => state.info);
  const dispatch = useDispatch();

  const props = useSpring({ config:{duration: 250}, delay:500, top: info.displayingBadge ? "20%": "40%", opacity: info.displayingBadge ? 1: 0})

  if (info.displayingBadge) {
    
    setTimeout(()=> dispatch(hideBadge()), 2000);
  }

  const handleClick = () => {
    dispatch(showUserInterface('SHOW_UI'));
    dispatch(switchPage(2));
  }


    return (
      <animated.div style={props} onClick={handleClick} className="badge-container">
        {info.displayingBadge ?
        <>
          <h3>New Badge!</h3>
          <img src={goodEye} alt="React Logo"/>
          <p>{info.activeBadge.title}</p>
        </>
        : null}
      </animated.div>
    )
}

const InfoBox = ({onClick}) => {

  const info = useSelector(state => state.info);
  const dispatch = useDispatch();

  const props = useSpring({delay:{duration:800}, config:{duration: 250}, top: info.displayingInfo ? "20%": "40%", opacity: info.displayingInfo ? 1: 0})

  let container = useRef();
  
  if (info.displayingInfo) {
    return (
      <>
      <animated.div style={props} className="infobox" ref={container}>
        <h1>{info.activeBox.title}</h1>
        <p>
          {info.activeBox.description}
        </p>
        <button onClick={()=> dispatch(closeInfoBox())}>Understand</button>
      </animated.div>
      <div className="background"></div>
      </>
    )
  } else return null
}

export default App;
