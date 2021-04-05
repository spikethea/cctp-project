import React, { Suspense, useRef, useState, useEffect } from 'react';
import './App.css';


//Packages
import {useSpring, animated} from 'react-spring';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link, useLocation } from 'react-router-dom';
import useSound from 'use-sound';


//Components
import Header from './components/Header';
import UserInterface from './components/UserInterface';
import StageSelector from './components/StageSelector';
import Tutorial from './components/Tutorial';
import QuizTemplate from './components/QuizTemplate';
import LevelSelect from './components/LevelSelect';
import LevelEnd from './components/LevelEnd';
import LandingPage from './components/pages/LandingPage';
import Mute from './components/Mute';

//Redux
import { showUserInterface, closeInfoBox, switchPage, clearNotifications } from './components/redux/actions';

//Sounds
//import newInformation from './assets/audio/new-information.mp3';

//Main App Function
function App() {

  const [app, setApp] = useState(false);

  useEffect(()=> {
    
  },[])
  
    //Redux
    const state = useSelector(state => state.info)

    const stage = state.activeStage;
    const showUI = state.displayingUI;
    const muted = state.muted;

    //useSound
    const [ playStadium, { stop }] = useSound('../assets/audio/stadium.mp3', {volume: showUI ? 0.05 : 0.2});
  
    useEffect(()=> {
      console.log(showUI);
      if (muted) {
        console.log("stop");
        stop();
      } else {
        stop();
        playStadium();
      }

      if (stage !== 0 ) {
        stop();
      }

    },[muted, playStadium, stop, showUI])


    
    return (
    <Router >
    <Switch>
      <Route exact path="/">
        <LandingPage setApp={setApp}/>
      </Route>
      <Route path="/training">
        <div className="App">
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Header app={app} setApp={setApp} />
          <UserInterface setApp={setApp} app={app}/>
          <InfoBox/>
          <BadgeNotification app={app} setApp={setApp} />
          <PointsNotification app={app}/>
          <Tutorial/>
          <QuizTemplate setApp={setApp} app={app}/>
          <LevelSelect/>
          <LevelEnd/>
          <StageSelector/>
          <Mute/>
        </Suspense>
        </div>
      </Route>
    </Switch>

    
    
    </Router>
  );
}



//UI

const PointsNotification = ({app}) => {
  //Redux
  const state = useSelector(state => state.info);
  const points = state.activePoints;

  //Hooks
  const [displaying, setDisplaying] = useState(false);
  const props = useSpring({ config:{duration: 250}, delay:500, left: `${Math.floor(Math.random() * (85 - 10 + 1)) + 10}%`  , top: displaying ? "50%": "80%", opacity: displaying ? 1: 0})

  useEffect(()=> {
    console.log(state.points);
    if (state.activePoints && app) {
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
      <animated.div style={props} className="points">
        {displaying ?
        <>
          <h3 style={{color:"white"}}>+ {points}</h3>
        </>
        : null}
      </animated.div>
    )
}

const BadgeNotification = ({setApp, app}) => {

  //need to code it so that it detects when the badge element is pressed and switches to archive page.
  const state = useSelector(state => state.info);
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location.pathname);

  const [displaying, setDisplaying] = useState(false);

  const props = useSpring({ config:{duration: 250}, delay:500, top: displaying ? "20%": "40%", opacity: displaying ? 1 : 0})
  const [ play ] = useSound("/assets/audio/badge.mp3", {volume: 0.25});

  useEffect(()=> {
    console.log(state.activeBadge);
      if (state.activeBadge && app) {
        if (!state.badges[state.activeBadge].isAcheived) {// Check that the badge hasnt been acheived already (because of redux-persist rehydrate)
          setDisplaying(true);
        }
          
        
        
      }
  }, [state.activeBadge]) 

  useEffect(()=> {
    
    if (displaying) {
      if (!state.muted) {
        play();
      }
      
      console.log("hide");
      let timer1 = setTimeout(()=> setDisplaying(false), 2500);
        return ()=> {
          console.log("clear")
          clearTimeout(timer1);
        }
    }
  },[displaying, state.points, play])

  const handleClick = () => {
    setApp(true);
    dispatch(clearNotifications());
    dispatch(showUserInterface('SHOW_UI'));
    dispatch(switchPage(2));
  }


    return (
      <Link to={ location.pathname === "/training" ? "training/homepage/archive" : "archive"}>
      <animated.div style={props} onClick={handleClick} className="badge-container">
        {displaying ?
        <>
          <h3>New Badge!</h3>
          <img src={`/${state.badges[state.activeBadge].image}`} alt="React Logo"/>
          <p>{state.badges[state.activeBadge].title}</p>
        </>
        : null}
      </animated.div>
      </Link>
    )
}

const InfoBox = () => {

  const state = useSelector(state => state.info);
  const dispatch = useDispatch();

  const props = useSpring({delay:500, config:{duration: 250}, top: state.displayingInfo ? "5%": "40%", opacity: state.displayingInfo ? 1: 0})

  let container = useRef();
  const [play] = useSound('/assets/audio/new-information.mp3', {volume: 1});

  useEffect(()=> {
    if (state.displayingInfo ) {
      if (!state.activeBox.displayed && !state.muted) {
        console.log("sounds")
        play();
      }
    }
  }, [play, state.displayingInfo, state.activeBox.displayed, state.muted])

  if (state.displayingInfo) {
    console.log(state.displayingInfo);
    console.log(state.activeBox.displayed);
    return (
      <>
      <animated.div style={props} className="infobox" ref={container}>
        <h2>{state.activeBox.displayed ? state.activeBox.title: `New: ${state.activeBox.title}`}</h2>
        <img alt={state.activeBox.title} src={`/servicelearn/${state.activeBox.image}`}/>
        <section className="inner">
          <p>{state.activeBox.description}</p>
        </section>
        <button onClick={()=> dispatch(closeInfoBox(state.activeBox.tagname))}>I Understand</button>
      </animated.div>
      <div className="background"></div>
      </>
    )
  } else return null
}

export default App;
