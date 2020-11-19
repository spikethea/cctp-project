import React, { Suspense, useRef, useState, useEffect } from 'react';
import './App.css';

//Packages
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import {Box, Html, OrbitControls, draco} from 'drei';

import { useSelector, useDispatch } from 'react-redux';
//import { BrowserRouter as Router, Link } from "react-router-dom";


//Components
import Header from './components/Header';
import UserInterface from './components/UserInterface';

//Redux
import { showUserInterface, showInfo, infoBox, getBadge } from './components/redux/actions';

  //Main App Function
function App() {
 
  const [translateBoxY, setTranslateBoxY] = useState(1);

  const transformBoxZ = useSelector(state => state.counter);
  const dispatch = useDispatch();

  const [cameraPos, setCameraPos] = useState([0, 100, 250]);
  const [cameraFov, setCameraFov] = useState(10);

  return (
    <div className="App">
      <Header />
      <UserInterface
        onClick={()=> setTranslateBoxY(translateBoxY + 1)}
      />
      <Info onClick={()=> dispatch(infoBox("yeeee"))}/>
      <Canvas
        colorManagement 
        camera={{position: cameraPos, fov: cameraFov}}
        shadowMap
      >
        <Suspense fallback={<Html>Loading...</Html>}>
        <Lights/>
        <RotatingBox
          transformBoxZ={transformBoxZ}
          onClick={() => dispatch(showUserInterface('SHOW_UI'))}
        />
        <Person onClick={()=> dispatch(showInfo("fireExtinguisher")) }/>
        <Person onClick={()=> dispatch(showInfo("puddle"))}/>
        <Person onClick={()=> dispatch(getBadge("goodEye"))}/>
        
        <Floor onClick={()=> setCameraFov(cameraFov + 15)}/>
        {/* <OrbitControls/> OrbitControls causes problems with the Raycasting (onClick)*/}
        </Suspense>
        { <OrbitControls/>}
      </Canvas>
      
    </div>
  );
}

//UI

const Info = ({onClick}) => {

  const infoBox = useSelector(state => state.info);
  console.log(infoBox);

  let container = useRef();
  
  if (infoBox.displayingInfo) {
    return (
      <>
      <div className="infobox" ref={container}>
        <h1>{infoBox.activeBox.title}</h1>
        <p>
          {infoBox.activeBox.description}
        </p>
        <button onClick={onClick}>Understand</button>
      </div>
      <div className="background"></div>
      </>
    )
  } else return null
}

  //Scene Lights
const Lights = () => {

  return (
    <>
      <directionalLight
        intensity={1.5}
        position={[0, 10, 5]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <ambientLight
        intensity={0.3}
      />
    </>
  )
}

  //Meshes
const RotatingBox = ({onClick, transformBoxZ})=> {

  const box = useRef();

  const [boxSize, setBoxSize] = useState(false);  

  useFrame(()=>(
    box.current.rotation.y = box.current.rotation.x += 0.01
    )
  )

  return (
      <>
        <Box
          args={boxSize ? [2,2,2]: [1,1,1]}
          position={[0, transformBoxZ, 0]}
          ref={box}
          castShadow
          onClick={()=> setBoxSize(true)}//cant get onClick Working at all, drei or R3F
        >
          <meshStandardMaterial 
            
            cast
            attach="material" 
            color={"lightblue"}
          />
        </Box>
      </>
  )
}

const Floor = ({onClick}) => {
  return (
    <>
      <mesh
        onClick={onClick} 
        receiveShadow 
        rotation={[-Math.PI / 2, 0, Math.PI / 4]} 
        position={[0, -3, 0]}
      >
        <planeBufferGeometry attach='geometry' args={[30, 30]}/>
        <meshStandardMaterial color={"rgb(5, 68, 0)"} opacity={1} attach='material'/>
      </mesh>
    </>
  )
}

const Person = ({onClick}) => {

  let person = useRef();

  useFrame(()=> {
      person.current.rotation.x += 0.01
  })

  useEffect(()=>{

    
  })


  const [properties, setProperties] = useState({
      position: [Math.random()*20, -1, Math.random() * 20], 
      color: [Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255)],
      popup: false
      }
    );  

  return (
    <mesh>
        <Box
          args={[1, 1, 1]}
          position={properties.position}
          ref={person}
        >
          <Html
            zIndexRange={[1, 0]}
          >
            <p 
              onClick={onClick} 
              style={{marginBottom:"1em",padding:"5px",borderRadius:"50%", backgroundColor:"black", width:"180%", zIndex:"-3", color:"white"}}
            >?</p>
          </Html>
          <meshStandardMaterial 
            
            cast
            attach="material" 
            color={`rgb(${properties.color})`}
          />
        </Box>
    </mesh>
  )
}

export default App;
