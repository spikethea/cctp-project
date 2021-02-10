import React, {useRef, useState, Suspense} from 'react';

//Packages
import { useSelector, useDispatch } from 'react-redux';
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber'
import {Box, Html, Sky, Stats} from 'drei';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
//Redux
import { showUserInterface, showInfo, getBadge } from '../redux/actions';
import { FogExp2 } from 'three';

const Overworld = () => {
    //Redux
    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter);
    const info = useSelector(state => state.info);

    //Toggle UI
    const showUI = info.displayingUI
    let mql = window.matchMedia('(max-width: 1200px)').matches;

    

    return (

        <Canvas
        colorManagement 
        camera={{position: [0, 100, 150], fov: 30, rotation:[0, 0, 0]}}
        onCreated={({ gl }) => gl.setClearColor('lightblue')}
        shadowMap
        style={{filter: showUI && mql ? "blur(5px)": "none" }}
        >
          <fog attach="fog" args={["lightblue", 100, 500]}/>
          <Stats
              showPanel={0} // Start-up panel (default=0)
              className="stats" // Optional className to add to the stats container dom element
               // All stats.js props are valid
          />
          <Scene counter={counter} dispatch={dispatch}/>
      </Canvas>
    )
}



const Scene = ({dispatch, counter})=> {

  const mesh = useRef();

  useFrame(()=> {
    mesh.current.rotation.y += 0.003
  })

  const [sceneRot, setSceneRot] = useState(0);

  return (
    <group ref={mesh} position={[2, 0, -10]}  rotation-y={sceneRot}>
      <Lights/>
      <Person position={[1, -1, 20]} color={[200, 200, 200]} onClick={()=> dispatch(showInfo("gettingAround")) }/>
      <Suspense fallback={<Html style={{position:"absolute", left:"50%", top:"50%"}}>Loading...</Html>}>
        <Stadium onClick={()=> dispatch(showInfo("homeButton"))}/>
        <Floor/>
        <Grass/>
        <Building args={[5, 15, 20]} color={'#a3917c'} position={[20, 0, -30]} rotation={[0, Math.PI/4, 0]}/>

        <Building args={[5, 15, 20]} color={'#807167'} position={[-5, 0, -35]} rotation={[0, Math.PI/2, 0]}/>
        <Building args={[5, 15, 20]} color={'#807167'} position={[-5, 0, -50]} rotation={[0, Math.PI/2, 0]}/>

        <Building args={[5, 15, 20]} color={'#969696'} position={[28  , 0, -5]} rotation={[0, 0, 0]}/>

        <Building args={[15, 60, 15]} color={'#969696'} position={[-28  , 0, -5]} rotation={[0, 0, 0]}/>
        <Building args={[15, 60, 15]} color={'#969696'} position={[28  , 0, 20]} rotation={[0, 0, 0]}/>
        
        <Building args={[25, 10, 50]} color={'#969696'} position={[-28  , 0, 30]} rotation={[0, 0, 0]}/>
        <Building args={[25, 15, 25]} color={'#969696'} position={[-30  , 0, -40]} rotation={[0, 0, 0]}/>
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

const Stadium = ({onClick}) => {

  const gltf = useLoader(GLTFLoader, "assets/models/stadium.glb");

  console.log(gltf);

  return (
        <primitive onClick={onClick} position={[0, -2, -10]} object={gltf.scene} />
  )
}

const Grass = () => {

  return (
    <mesh receiveShadow rotation-x={-Math.PI/2} position={[0, -4.9, 15]}>
      <planeBufferGeometry  attach="geometry" args={[20, 20]} />
      <meshStandardMaterial attach="material" color="green" />
    </mesh>
  )
}

const Floor = () => {

  return (
    <mesh receiveShadow rotation-x={-Math.PI/2} position={[0, -5, 0]}>
      <planeBufferGeometry  attach="geometry" args={[5000, 5000]} />
      <meshStandardMaterial attach="material" color="grey" />
    </mesh>
  )
}

const Building = ({position, rotation, color, args}) => {
  return (
    <mesh rotation={rotation} position={position}>
      <boxBufferGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}
  
const Person = ({onClick, position, color}) => {
  
    let person = useRef();
    let [pressed, setPressed] = useState(false);

    console.log(person);

    const handleCick = () => {
      onClick(); 
      setPressed(true);
    } 
      
  
    return (
      <mesh>
          <Box
            args={[8, 4, 8]}
            position={position}
            ref={person}
          >
            {!pressed? <Html
              zIndexRange={[1, 0]}
              scaleFactor={150}
            >
              <p 
                onClick={handleCick} 
                style={{padding:"5px",borderRadius:"50%", backgroundColor:"black", width:"180%", zIndex:"-3", color:"white"}}
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