import React, { Suspense, useRef, useState, useEffect } from 'react';
import './App.css';
import goodEye from './assets/svg/badges/goodEye.svg'

//Packages
import {useSpring, animated} from 'react-spring';

import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


//Components
import Header from './components/Header';
import UserInterface from './components/UserInterface';
import StageSelector from './components/StageSelector';
import Tutorial from './components/Tutorial';
import QuizTemplate from './components/QuizTemplate';
import LevelSelect from './components/LevelSelect';

import LandingPage from './components/pages/LandingPage';

//Redux
import { showUserInterface, closeInfoBox, hideBadge, switchPage } from './components/redux/actions';


//Main App Function
function App() {

  const [app, setApp] = useState(false)
    
    return (
    <Router>
    <Switch>
      <Route exact path="/">
        <LandingPage setApp={setApp}/>
      </Route>
      <Route path="/training">
        <div className="App">
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Header setApp={setApp} />
          <UserInterface setApp={setApp} app={app}/>
          <InfoBox/>
          <BadgeNotification/>
          <PointsNotification/>
          <Tutorial/>
          <QuizTemplate/>
          {/* <Question/> */}
          <LevelSelect/>
          <StageSelector/>
        </Suspense>
        </div>
      </Route>
    </Switch>

    
    
    </Router>
  );
}

//UI

const PointsNotification = () => {
  //Redux
  const state = useSelector(state => state.info);
  const points = state.points;
  const dispatch = useDispatch();

  //Hooks
  const [displaying, setDisplaying] = useState(false);
  const props = useSpring({ config:{duration: 250}, delay:500, left: "65%"  , top: displaying ? "30%": "50%", opacity: displaying ? 1: 0})

  useEffect(()=> {
    console.log("useEffect Points")
    if (!displaying) {
      setDisplaying(true);
      setTimeout(()=> setDisplaying(false), 1000);
    }
  }, [points]) 

    return (
      <animated.div style={props} className="badge-container">
        {displaying ?
        <>
          <h2 style={{color:"white"}}>+ {points}</h2>
        </>
        : null}
      </animated.div>
    )
}

const BadgeNotification = () => {
  
  const info = useSelector(state => state.info);
  const dispatch = useDispatch();
  const [displaying, setDisplaying] = useState(false);

  const props = useSpring({ config:{duration: 250}, delay:500, top: displaying ? "20%": "40%", opacity: displaying ? 1 : 0})

  useEffect(()=> {
    console.log("useEffect Badge")
    if (!displaying) {
      setDisplaying(true);
      setTimeout(()=> setDisplaying(false), 5000);
    }
  }, [info.activeBadge]) 

  const handleClick = () => {
    dispatch(showUserInterface('SHOW_UI'));
    dispatch(switchPage(2));
  }


    return (
      <animated.div style={props} onClick={handleClick} className="badge-container">
        {displaying ?
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
