import React, { Suspense, useRef, useState, useEffect } from 'react';
import './App.css';


//Packages
import {useSpring, animated} from 'react-spring';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
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

//Redux
import { showUserInterface, closeInfoBox, switchPage, clearNotifications } from './components/redux/actions';

//Sounds
//import newInformation from './assets/audio/new-information.mp3';

//Main App Function
function App() {

  const [app, setApp] = useState(false);

  //Soundtracks
  const soundtracks = [
    '../assets/audio/jazz-piano.mp3',
    '../assets/audio/stadium.mp3',
    '../assets/audio/cafeteria.mp3',
  ]
    //Redux
    const state = useSelector(state => state.info)

    const stage = state.activeStage;
    const showUI = state.displayingUI
    console.log(stage);
    console.log(soundtracks[stage]);

    //useSound
    const [muted, setMuted] = useState(false);
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
  const [ play ] = useSound("../assets/audio/badge.mp3", {volume: 0.25});

  useEffect(()=> {
      if (info.activeBadge) {
        setDisplaying(true);
      }
  }, [info.activeBadge]) 

  useEffect(()=> {
    
    if (displaying) {
      play();
      console.log("hide");
      let timer1 = setTimeout(()=> setDisplaying(false), 2500);
        return ()=> {
          console.log("clear")
          clearTimeout(timer1);
        }
    }
  },[displaying, info.points, play])

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

const InfoBox = () => {

  const info = useSelector(state => state.info);
  const dispatch = useDispatch();

  const props = useSpring({delay:500, config:{duration: 250}, top: info.displayingInfo ? "10%": "40%", opacity: info.displayingInfo ? 1: 0})

  let container = useRef();
  const [play] = useSound('../assets/audio/new-information.mp3', {volume: 1});

  useEffect(()=> {
    if (info.displayingInfo ) {
      if (!info.activeBox.displayed) {
        console.log("sounds")
        play();
      }
    }
  }, [play, info.displayingInfo, info.activeBox.displayed])

  if (info.displayingInfo) {
    console.log(info.displayingInfo);
    console.log(info.activeBox.displayed);
    return (
      <>
      <animated.div style={props} className="infobox" ref={container}>
        <h2>{info.activeBox.displayed ? info.activeBox.title: `New: ${info.activeBox.title}`}</h2>
        <img alt={info.activeBox.title} src={`/servicelearn/${info.activeBox.image}`}/>
        <section className="inner">
          <p>{info.activeBox.description}</p>
        </section>
        <button onClick={()=> dispatch(closeInfoBox(info.activeBox.tagname))}>I Understand</button>
      </animated.div>
      <div className="background"></div>
      </>
    )
  } else return null
}

export default App;
