import React, {useRef, useState, useCallback, useEffect, Suspense} from 'react';
import styles from './Allergies.module.css';

//Packages
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber'
import {Box, Html, OrbitControls, draco} from 'drei';
import {useSpring, animated} from 'react-spring';

import { a } from '@react-spring/three';

import { useSelector, useDispatch } from 'react-redux';

//Redux
import { showUserInterface, allergyQuantity } from '../redux/actions';

const Allergies = () => {

    const dispatch = useDispatch();
    const transformBoxZ = useSelector(state => state.counter);
    const scrollbar = useRef(null);

    const allergyData = {
      peanuts: 3,
      vegan:5,
      vegetarian:8,
      dairy:10
    }

    /*allergyData.map ((allergy) => {
      <Person position={[5,1,5]}/>
    })*/
    

    const [scrollPosition, setScrollPosition] = useState(0)
    console.log(window.innerHeight);

    const [allergyIcons, setAllergyIcons] = useState(true);
    
    //tracking scroll position

    const onScroll = ({}) => {
      const scrollTop = scrollbar.current.scrollTop
      console.log("scrolling" + scrollTop)
      console.log("scrollbar length " + scrollbar.current.scrollHeight)
      setScrollPosition((scrollTop/scrollbar.current.scrollHeight)* 1000);
      console.log("scroll camera" + scrollPosition + "%")
    }
  
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) - 50

    return (
      <>
        <div className="scrollbar" ref={scrollbar} onScroll={onScroll} style={{position:"fixed", left:"0%", top:"0%", width:`100vw`,height:`${vh}px`, backgroundColor:"rgba(0,0,0,0)", overflowY:"scroll", zIndex:"2"}}>
          <div style={{height:"500vh"}}>
              <p style={{margin:"3.5em 1em 1em 1em",padding:"1em", backgroundColor:"#349eeb", borderRadius:"1em", border:"5px solid white"}}>Scroll down to Move the Camera!</p>
          </div>
        </div>
        <AllergyCounter dispatch={dispatch}/>
        <Canvas
        className={"canvas"}
        colorManagement 
        onCreated={({ gl }) => gl.setClearColor('lightblue')}
        shadowMap
        
        >
          <Camera 
          position={[scrollPosition/20, 15, 25]}
          rotation={[-Math.PI / 8, 0, 0]}
          fov={70}
          />
        
            <Lights/>
            <RotatingBox
            transformBoxZ={transformBoxZ}
            onClick={() => dispatch(showUserInterface('SHOW_UI'))}
            onHover={console.log("reached")}
            />
            <Floor/>
            <Suspense fallback={<Html style={{position:"absolute", left:"50%", top:"50%"}}>Loading...</Html>}>
              <Person position={[1,1,1]}/>
              <Person position={[5,1,5]}/>
              <Person position={[18,1,3]}/>
              <Person position={[34,1,7]}/>
            </Suspense>
        {/* <OrbitControls/> */}
      </Canvas>
      
      </>
    )
}

//UI



  const AllergyCounter = ({dispatch}) => {

    const state = useSelector(state => state.allergies);

    let currentAllergies = [];

    const [display, setDisplay] = useState(true);
    const props = useSpring({bottom: display? "0%": "-100%"})

    const checkCount = () => {
      console.log("check the count of allergies against the users input");

      
    }


    Object.keys(state.allergies).forEach(function(allergy) {
      console.log(state.allergies);
      currentAllergies.push(state.allergies[allergy]);
      console.log(currentAllergies);
  });

  console.log("forEach done");

  console.log(currentAllergies);

    currentAllergies = currentAllergies.map ((allergy, index) => {

        return (
          <div key={index} className={styles.item}>
              <label>{allergy.tagName}</label>
              <div className={styles.itemInner}>
                <p className={styles.quantity}>{allergy.inputQuantity}</p>
                <button className={styles.radioButton} onClick={() => dispatch(allergyQuantity(allergy.tagName, 'decrease'))}>-</button>
                <button className={styles.radioButton} onClick={() => dispatch(allergyQuantity(allergy.tagName, 'increase'))}>+</button>
              </div>
            </div>
        )
        
      })

    console.log("mapping done");

      
    

    return (
      <animated.div style={props} className={styles.container}>
        <h2 onClick={()=> setDisplay(false)}>Allergy List</h2>
          {currentAllergies}
        <button onClick={checkCount} className={styles.submit}>Confirm</button>
      </animated.div>
    )
  } 

// Custom Camera

function Camera(props) {
  const ref = useRef()
  const { setDefaultCamera, camera } = useThree()
  // Make the camera known to the system
  useEffect(() => void setDefaultCamera(ref.current), [])
  // Update it every frame
  useFrame(() => ref.current.updateMatrixWorld())
  //ref.lookAt(new THREE.Vector3( 0, 0, 0 ))

  camera.fov = 70;

  
  return <a.perspectiveCamera ref={ref} {...props} position={props.position}/>
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
  
  const Floor = ({onClick}) => {
    return (
      <>
        <mesh
          onClick={onClick} 
          receiveShadow 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, -3, 0]}
        >
          <planeBufferGeometry attach='geometry' args={[100, 20]}/>
          <meshStandardMaterial color={"rgb(5, 68, 0)"} opacity={1} attach='material'/>
        </mesh>
      </>
    )
  }

  
  
  const Person = ({onClick}) => {

    const {nodes} = useLoader(GLTFLoader, "assets/models/npc.glb");
    
    let person = useRef();

    const [bobbing, setBobbing] = useState(true);

    const [properties, setProperties] = useState({
      position: [Math.random()*40, 1, Math.random() * 10], 
      color: [Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255)],
      popup: false
      }
    );  
  
    useFrame(()=> {
        if (person.current.position.y > 1.5) {
          
          setBobbing(false);
        }
        
        if (person.current.position.y < 1) {
          
          setBobbing(true);
        }

        if (bobbing) {
          person.current.position.y += 0.01;
        } else {
          person.current.position.y -= 0.01;
        }


        
    })
  
    return (
      <group>
        <mesh 
          args={[1, 1, 1]}
          position={properties.position}
          ref={person}
          visible 
          geometry={nodes.npc.geometry}>
            <Html
                zIndexRange={[1, 0]}
                scaleFactor={50}
            >
                <p 
                  onClick={onClick} 
                  style={{transform: "translateY(-50px)",marginBottom:"1em",padding:"5px",borderRadius:"50%", backgroundColor:"white", width:"180%", zIndex:"-3", fontWeight:"bold", color:"green"}}
                >V</p>
            </Html>
            <meshStandardMaterial 
                attach="material" 
                cast
                color={`rgb(${properties.color})`}
            />
            
        </mesh>
      </group>
    )
  }

export default Allergies;