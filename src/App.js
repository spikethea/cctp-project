import React, { useRef, useState } from 'react';
import './App.css';

//Packages
import * as THREE from 'three';
import { Canvas, useFrame } from 'react-three-fiber'
import {Box, OrbitControls} from 'drei';

import { useSelector, useDispatch } from 'react-redux';


//Components
import Header from './components/Header';
import UserInterface from './components/UserInterface';
import { Light } from 'three';

//Redux
import { showUserInterface } from './components/redux/actions';

  //Main App Function
function App() {
  

  const [ToggleUI, setToggleUI] = useState(false);  
  const [translateBoxY, setTranslateBoxY] = useState(1);

  const transformBoxZ = useSelector(state => state.counter);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <Header />
      <UserInterface
        onClick={()=> setTranslateBoxY(translateBoxY + 1)}
      />
      <Canvas
        colorManagement 
        camera={{position: [0, 5, 10], fov: 60}}
        shadowMap
      >
        <Lights/>
        <RotatingBox
          args={[1, transformBoxZ, 1]}
          transformBoxZ={transformBoxZ}
          onClick={() => dispatch(showUserInterface('SHOW_UI'))}
        />
        <Floor/>
        {/* <OrbitControls/> OrbitControls causes problems with the Raycasting (onClick)*/}
      </Canvas>
    </div>
  );
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
const RotatingBox = ({onClick, args, transformBoxZ})=> {

  const box = useRef();

  const [boxSize, setBoxSize] = useState(false);  

  useFrame(()=>(
    box.current.rotation.y = box.current.rotation.x += 0.01
    )
  )

  return (
      <>
        <Box
          args={args}
          position={[0, transformBoxZ, 0]}
          ref={box}
          castShadow
          onClick={onClick}//cant get onClick Working at all, drei or R3F
          onPointerOver={()=> setBoxSize(true)}
        >
          <meshStandardMaterial 
            
            cast
            attach="material" 
            color={boxSize ? 'white': "lightblue"}
          />
        </Box>
      </>
  )
}

const Floor = () => {
  return (
    <>
      <mesh
        onClick={()=> console.log("click")} 
        receiveShadow 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -3, 0]}
      >
        <planeBufferGeometry attach='geometry' args={[100, 100]}/>
        <meshStandardMaterial opacity={1} attach='material'/>
      </mesh>
    </>
  )
}

export default App;
