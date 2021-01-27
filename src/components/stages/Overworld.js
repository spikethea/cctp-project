import React, {useRef, useState, Suspense} from 'react';

//Packages
import { useSelector, useDispatch } from 'react-redux';
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import {Box, Html, Sky, Stats} from 'drei';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
//Redux
import { showUserInterface, showInfo, getBadge } from '../redux/actions';

const Overworld = () => {

    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter);
    const info = useSelector(state => state.info);

    const showUI = info.displayingUI

    return (

        <Canvas
        colorManagement 
        camera={{position: [0, 70, 250], fov: 10, rotation:[0, 0, 0]}}
        onCreated={({ gl }) => gl.setClearColor('lightblue')}
        shadowMap
        style={{filter: showUI ? "blur(5px)": "none" }}
        >
          <Stats
              showPanel={0} // Start-up panel (default=0)
              className="stats" // Optional className to add to the stats container dom element
               // All stats.js props are valid
          />
          <Sky
          inclination={0.1}
          />
          <Scene counter={counter} dispatch={dispatch}/>
      
      </Canvas>
    )
}



const Scene = ({dispatch, counter})=> {

  const mesh = useRef();

  useFrame(()=> {
    mesh.current.rotation.y += 0.01
  })

  const [sceneRot, setSceneRot] = useState(0);

  return (
    <group ref={mesh} position={[2, 0, -10]}  rotation-y={sceneRot}>

      <Lights/>
      <Person position={[5, -1, 5]} color={[20, 20, 255]} onClick={()=> dispatch(showInfo("puddle")) }/>
      <Suspense fallback={<Html style={{position:"absolute", left:"50%", top:"50%"}}>Loading...</Html>}>
        <Floor onClick={()=> dispatch(showInfo("homeButton"))}/>
      </Suspense>
    </group>
  )
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

const Floor = ({onClick}) => {

  const gltf = useLoader(GLTFLoader, "assets/models/stadium.glb");

  console.log(gltf);

  return (
        <primitive onClick={onClick} position={[0, -2, -10]} object={gltf.scene} />
  )
}
  
const Person = ({onClick, position, color}) => {
  
    let person = useRef();
    let [pressed, setPressed] = useState(false);
  
    useFrame(()=> {
        person.current.rotation.x += 0.01
    })

    const handleCick = () => {
      onClick(); 
      setPressed(true);
    } 
      
  
    return (
      <mesh>
          <Box
            args={[1, 1, 1]}
            position={position}
            ref={person}
          >
            {!pressed? <Html
              zIndexRange={[1, 0]}
              scaleFactor={65}
            >
              <p 
                onClick={handleCick} 
                style={{marginBottom:"1em",padding:"5px",borderRadius:"50%", backgroundColor:"black", width:"180%", zIndex:"-3", color:"white"}}
              >?</p>
            </Html>: null}
            <meshStandardMaterial 
              
              cast
              attach="material" 
              color={`rgb(${color})`}
            />
          </Box>
      </mesh>
    )
  }

export default Overworld;