import React, { Suspense, useRef, useState, useEffect } from 'react';
import './App.css';
import goodEye from './assets/svg/badges/goodEye.svg'
import Hospitality from './assets/images/hospitality'

//Packages
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import {Box, Html, OrbitControls, draco} from 'drei';
import {useSpring, animated} from 'react-spring';

import { useSelector, useDispatch } from 'react-redux';
//import { BrowserRouter as Router, Link } from "react-router-dom";


//Components
import Header from './components/Header';
import UserInterface from './components/UserInterface';
import StageSelector from './components/StageSelector';
import Tutorial from './components/Tutorial';

//Redux
import { showUserInterface, showInfo, closeInfoBox, hideBadge } from './components/redux/actions';

//Main App Function
function App() {
  
  const [App, setApp] = useState(false);

  if (App) {
    console.log(App);
    return (
    
    <div className="App">
      <Suspense fallback={<Html><div className="loading">Loading...</div></Html>}>
        <Header />
        <UserInterface/>
        <InfoBox/>
        <BadgeNotification/>
        <Tutorial/>
        <StageSelector/>
      </Suspense>
      
    </div>
  )} else return(
    <div className="landing-page">
        <section className="intro">
          <h1>My Hospitality</h1>
          <img src={Hospitality}/>
          <h2>A Interactive Staff Training system design for Hospitality staff, by Hospitality staff</h2>
          <p></p>
          <button onClick={()=>setApp(true)}>Enter Training</button>
        </section>
        <section className="explanation">
          <h2>Why use MyHospitality?</h2>
          <ul>
            <li>Teaches you wide variety of skills ready for work</li>
            <li>Designed to be an engaging experience </li>
            <li>Works cross-platform, on laptop, mobile or whiteboard etc.</li>
          </ul>
          <p></p>
        </section>
        <section className="reviews">
          <h2>User Reviews</h2>
          <ul>
            <li>Teaches you wide variety of skills ready for work</li>
            <li>Designed to be an engaging experience </li>
            <li>Works cross-platform, on laptop, mobile or whiteboard etc.</li>
          </ul>
          <p></p>
        </section>
    </div>
  );
}

//UI

const BadgeNotification = () => {
  
  const info = useSelector(state => state.info);
  const dispatch = useDispatch();

  const props = useSpring({delay:{duration:800}, config:{duration: 250}, top: info.displayingBadge ? "20%": "40%", opacity: info.displayingBadge ? 1: 0})

  if (info.displayingBadge) {
    
    setTimeout(()=> dispatch(hideBadge()), 2000);
  }

  const handleClick = () => {
    dispatch(showUserInterface('SHOW_UI'));
  }

  if (info.displayingBadge) {

    
    console.log(info.activeBadge.title);
    return (
      <animated.div style={props} onClick={handleClick} className="badge-container">
        <h3>New Badge!</h3>
        <img src={goodEye} alt="React Logo"/>
        <p>{info.activeBadge.title}</p>
      </animated.div>
    )
  } else return null
}

const InfoBox = ({onClick}) => {

  const infoBox = useSelector(state => state.info);
  const dispatch = useDispatch();

  let container = useRef();
  
  if (infoBox.displayingInfo) {
    return (
      <>
      <div className="infobox" ref={container}>
        <h1>{infoBox.activeBox.title}</h1>
        <p>
          {infoBox.activeBox.description}
        </p>
        <button onClick={()=> dispatch(closeInfoBox())}>Understand</button>
      </div>
      <div className="background"></div>
      </>
    )
  } else return null
}

export default App;
