import React, {useRef, useState, useCallback, useEffect, Suspense} from 'react';

//Packages
//import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber'
import {Box, Html, Stats} from 'drei';

import { a } from '@react-spring/three';

import { useSelector, useDispatch} from 'react-redux';

//Redux
import { addPoints, getBadge } from '../redux/actions';


const HealthAndSafety = () => {

    const dispatch = useDispatch();

    const ref = useRef(null);

    const [progress, setProgress] = useState(0);

    return (

      <>
      <div style={{position: "absolute", zIndex:"3", color:"white", top:"10%", left:"40%"}}>
        <progress ref={ref} id="file" value={progress}  max="5"/>
      </div>

        <Canvas
        style={{position:"fixed", left:"0%", top:"0%"}}
        className={"canvas"}
        colorManagement 
        onCreated={({ gl }) => gl.setClearColor('coral')}
        shadowMap
        
        >
          <Camera onScroll={console.log("scrolling")}/>
            <Lights/>
            <RotatingBox progress={progress} setProgress={setProgress} position={[-3, -1, -10]} dispatch={dispatch}/>
            <RotatingBox progress={progress} setProgress={setProgress} position={[4, -0.5, -8]} dispatch={dispatch}/>
            <Stats
              showPanel={0} // Start-up panel (default=0)
              className="stats" // Optional className to add to the stats container dom element
               // All stats.js props are valid
            />
            <Suspense fallback={<Html style={{position:"absolute", left:"50%", top:"10%"}}>Loading...</Html>}>
              <Kitchen/>
    </Suspense>
            
        
      </Canvas>
      </>
    )
}

// Custom Camera

function Camera(props) {

  const [Yrotation, setYRotation] = useState(0);
  const [rotationDir, setRotationDir] = useState(false);

  const ref = useRef();
  const { setDefaultCamera} = useThree();

  

  useFrame(()=> {
    if (Yrotation > Math.PI / 6) {
      setRotationDir(false);
    } else if (Yrotation < -Math.PI / 6) {
      setRotationDir(true);
    }

    if (rotationDir) {
      setYRotation(Yrotation +0.002);
    } else {
      setYRotation(Yrotation -0.002);
    }
  })
  // Make the camera known to the system
  useEffect(() => void setDefaultCamera(ref.current), [])
  // Update it every frame
  useFrame(() => {
    //ref.current.rotation += 0.01;
    ref.current.updateMatrixWorld()
  })
  return <a.perspectiveCamera ref={ref} {...props} rotation={[0, Yrotation, 0]} fov={110} position={[0, 0, -5]}/>
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
  const gltf = useLoader(GLTFLoader, "assets/models/kitchen.glb");

  console.log(gltf);

  return (
    <primitive position={[0, -2, -10]} object={gltf.scene} />
  )

}

const RotatingBox = ({dispatch, position, progress, setProgress})=> {
  
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
        dispatch(getBadge('goodEye'));
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