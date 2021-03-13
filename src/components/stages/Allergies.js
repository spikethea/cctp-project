import React, {useRef, useState, useEffect, Suspense} from 'react';
import styles from './Allergies.module.css';
import { ResizeObserver } from '@juggle/resize-observer';// Resize Observer for safari compatibility

//Packages
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber'
import {Html} from 'drei';
import {useSpring, animated} from 'react-spring';

import { a } from '@react-spring/three';

import { useSelector, useDispatch } from 'react-redux';

//Redux
import { allergyQuantity, allergyLevel, allergyRestart, addPoints, finishLevel } from '../redux/actions';

//SVG
import egg from '../../assets/svg/egg.svg';

const Allergies = () => {
    // Redux
    const dispatch = useDispatch();
    const state = useSelector(state => state.allergies);
    const info = useSelector(state => state.info);
    const gameState = info.gameState;

    const level = info.level;

    const displayingUI = info.displayingUI
    let mql = window.matchMedia('(max-width: 1200px)').matches;

    //Hooks
    const scrollbar = useRef(null);

    const [scrollPosition, setScrollPosition] = useState(0);
    const [active, setActive] = useState(false);

    const [currentAllergies, setCurrentAllergies] = useState([]);
    const [peopleArray, setPeopleArray] = useState([]);

    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) - 50

    const DisableRender = () => useFrame(() => null, 1000);// Performance Optimisation to pause rendering while the UI is open.
    
    //tracking scroll position
    const onScroll = () => {
      const scrollTop = scrollbar.current.scrollLeft
      setScrollPosition((scrollTop/scrollbar.current.scrollWidth)* 1000);
      console.log("scroll camera " + Math.floor(scrollPosition/10) + " %")
    }

    //Reset Level by resetting the state
    useEffect(()=> {
      if (gameState === 1) {
        dispatch(allergyRestart());
        setActive(false);
      }
    },[gameState, dispatch])
    
    //Change Allergy Level/Difficulty
    useEffect(()=> {
      if (level) {
        console.log(level);
        dispatch(allergyLevel(level));
      }

    }, [level, dispatch])
    
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
        {!displayingUI ? <div className={styles.scrollbar} ref={scrollbar} style={{height:`${vh}px`}} onScroll={onScroll}>
          <div style={{display: "flex", width:"500vh"}}>
              <p className={styles.scrollDown}>Scroll/Drag Horizontally to Move the Camera!</p>
          </div>
        </div>: null}

        { active ? <AllergyCounter currentAllergies={currentAllergies} mql={mql} displayingUI={displayingUI} peopleArray={peopleArray} state={state} dispatch={dispatch}/> : null}
        {!displayingUI && gameState === 2 ? <Timer level={level}   active={ active} setActive={setActive}/> : null}
        {!displayingUI &&  active && gameState === 2 ? <AllergenChart mql={mql}/>: null}
        <Canvas
        resize={{ polyfill: ResizeObserver }}
        className={"canvas"}
        colorManagement 
        onCreated={({ gl }) => gl.setClearColor('lightblue')}
        shadowMap
        style={{filter: displayingUI && mql ? "blur(5px)": "none" }}
        >
          {displayingUI && mql && <DisableRender />} 
          <Camera 
          position={[(scrollPosition/10)-40, 15, 45]}
          rotation={[-Math.PI / 8, 0, 0]}
          fov={70}
          />
            <Lights/>
            <Floor/>
            {gameState === 2 ? <Suspense fallback={<Html style={{position:"absolute", left:"50%", top:"50%"}}><div className={styles.loading}><h1>Loading...</h1></div></Html>}>
              <People  active={ active} peopleArray={peopleArray} state={state}/>
            </Suspense>: null}
        {/* <OrbitControls/> */}
      </Canvas>
      
      </>
    )
}

//UI

  const Timer = ({setActive, active, level}) => {

    let [countdown, setCountdown] = useState(15);
    const props = useSpring({transform:  active ? "scale(0)": "scale(1)"});
    
    console.log(countdown);

    useEffect (()=> {
      if (level === 1) {
        setCountdown(15);
      } else if (level === 2) {
        setCountdown(50);
      } else if (level === 3) {
        setCountdown(90);
      }
    },[level])


    useEffect(() => {
      console.log(countdown);
      if (countdown > 0 && !active) {
        const interval = setInterval(() => {
          console.log(active);
          console.log(countdown);
          console.log("cleanup");
          setCountdown(prevState => prevState -  1);
          console.log(countdown);
          
        }, 1000);
        return () => clearInterval(interval);

      } else {
        console.log(active);
        setActive(true);
      };
    }, [active, countdown, setActive])

    return (
      <animated.div style={props} className={styles.timer}>
          <h1>{countdown}</h1>
        </animated.div> 
    )
  }

  const AllergenChart = ()=> {

    const [hidden, setHidden] = useState(false);

    const props = useSpring({maxHeight: hidden ? "40px": "300px"});

    const handleClick = () => {
      console.log("toggled allergen chart");
      if (hidden) {
        setHidden(false);
      } else {
        setHidden(true);
      }
      console.log(hidden);
      
    }

    return (
      <animated.div style={props} className={styles.chart}>
        <header onClick={handleClick}><h3>{hidden ? <span alt="expandable" style={{writingMode: "vertical-rl"}}>&gt;</span> : <span alt="shrinkable" style={{writingMode: "vertical-rl"}}>&lt;</span>} Allergen Chart</h3></header>
        <section >
        <figure style={{ backgroundColor:"#f7be5c"}}>
            <img alt="peanut" src={egg}/>
            <p>Peanut</p>
          </figure>
          <figure style={{ backgroundColor:"#00ff04"}}>
          <img alt="Egg" src={egg}/>
            <p>Vegan</p>
          </figure>
          <figure style={{ backgroundColor:"#ede8e1"}}>
            <img alt="Egg" src={egg}/>
            <p>Dairy</p>
          </figure>
          <figure style={{ backgroundColor:"#006302"}}>
            <img alt="Egg" src={egg}/>
            <p>Vegetarian</p>
          </figure>
          <figure style={{ backgroundColor:"#ecf233"}}>
            <img alt="Egg" src={egg}/>
            <p>Eggs</p>
          </figure>
          <figure style={{ backgroundColor:"#f542e9"}}>
            <img alt="Egg" src={egg}/>
            <p>Mustard</p>
          </figure>
          <figure style={{ backgroundColor:"#000000"}}>
            <img alt="Egg" src={egg}/>
            <p>Other</p>
          </figure>
        </section>
      </animated.div>
    )
  }

  const AllergyCounter = ({dispatch, currentAllergies, displayingUI, mql}) => {

    const [hidden, setHidden] = useState(false);

    const props = useSpring({maxHeight: hidden ? "3em": "35em"});

    
    const totalAllergies = currentAllergies.filter(function(allergy){
      return allergy.quantity > 0
    })

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

      let correctPeople = totalAllergies.length - incorrect;

      if (incorrect > 0) {
        alert("incorrect! You got wrote down" + incorrect  + "/" + totalAllergies.length + " of allergies incorrectly. " + incorrectPeople + " people had an averse allergic reaction today...");
        dispatch(addPoints(10*correctPeople));
        dispatch(finishLevel());

      } else {
        alert("correct!");
        dispatch(addPoints(500));
        dispatch(finishLevel());
      }
    }

    return (
      <animated.div style={{display: displayingUI && mql ? "none": "block", maxHeight: props.maxHeight}} className={styles.container}>
        <header>
        <h3 onClick={()=> (hidden ? setHidden(false): setHidden(true))}>Allergen List {hidden ?<span alt="expandable" style={{writingMode: "vertical-rl"}}>&lt;</span> : <span alt="shrinkable" style={{writingMode: "vertical-rl"}}>&gt;</span> }</h3>
        </header>
          <div className={styles.inner}>
          {currentAllergies.map((allergy, index) => (
            <div key={index} className={styles.item}>
                <label>
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
  useEffect(() => void setDefaultCamera(ref.current), [setDefaultCamera])
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


  const People = ({peopleArray,  active}) => {

    return (
      <>
      {peopleArray.map((allergy, id)=> (
        <Person  active={active} key={id} color={allergy.color}/>
        )
      )}
      </>
    )
  }
  
  const Person = ({ active, color}) => {

    const {nodes} = useLoader(GLTFLoader, "../../assets/models/npc.glb");
    
    let person = useRef();

    const [bobbing, setBobbing] = useState(true);
    const [delay, setDelay] = useState(Math.random()* 100);

    const [properties] = useState({
      position: [(Math.random()*100) - 50, 1, Math.random() * 25], 
      color: [Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255)],
      popup: false,
      }
    );

    setTimeout(

    useFrame(()=> {
      if (person.current) {

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
          person.current.position.x += 0.1;
        } else {
          if (!active) {
            person.current.position.y -= 0.01;
            person.current.position.x -= 0.1;
          }
          
        }
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
                {! active? <p 
                  style={{transform: "translateY(-50px)",marginBottom:"1em",padding:"5px",borderRadius:"50%", backgroundColor:`${color}`, width:"180%", zIndex:"-3", fontWeight:"bold", color:"green"}}
                ></p>: null}
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