import React, {useRef, useState, useEffect, Suspense} from 'react';
import styles from './Allergies.module.css';

//Packages
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber'
import {Html, Stats} from 'drei';
import {useSpring, animated} from 'react-spring';

import { a } from '@react-spring/three';

import { useSelector, useDispatch } from 'react-redux';

//Redux
import { showUserInterface, allergyQuantity, allergyLevel } from '../redux/actions';

const Allergies = () => {
    // Redux
    const dispatch = useDispatch();
    const state = useSelector(state => state.allergies);
    const info = useSelector(state => state.info);

    const gameState = info.gameState;

    const started = state.started;

    const showUI = info.displayingUI
    let mql = window.matchMedia('(max-width: 1200px)').matches;

    //Hooks
    const scrollbar = useRef(null);

    const [scrollPosition, setScrollPosition] = useState(0);
    const [Active, setActive] = useState(false);

    const [currentAllergies, setCurrentAllergies] = useState([]);
    const [peopleArray, setPeopleArray] = useState([]);

    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) - 50
    
    //tracking scroll position

    const onScroll = () => {
      const scrollTop = scrollbar.current.scrollLeft
      setScrollPosition((scrollTop/scrollbar.current.scrollWidth)* 1000);
      console.log("scroll camera " + Math.floor(scrollPosition/10) + " %")
    }

    useEffect(()=> {
      if (gameState !== 0) {
        console.log(gameState);
        dispatch(allergyLevel(gameState));
      }

    }, [gameState])
    
    //populating current allergies and people array
    useEffect(()=> {

      setPeopleArray([]);
      setCurrentAllergies([]);

      Object.keys(state.allergies).forEach(function(allergy) {
        setCurrentAllergies(currentAllergies => [...currentAllergies, (state.allergies[allergy])]);
        for(let i = 0; i < state.allergies[allergy].quantity; i++) {
          setPeopleArray(peopleArray => [...peopleArray, (state.allergies[allergy])]);
        }
      });
      
    }, [state])

    return (
      <>            
        <div className={styles.scrollbar} ref={scrollbar} style={{height:`${vh}px`}} onScroll={onScroll}>
          <div style={{width:"500vh"}}>
              <p className={styles.scrollDown}>Scroll Horizontally to Move the Camera!</p>
          </div>
        </div>

        {Active ? <AllergyCounter currentAllergies={currentAllergies} mql={mql} showUI={showUI} peopleArray={peopleArray} state={state} dispatch={dispatch}/> : <StartMenu/>}
        {started ? <Timer Active={Active} setActive={setActive}/> : null}
        <Canvas
        className={"canvas"}
        colorManagement 
        onCreated={({ gl }) => gl.setClearColor('lightblue')}
        shadowMap
        style={{filter: showUI && mql ? "blur(5px)": "none" }}
        >
          <Camera 
          position={[(scrollPosition/10)-20, 15, 45]}
          rotation={[-Math.PI / 8, 0, 0]}
          fov={70}
          />
            <Stats
              showPanel={0} // Start-up panel (default=0)
              className="stats" // Optional className to add to the stats container dom element
               // All stats.js props are valid
            />
            <Lights/>
            <Floor/>
            {started ? <Suspense fallback={<Html style={{position:"absolute", left:"50%", top:"50%"}}><div className={styles.loading}><h1>Loading...</h1></div></Html>}>
              <People Active={Active} peopleArray={peopleArray} state={state}/>
            </Suspense>: null}
        {/* <OrbitControls/> */}
      </Canvas>
      
      </>
    )
}

//UI

  const Timer = ({setActive, Active}) => {

    let [countdown, setCountdown] = useState(5);
    const props = useSpring({transform: Active ? "scale(0)": "scale(1)"});


    useEffect(() => {  

      if (countdown > 0) {
        const timer = setTimeout(() => {
          setCountdown(countdown -  1);
        }, 1000);
      //console.log("TICK")
      } else setActive(true);
    })


    return (
      <animated.div style={props} className={styles.timer}>
          <h1>{countdown}</h1>
        </animated.div> 
    )
  }

  const StartMenu = ()=> {
    return (
      <div className={styles.StartMenu}>
        <h3>Ready to Start?</h3>
        <button>Start Task</button>
      </div>
    )
  }

  const AllergyCounter = ({dispatch, peopleArray, currentAllergies, showUI, mql}) => {

    const [display, setDisplay] = useState(true);

    const props = useSpring({bottom: display ? "0vh": "-40vh"});

    console.log(currentAllergies);

    const totalAllergies = currentAllergies.filter(function(allergy){
      return allergy.quantity > 0
    })

    console.log(totalAllergies);

    const checkCount = () => {
      console.log("checking the count of allergies against the users input");
      console.log(totalAllergies);
      let i = 0;
      let incorrect = 0;
      let incorrectPeople = 0;
      for (i = 0; i < totalAllergies.length; i++) {
        if (totalAllergies[i].inputQuantity === totalAllergies[i].quantity) {
          console.log(totalAllergies[i].name + " correct!");
        } else {
          incorrect++
          console.log(totalAllergies[i].quantity);
          incorrectPeople += totalAllergies[i].quantity;
        }
      }

      if (incorrect > 0) {
        alert("incorrect! You got wrote down" + incorrect  + "/" + totalAllergies.length + " of allergies incorrectly. " + incorrectPeople + " people had an averse allergic reaction today...");
      } else {
        alert("correct!");

      }
    }

    return (
      <animated.div style={{filter: showUI && mql ? "blur(5px)": "none", bottom: props.bottom}} className={styles.container}>
        <header>
        <h2 onClick={()=> (display? setDisplay(false): setDisplay(true))}>Allergen List {display ? <span alt="shrinkable" style={{writingMode: "vertical-rl"}}>&gt;</span> : <span alt="expandable" style={{writingMode: "vertical-rl"}}>&lt;</span>}</h2>
        </header>
          <div className={styles.inner}>
          {currentAllergies.map((allergy, index) => (
  <div key={index} className={styles.item}>
      <label>
        <p style={{color:`${allergy.color}`, fontWeight:"bold", fontSize:"3em", lineHeight:"0.3em"}}>.</p>
        {allergy.tagName}
      </label>
      <div className={styles.itemInner}>

        <p className={styles.quantity}>{allergy.inputQuantity}</p>
        <button className={styles.radioButton} onClick={() => dispatch(allergyQuantity(allergy.tagName, 'decrease'))}>-</button>
        <button className={styles.radioButton} onClick={() => dispatch(allergyQuantity(allergy.tagName, 'increase'))}>+</button>
      </div>
    </div>
))}
          </div>
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
  
  const Floor = ({onClick}) => {

    return (
      <>
        <mesh
          onClick={onClick} 
          receiveShadow 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, -3, 0]}
        >
          <planeBufferGeometry attach='geometry' args={[120, 50]}/>
          <meshStandardMaterial color={"rgb(200, 200, 200)"} opacity={1} attach='material'/>
        </mesh>
      </>
    )
  }


  const People = ({peopleArray, Active}) => {

    return (
      <>
      {peopleArray.map((allergy, id)=> (
        <Person Active={Active} key={id} color={allergy.color}/>
        )
      )}
      </>
    )
  }
  
  const Person = ({Active, color}) => {

    const {nodes} = useLoader(GLTFLoader, "assets/models/npc.glb");
    
    let person = useRef();

    const [bobbing, setBobbing] = useState(true);
    const [delay, setDelay] = useState(Math.random()* 100);

    const [properties, setProperties] = useState({
      position: [(Math.random()*100) - 50, 1, Math.random() * 25], 
      color: [Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255)],
      popup: false,
      }
    );

    setTimeout(

    useFrame(()=> {

      if (delay > 0) {
        setDelay(delay - 1);
      }

      if (delay < 0 && person.current) {

        if (person.current.position.y > 1.5) {
          
          setBobbing(false);
        }
        
        if (person.current.position.y < 1) {
          
          setBobbing(true);
        }

        if (bobbing && person.current) {
          person.current.position.y += 0.01;
        } else {
          person.current.position.y -= 0.01;
        }
      } 
    }), properties.delay) 
  
    return (
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
                {!Active? <p 
                  style={{transform: "translateY(-50px)",marginBottom:"1em",padding:"5px",borderRadius:"50%", backgroundColor:`${color}`, width:"180%", zIndex:"-3", fontWeight:"bold", color:"green"}}
                > </p>: null}
            </Html>
            <meshStandardMaterial 
                attach="material" 
                cast
                color={`rgb(${properties.color})`}
            />
            
        </mesh>
    )
  }

export default Allergies;