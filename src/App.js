import React, { Suspense, useRef, useState, useEffect } from 'react';
import './App.css';


//Packages
import {useSpring, animated} from 'react-spring';

import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';


//Components
import Header from './components/Header';
import UserInterface from './components/UserInterface';
import StageSelector from './components/StageSelector';
import Tutorial from './components/Tutorial';
import QuizTemplate from './components/QuizTemplate';
import LevelSelect from './components/LevelSelect';
import LevelEnd from './components/LevelEnd';

import LandingPage from './components/pages/LandingPage';

//Redux
import { showUserInterface, closeInfoBox, switchPage, clearNotifications, addPoints } from './components/redux/actions';


//Main App Function
function App() {

  const [app, setApp] = useState(false)
    
    return (
    <Router basename="/servicelearn">
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
          <BadgeNotification setApp={setApp} />
          <PointsNotification/>
          <Tutorial/>
          <QuizTemplate/>
          {/* <Question/> */}
          <LevelSelect/>
          <LevelEnd/>
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
  const points = state.activePoints;

  //Hooks
  const [displaying, setDisplaying] = useState(false);
  const props = useSpring({ config:{duration: 250}, delay:500, left: `${Math.floor(Math.random() * (85 - 10 + 1)) + 10}%`  , top: displaying ? "30%": "50%", opacity: displaying ? 1: 0})

  useEffect(()=> {
    console.log(state.points);
    if (state.activePoints) {
      setDisplaying(true);
    }
  }, [state.activePoints, state.points]) 

useEffect(()=> {
  if (displaying) {console.log("hide");
    let timer1 = setTimeout(()=> setDisplaying(false), 2500);
      return ()=> {
        console.log("clear")
        clearTimeout(timer1);
      }
  }
},[displaying])

    return (
      <animated.div style={props} className="badge-container">
        {displaying ?
        <>
          <h1 style={{color:"white"}}>+ {points}</h1>
        </>
        : null}
      </animated.div>
    )
}

const BadgeNotification = ({setApp}) => {
  //need to code it so that it detects when the badge element is pressed and switches to archive page.
  const info = useSelector(state => state.info);
  const dispatch = useDispatch();
  const [displaying, setDisplaying] = useState(false);

  const props = useSpring({ config:{duration: 250}, delay:500, top: displaying ? "20%": "40%", opacity: displaying ? 1 : 0})
  
  useEffect(()=> {
      if (info.activeBadge) {
        setDisplaying(true);
      }
  }, [info.activeBadge]) 

  useEffect(()=> {
    
    if (displaying) {console.log("hide");
      let timer1 = setTimeout(()=> setDisplaying(false), 2500);
        return ()=> {
          console.log("clear")
          clearTimeout(timer1);
        }
    }
  },[displaying, info.points])

  const handleClick = () => {
    setApp(true);
    dispatch(clearNotifications());
    dispatch(showUserInterface('SHOW_UI'));
    dispatch(switchPage(2));
  }


    return (
      <Link to="/training/archive">
      <animated.div style={props} onClick={handleClick} className="badge-container">
        {displaying ?
        <>
          <h3>New Badge!</h3>
          <img src={`/servicelearn/${info.activeBadge.image}`} alt="React Logo"/>
          <p>{info.activeBadge.title}</p>
        </>
        : null}
      </animated.div>
      </Link>
    )
}

const InfoBox = ({onClick}) => {

  const info = useSelector(state => state.info);
  const dispatch = useDispatch();

  const props = useSpring({delay:{duration:800}, config:{duration: 250}, top: info.displayingInfo ? "10%": "60%", opacity: info.displayingInfo ? 1: 0})

  let container = useRef();
  if (info.displayingInfo) {
    console.log(info.displayingInfo);
    return (
      <>
      <animated.div style={props} className="infobox" ref={container}>
        <h1>{info.activeBox.title}</h1>
        <img alt={info.activeBox.title} src={`/servicelearn/${info.activeBox.image}`}/>
        <section className="inner">
          <p>{info.activeBox.description}</p>
        </section>
        <button onClick={()=> dispatch(closeInfoBox())}>I Understand</button>
      </animated.div>
      <div className="background"></div>
      </>
    )
  } else return null
}

export default App;
