import React, {useRef, useState, useEffect, Suspense} from 'react';

//Packages
//import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber'
import {Box, Html, Stats} from 'drei';

import { animated } from '@react-spring/three';

//Redux
import {  useDispatch, useSelector } from 'react-redux';
import { addPoints, getBadge, showInfo } from '../redux/actions';


const HealthAndSafety = () => {

    const dispatch = useDispatch();
    const info = useSelector(state => state.info);

    const showUI = info.displayingUI;
    let mql = window.matchMedia('(max-width: 1200px)').matches;

    const ref = useRef(null);

    const [progress, setProgress] = useState(0);
    const [cameraPosition, setCameraPosition] = useState([0, 0, -5]);

    useEffect(()=> {
      if (progress === 5) {
        dispatch(getBadge('oneHundredPercent'));
      }
    },[progress])

    return (
      <>
      {!showUI ? 
      <div style={{position: "absolute", zIndex:"3", color:"white", top:"10%", left:"40%"}}>
        <svg style={{position: "absolute", top: "0", left:"0"}} width="200" height="200" viewBox="0 0 453 453" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle strokeDasharray="628" fill="none" cx="150" cy="150" r="100" stroke="white" strokeWidth="10"/>
        </svg>

        <svg style={{position: "absolute", top: "0", left:"0"}} width="200" height="200" viewBox="0 0 453 453" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle strokeDashoffset={628 - (125.6*progress)} strokeDasharray="628" fill="none" cx="150" cy="150" r="100" stroke="blue" strokeWidth="10"/>
        </svg>

        <h1 style={{position: "absolute", top: "1.35em", left:"1.45em"}}>{progress}/5</h1>
      </div> : null}

        <Canvas
        style={{position:"fixed", left:"0%", top:"0%"}}
        className={"canvas"}
        colorManagement 
        onCreated={({ gl }) => gl.setClearColor('coral')}
        shadowMap
        style={{filter: showUI && mql ? "blur(5px)": "none" }}
        >
          <Camera position={cameraPosition}/>
            <Lights/>
            <RotatingBox onClick={()=> dispatch(showInfo("puddle"))} progress={progress} setProgress={setProgress} position={[-3, -1, -10]} dispatch={dispatch}/>
            <RotatingBox onClick={()=> dispatch(showInfo("fireExtuinguisher"))} progress={progress} setProgress={setProgress} position={[4, -0.5, -12]} dispatch={dispatch}/>
            <RotatingBox progress={progress} setProgress={setProgress} position={[0, 0.5, -10]} dispatch={dispatch}/>
            <RotatingBox progress={progress} setProgress={setProgress} position={[4, -0.5, -8]} dispatch={dispatch}/>
            <RotatingBox progress={progress} setProgress={setProgress} position={[0, -2, -7]} dispatch={dispatch}/>
            <Stats
              showPanel={0} // Start-up panel (default=0)
              className="stats" // Optional className to add to the stats container dom element
               // All stats.js props are valid
            />
            <Suspense fallback={<Html style={{position:"absolute", left:"50%", top:"40%"}}>Loading...</Html>}>
              <Kitchen/>
            </Suspense>
      </Canvas>
      {!showUI ? <button style={{position:"fixed", bottom: "5em", left: "5em"}} onClick={()=> setCameraPosition([4, 0.5, -7])}>Change Position</button> : null }
      </>
    )
}

// Custom Camera

function Camera({position}) {

  const ref = useRef();
  const { setDefaultCamera} = useThree();
  
  let [rotationDir, setRotationDir] = useState(false);

  setTimeout(()=> {
    if (rotationDir) {
      setRotationDir(false);
    } else {
      setRotationDir(true);
    }
  }, 3000)


  useFrame(({camera})=> {


    if (rotationDir) {
      camera.rotation.y += 0.002;
    } else {
      camera.rotation.y -= 0.002;
    }

    ref.current.updateMatrixWorld()
  })
  
  // Make the camera known to the system
  useEffect(() => void setDefaultCamera(ref.current), [setDefaultCamera])

  return <animated.perspectiveCamera ref={ref} fov={110} position={position}/>
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


const Kitchen = ()=> {
  const gltf = useLoader(GLTFLoader, "./assets/models/kitchen.glb");

  console.log(gltf);

  return (
    <primitive position={[0, -2, -10]} object={gltf.scene} />
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