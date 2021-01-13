import React, {useRef, useState, Suspense} from 'react';

//Packages
import { useSelector, useDispatch } from 'react-redux';
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import {Box, Html, PerspectiveCamera, draco} from 'drei';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { a } from '@react-spring/three';
//Redux
import { showUserInterface, showInfo, getBadge } from '../redux/actions';

const Overworld = () => {

    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter);

    const [cameraPos, setCameraPos] = useState([0, 100, 250]);
    const [cameraFov, setCameraFov] = useState(10);


    
    


    return (

        <Canvas
        colorManagement 
        camera={{position: cameraPos, fov: cameraFov, rotation:[0, 0, 0]}}
        onCreated={({ gl }) => gl.setClearColor('lightblue')}
        shadowMap
        >
          <Scene counter={counter} dispatch={dispatch}/>
      
      </Canvas>
    )
}

const Scene = ({dispatch, counter})=> {

  const mesh = useRef();

  useFrame(()=> {
    mesh.current.rotation.y += 0.01
  })

  const [sceneRot, setSceneRot] = useState(Math.PI/4);

  return (
    <group ref={mesh} rotation-y={sceneRot}>

      <Lights/>
      <RotatingBox
      transformBoxZ={counter}
      onHover={() => dispatch(showUserInterface('SHOW_UI'))}
      />
      <Person position={[5, -1, 5]} color={[20, 20, 255]} onClick={()=> dispatch(showInfo("fireExtinguisher")) }/>
      <Suspense fallback={<Html style={{position:"absolute", left:"50%", top:"50%"}}>Loading...</Html>}>
        <Floor/>
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

const Floor = () => {

  const gltf = useLoader(GLTFLoader, "assets/models/stadium.glb");

  console.log(gltf);

  return (
        <primitive position={[0, -2, -10]} object={gltf.scene} />
  )
}


const RotatingBox = ({transformBoxZ})=> {
  
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