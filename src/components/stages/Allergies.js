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
import { allergyQuantity, allergyLevel, allergyReset, addPoints, finishLevel, showInfo, getBadge } from '../redux/actions';

//Components
import InfoBubble from '../InfoBubble';
import Loading from '../Loading';
import Help from '../Help';

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
    const [localState, setLocalState] = useState(0);

    const [currentAllergies, setCurrentAllergies] = useState([]);
    const [peopleArray, setPeopleArray] = useState([]);

    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) - 100

    const DisableRender = () => useFrame(() => null, 1000);// Performance Optimisation to pause rendering while the UI is open.
    
    //tracking scroll position
    const onScroll = () => {
      const scrollTop = scrollbar.current.scrollLeft
      setScrollPosition((scrollTop/scrollbar.current.scrollWidth)* 1000);
      console.log("scroll camera " + Math.floor(scrollPosition/10) + " %")
    }

    //Reset Level by resetting the state
    useEffect(()=> {
      if (gameState !== 0) {
        dispatch(allergyReset());
        setLocalState(0);
      }
    },[gameState, dispatch])

    useEffect(()=> {
      dispatch(allergyReset());
    },[])
    
    //Change Allergy Level/Difficulty
    useEffect(()=> {
      if (level) {
        console.log(level);
        dispatch(allergyLevel(level));
      }

    }, [level, dispatch])

    //Start or Finish the level, depending on the local game state
    const handleClick = () => {
      if (localState === 0) {
        setLocalState(1);
      } else if (localState === 3) {
        dispatch(finishLevel());
      } else if (localState === 4) {
        dispatch(finishLevel());
      }
    }
    
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
          <div style={{display: "flex", width:"500vh", height:"5px"}}>
          </div>
        </div>: null}

        {localState === 2 ? <AllergyCounter setLocalState={setLocalState} currentAllergies={currentAllergies} mql={mql} displayingUI={displayingUI} peopleArray={peopleArray} state={state} dispatch={dispatch}/> : null}
        <Timer level={level} displayingUI={displayingUI} onClick={handleClick}  localState={localState} setLocalState={setLocalState}/>
        {!displayingUI &&  localState === 2 ? <AllergenChart mql={mql}/>: null}
        {!displayingUI && localState !== 2 ? <Help open message="Scroll/Drag Horizontally to move around the room, and keep count of the allergenic customers to win." /> : null}
        <Canvas
        resize={{ polyfill: ResizeObserver }}
        className={"canvas"}
        pixelRatio={info.performance === 0 ? 0.25 : info.performance === 1 ? 0.5 : 1}
        shadowMap
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
          <Suspense fallback={<Loading/>}>
            <Lights/>
            <Floor/>
              <Table position={[-5, -2, -30]}/>
              <Table position={[-20, -2, -20]} onClick={()=> dispatch(showInfo('allergens'))}/>
              <Table position={[-35, -2, -30]}/>

              <BuffetTable position={[10, -2, -15]}/>
              <BuffetTable position={[30, -2, -15]} onClick={()=> dispatch(showInfo('buffet'))}/>
              <BuffetTable position={[50, -2, -15]}/>

              <Table position={[70, -2, -20]} onClick={()=> dispatch(showInfo('allergens'))}/>
              <Table position={[85, -2, -10]}/>
              <Table position={[100, -2, -20]}/>

              <People dispatch={dispatch} localState={localState} peopleArray={peopleArray}/>
              
              <BackgroundPerson localState={localState}/>
              <BackgroundPerson localState={localState}/>
              <BackgroundPerson localState={localState}/>
              <BackgroundPerson localState={localState}/>
              <BackgroundPerson localState={localState}/>
              <BackgroundPerson localState={localState}/>
              <BackgroundPerson localState={localState}/>
              <BackgroundPerson localState={localState}/>
              <BackgroundPerson localState={localState}/>
              <BackgroundPerson localState={localState}/>
              <BackgroundPerson localState={localState}/>
              <BackgroundPerson localState={localState}/>
              <BackgroundPerson localState={localState}/>
              <BackgroundPerson localState={localState}/>
              <BackgroundPerson localState={localState}/>
              <BackgroundPerson localState={localState}/>
              <BackgroundPerson localState={localState}/>
              <BackgroundPerson localState={localState}/>
            </Suspense>
        {/* <OrbitControls/> */}
      </Canvas>
      
      </>
    )
}

//UI

  const Timer = ({setLocalState, localState, level, onClick, displayingUI}) => {

    let [countdown, setCountdown] = useState(0);

    const props = useSpring({backgroundColor: localState === 3 ? "rgb(100, 255, 100)" : "rgb(245, 55, 55)" , transform:  localState === 2 ? "scale(0)": localState === 0 ? "scale(0.6)" : "scale(1)", opacity: displayingUI ? "0" : "1"});
    
    console.log(countdown);
    console.log(localState);

    useEffect (()=> {
      if (localState = 1) {
        if (level === 1) {
          setCountdown(15);
        } else if (level === 2) {
          setCountdown(60);
        } else if (level === 3) {
          setCountdown(120);
        }
      }
      
    },[level, localState])

    useEffect(() => {
      console.log(countdown);
      if (localState === 1) {
        if ( countdown > 0) {
          const interval = setInterval(() => {
          console.log(localState);
          console.log(countdown);
          console.log("cleanup");
          setCountdown(prevState => prevState -  1);
          console.log(countdown);
          
          }, 1000);
          return () => clearInterval(interval);
        } else {
          console.log(localState);
          setLocalState(2);
        }
      }

    }, [countdown, localState])

    return (
      <animated.div style={props} onClick={onClick} className={styles.timer}>
          <h1>{localState === 0 ? "Start":  localState === 3 ? "Finish" : localState === 4 ? "You Lost" : countdown}</h1>
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
            <img alt="peanut" src="../../assets/svg/egg.svg"/>
            <p>Peanut</p>
          </figure>
          <figure style={{ backgroundColor:"#00ff04"}}>
          <img alt="Egg" src="../../assets/svg/egg.svg"/>
            <p>Vegan</p>
          </figure>
          <figure style={{ backgroundColor:"#ede8e1"}}>
            <img alt="Egg" src="../../assets/svg/egg.svg"/>
            <p>Dairy</p>
          </figure>
          <figure style={{ backgroundColor:"#006302"}}>
            <img alt="Egg" src="../../assets/svg/egg.svg"/>
            <p>Vegetarian</p>
          </figure>
          <figure style={{ backgroundColor:"#ecf233"}}>
            <img alt="Egg" src="../../assets/svg/egg.svg"/>
            <p>Eggs</p>
          </figure>
          <figure style={{ backgroundColor:"#f542e9"}}>
            <img alt="Egg" src="../../assets/svg/egg.svg"/>
            <p>Mustard</p>
          </figure>
          <figure style={{ backgroundColor:"#000000"}}>
            <img alt="Egg" src="../../assets/svg/egg.svg"/>
            <p>Other</p>
          </figure>
        </section>
      </animated.div>
    )
  }

  const AllergyCounter = ({dispatch, setLocalState, currentAllergies, displayingUI, mql}) => {

    const [hidden, setHidden] = useState(true);

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
        alert("incorrect! You got wrote down" + incorrect  + "/" + totalAllergies.length + " of allergies incorrectly. " + incorrectPeople + " people were counted wrong. If you arent sure the count is right, let you manager know!");
        dispatch(addPoints(10*correctPeople));
        dispatch(getBadge('firstLoss'));
        setLocalState(4)//Finish Level, but Failed

      } else {
        alert("Correct! Every customer with dietary requirements got their correct meal, perfect work.");
        dispatch(addPoints(500));
        setLocalState(3)//Finish Level, and Won
      }
    }

    return (
      <>
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
        <button onClick={checkCount} className={styles.submit}><h4>Confirm</h4></button>
      </animated.div>
      {hidden ? 
      <div className={styles.arrow}>
        <div>
          Click the <span style={{fontWeight: "bold"}} >Allergen List </span> below, and fill in the allergen count using the Chart
        </div>
        <svg height="150" width="150">
            <polygon points="0,0 150,0 75,100" class="triangle" />
            Sorry, your browser does not support inline SVG.
        </svg>
      </div>
      : null}
      </>
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
          color="#f5d7b0"
          position={[0, 10, 5]}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={100}
          shadow-camera-left={-100}
          shadow-camera-right={100}
          shadow-camera-top={100}
          shadow-camera-bottom={-100}
        />
        <ambientLight
          intensity={0.3}
        />
      </>
    )
  }
  
//Meshes
  
  const Floor = ({onClick}) => {

    const {nodes} = useLoader(GLTFLoader, "../../assets/models/conference-room.glb");

    console.log(nodes)

    return (
      <>
        <mesh
          onClick={onClick} 
          receiveShadow
          position={[0, -3, 0]}
          geometry={nodes.room.geometry}
        >
          
          <meshStandardMaterial color={"rgb(200, 200, 200)"} attach='material'/>
        </mesh>
      </>
    )
  }

  const People = ({peopleArray, dispatch, localState}) => {
    console.log(peopleArray);
    return (
      <>
      {peopleArray.map((allergen, id)=> (
        <Person dispatch={dispatch} localState={localState} key={id} tagName={allergen.tagName} color={allergen.color}/>
        )
      )}
      </>
    )
  }
  
  const Person = ({ localState, color, dispatch, tagName}) => {

    const {nodes} = useLoader(GLTFLoader, "../../assets/models/npc.glb");
    
    let person = useRef();

    const [bobbing, setBobbing] = useState(true);
    const [delay] = useState((Math.random()* 1000) + 1500);

    const [properties] = useState({
      position: [(Math.random()*100) - 50, 1, Math.random() * 25], 
      color: [Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255)],
      popup: false,
      }
    );

    setTimeout(

    useFrame(()=> {
      if (person.current && localState === 1) {
        
        setTimeout(() => {
          console.log("tick");
            if (bobbing) {
              setBobbing(false);
            } else {
              setBobbing(true);
            } 
        }, delay);


        if (bobbing) {
          //person.current.position.y += 0.01;
          person.current.position.x += 0.1;
        } else {
            //person.current.position.y -= 0.01;
            person.current.position.x -= 0.1;
          
        }
    } 
    }), properties.delay) 
  
    return (
        <mesh 
          args={[1, 1, 1]}
          position={properties.position}
          ref={person}
          visible 
          castShadow
          geometry={nodes.npc.geometry}>
            <Html
                zIndexRange={[1, 0]}
                scaleFactor={50}
            >
                {localState === 1 ? <p 
                  style={{transform: "translateY(-50px)",marginBottom:"1em",padding:"10px",borderRadius:"50%", backgroundColor:`${color}`, width:"180%", zIndex:"-3", fontWeight:"bold", color:"green"}}
                ></p>: null} 
            </Html>
            {localState === 3 ? <InfoBubble color={color} scaleFactor={70} sign="!" onClick={()=> dispatch(showInfo(tagName))}/>: null}
            <meshStandardMaterial 
                attach="material" 
                cast
                color={`rgb(${properties.color})`}
            />
            
        </mesh>
    )
  }

// Background Objects

const BackgroundPerson = ({ localState }) => {

  const {nodes} = useLoader(GLTFLoader, "../../assets/models/npc.glb");
  
  let person = useRef();

  const [bobbing, setBobbing] = useState(true);

  const [delay] = useState((Math.random()* 1000) + 1500);

  const [properties] = useState({
    position: [(Math.random()*100) - 50, 1, Math.random() * 25], 
    color: [Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255)],
    popup: false,
    }
  );

  setTimeout(

  useFrame(()=> {
    if (person.current && localState === 1) {
      
      setTimeout(() => {
        console.log("tick");
          if (bobbing) {
            setBobbing(false);
          } else {
            setBobbing(true);
          } 
          
      }, delay);


      if (bobbing) {
        //person.current.position.y += 0.01;
        person.current.position.x += 0.1;
      } else {
          //person.current.position.y -= 0.01;
          person.current.position.x -= 0.1;
        
      }
  } 
  }), properties.delay) 

  return (
      <mesh 
        args={[1, 1, 1]}
        position={properties.position}
        ref={person}
        visible
        castShadow
        geometry={nodes.npc.geometry}>
          <meshStandardMaterial 
              attach="material" 
              cast
              color={`rgb(${properties.color})`}
          />
          
      </mesh>
  )
}

const Table = ({ position, onClick }) => { 

  return (
    <mesh  position={position}>
      <cylinderGeometry attach="geometry" args={[4, 4, 2, 8]}/>
      <meshLambertMaterial color="#a8130d"/>
      {onClick ? <InfoBubble scaleFactor={75} sign="?" color="gray" onClick={onClick}/>: null}
    </mesh>
  )
}

const BuffetTable = ({ position, onClick }) => { 

  return (
    <mesh  position={position}>
      <boxBufferGeometry attach="geometry" args={[12, 4, 4]}/>
      <meshLambertMaterial color="#2159a3"/>
      {onClick ? <InfoBubble scaleFactor={75} sign="?" color="gray"  onClick={onClick}/>: null}
    </mesh>
  )
}


export default Allergies;