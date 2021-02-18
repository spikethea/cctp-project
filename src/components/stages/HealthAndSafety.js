import React, {useRef, useState, useEffect, Suspense} from 'react';
import styles from './HealthAndSafety.module.css';

//Packages
//import * as THREE from 'three';
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber'
import {Box, Html, Stats} from 'drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { animated } from '@react-spring/three';

//Redux
import {  useDispatch, useSelector, useRouteMatch } from 'react-redux';
import { addPoints, getBadge, showInfo } from '../redux/actions';


const HealthAndSafety = () => {

    const dispatch = useDispatch();
    const info = useSelector(state => state.info);

    const showUI = info.displayingUI;
    let mql = window.matchMedia('(max-width: 1200px)').matches;

    const [progress, setProgress] = useState(0);

    const [cameraPosition, setCameraPosition] = useState([0, 2, 5]);
    let [rotationDir, setRotationDir] = useState(false);
    let [cameraRotating, setCameraRotating] = useState(false)

    useEffect(()=> {
      if (progress === 3) {
        dispatch(getBadge('oneHundredPercent'));
      }
    },[progress])

    const handleClick = (direction) => {
      setRotationDir(direction)
      setCameraRotating(true)
    }

    const handleLeave = () => {
      setCameraRotating(false);
    }

    return (
      <>
      {!showUI ? 
      <div className={styles.progress}>
        
        <svg className={styles.ring} width="100" height="100" viewBox="50 50 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle strokeDasharray="628" fill="none" cx="100" cy="100" r="50" stroke="white" strokeWidth="3"/>
        </svg>

        <svg className={styles.stroke} width="200" height="100" viewBox="50 50 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle strokeDashoffset={314 - ((314/5)*progress)} strokeDasharray="314" fill="none" cx="100" cy="100" r="50" stroke="blue" strokeWidth="3"/>
        </svg>

        <h1>{progress}/5</h1>
      </div> : null}
      
      <div style={{display: showUI && mql ? "none" : "flex"}} className={styles.navigation}>
          <svg onMouseLeave={()=> handleLeave()} onMouseDown={()=> handleClick(true)} height="50" width="50">
          <polygon points="50,50 50,0 0,25" className="triangle">Left</polygon>
          </svg>
          <svg  onMouseLeave={()=> handleLeave()} onMouseDown={()=> handleClick(false)} height="50" width="50">
            <polygon points="0,0 50,25 0,50" className="triangle">Right</polygon>
          </svg>
      </div>

        <Canvas
        style={{position:"fixed", left:"0%", top:"0%"}}
        className={"canvas"}
        colorManagement 
        onCreated={({ gl }) => gl.setClearColor('coral')}
        shadowMap
        style={{filter: showUI && mql ? "blur(5px)":"none" }}
        >
          <Camera direction={rotationDir} rotating={cameraRotating} position={cameraPosition}/>
            <Lights/>
            <Scene setCameraPosition={setCameraPosition} progress={progress} setProgress={setProgress} dispatch={dispatch}/>
      </Canvas>
      {!showUI ? <button style={{position:"fixed", bottom: "5em", left: "5em"}} onClick={()=> setCameraPosition([4, 2.5, 3])}>Change Position</button> : null }
      </>
    )
}

const Teleportation = ({setCameraPosition, position}) => {

  let localPosition = position

const { nodes, materials } = useLoader(GLTFLoader, "../assets/models/teleport.glb");

  console.log(nodes);
  console.log(materials);

  return (
    <mesh onClick={()=> setCameraPosition([localPosition[0], localPosition[1] + 2, localPosition[1]])} scale={[0.8, 0.8, 0.8]} position={localPosition} geometry={nodes.Circle.geometry} material={materials["Material.001"]}/>
  )
}

// Custom Camera

function Camera({position, direction, rotating}) {

  const ref = useRef();
  const { setDefaultCamera} = useThree();
  



  useFrame(({camera})=> {
    if (rotating) {
      if (direction) {
        camera.rotation.y += 0.005;
      } else {
        camera.rotation.y -= 0.005;
      }

      ref.current.updateMatrixWorld()
    }

  })
  
  // Make the camera known to the system
  useEffect(() => void setDefaultCamera(ref.current), [setDefaultCamera])

  return <animated.perspectiveCamera ref={ref} fov={110} position={position}/>
}


//Scene
const Scene = ({dispatch, setProgress, progress, setCameraPosition}) => {


  return (
    <>
      <RotatingBox onClick={()=> dispatch(showInfo("puddle"))} progress={progress} setProgress={setProgress} position={[-3, -1, 0]} dispatch={dispatch}/>
      <RotatingBox progress={progress} setProgress={setProgress} position={[0, 2.5, 0]} dispatch={dispatch}/>
      <RotatingBox progress={progress} setProgress={setProgress} position={[0, 0, 3]} dispatch={dispatch}/>
      <Stats
        showPanel={0} // Start-up panel (default=0)
        className="stats" // Optional className to add to the stats container dom element
          // All stats.js props are valid
      />
      <Suspense fallback={<Html style={{position:"absolute", left:"50%", top:"40%"}}>Loading...</Html>}>
        <Kitchen/>
        <Teleportation position={[0, 0, 5]} setCameraPosition={setCameraPosition}/>
          <Teleportation position={[2.5, 0, 0]} setCameraPosition={setCameraPosition}/>
          <Teleportation position={[-2.5, 0, 0]} setCameraPosition={setCameraPosition}/>
        <Puddle dispatch={dispatch} setProgress={setProgress}/>
        <Meat dispatch={dispatch} setProgress={setProgress} />
      </Suspense>
    </>
  )
}


// Lights
const Lights = () => {

    return (
      <>
        <ambientLight
          intensity={0.5}
        />
        <rectAreaLight
          width={1.5}
          height={1.5}
          color={"#f7f3eb"}
          intensity={4}
          position={[3, 3, 0]}
          lookAt={[0, 0, 0]}
          penumbra={1}
        />
        <FlickeringLight/>
        <pointLight
        width={10}
        height={10}
        color={"#f7f3eb"}
        intensity={0.4}
        position={[0, 2, 0]}
        lookAt={[0, 0, 0]}
        penumbra={1}
        />
      </>
    )
  }
  
//Meshes

const FlickeringLight = () => {

  let light = useRef();
  const [dimming, setDimming] = useState(true)

  useFrame(()=> {
    if (light.current.intensity > 10) {
      setDimming(true);
    } else if (light.current.intensity > 2) {
      setDimming(false);
    }

    if (dimming) {
      light.current.intensity -= 1;
    } else {
      light.current.intensity += 1;
    }
  })

  return (
    <rectAreaLight
          ref={light}
          width={1.5}
          height={1.5}
          color={"#f7f3eb"}
          intensity={6}
          position={[-3, 3, 0]}
          lookAt={[0, 0, 0]}
          penumbra={1}
        />
  )
}


const Kitchen = ()=> {



  const gltf = useLoader(GLTFLoader, "../assets/models/kitchen.glb");

  console.log(gltf);

  return (
    <primitive position={[0, 0, 0]} object={gltf.scene} />
  )

}

const Puddle = ({setProgress, dispatch})=> {

  const gltf = useLoader(GLTFLoader, "../assets/models/puddle.glb");

  const [found, setFound] = useState(false);  

  const clickBox = () => {
    if(!found) {
      setProgress((prevState) => prevState + 1);
      setFound(true);
      console.log("clicked!");
      dispatch(addPoints(200));
    }

  }

  return (
    <primitive transparent opacity={0.5} onClick={clickBox} position={[3, 0.1, -3]} object={gltf.scene} >
      {found ? <Html
            zIndexRange={[1, 0]}
            scaleFactor={20}
          >
            <p 
              onClick={()=> dispatch(showInfo("puddle"))} 
              style={{transform:"translate(-10px, -40px)", marginBottom:"1em",padding:"5px",borderRadius:"50%", backgroundColor:"black", width:"180%", zIndex:"-3", color:"white"}}
            >?</p>
          </Html>: null}
      </primitive>
  )

}

const Meat = ({setProgress, dispatch})=> {

  const gltf = useLoader(GLTFLoader, "../assets/models/meat.glb");

  const [found, setFound] = useState(false);  

  const clickBox = () => {
    if(!found) {
      setProgress((prevState) => prevState + 1);
      setFound(true);
      console.log("clicked!");
      dispatch(addPoints(200));
    }

  }

  return (
    <primitive onClick={clickBox} position={[4, 1.25, 2]} object={gltf.scene} >
      {found ? <Html
            zIndexRange={[1, 0]}
            scaleFactor={20}
          >
            <p 
              onClick={()=> dispatch(showInfo("puddle"))} 
              style={{transform:"translate(-10px, -40px)", marginBottom:"1em",padding:"5px",borderRadius:"50%", backgroundColor:"black", width:"180%", zIndex:"-3", color:"white"}}
            >?</p>
          </Html>: null}
      </primitive>
  )

}

const RotatingBox = ({dispatch, position, progress, setProgress, onClick})=> {
  
    const box = useRef();

  
    const [boxSize, setBoxSize] = useState(false);  
  
    useFrame(()=>(
      boxSize ? box.current.rotation.y = box.current.rotation.x += 0.01: null
      )
    )

    const clickBox = () => {
      if(!boxSize) {
        setProgress(progress + 1);
        setBoxSize(true);
        console.log("clicked!")
        dispatch(addPoints(200))
      }

    }



  
    return (
        <>
          <Box
            args={boxSize ? [1,1,1]: [0.2, 0.2, 0.2]}
            position={position}
            ref={box}
            castShadow
            onClick={clickBox}//cant get onClick Working at all, drei or R3F
          >
            {boxSize ? <Html
            zIndexRange={[1, 0]}
            scaleFactor={20}
          >
            <p 
              onClick={onClick} 
              style={{transform:"translate(-10px, -40px)", marginBottom:"1em",padding:"5px",borderRadius:"50%", backgroundColor:"black", width:"180%", zIndex:"-3", color:"white"}}
            >?</p>
          </Html>: null}
            <meshStandardMaterial 
              
              cast
              attach="material" 
              color={"lightblue"}
            />
          </Box>
        </>
    )
}


export default HealthAndSafety;