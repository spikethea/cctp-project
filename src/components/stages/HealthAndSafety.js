import React, {useRef, useState, useEffect, Suspense} from 'react';
import styles from './HealthAndSafety.module.css';
import { ResizeObserver } from '@juggle/resize-observer';// Resize Observer for safari compatibility

//Packages
import * as THREE from 'three';
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { animated, useSpring } from '@react-spring/three';

//Redux
import {  useDispatch, useSelector } from 'react-redux';
import { addPoints, getBadge, showInfo, finishLevel } from '../redux/actions';

// Components
import Loading from '../Loading';
import InfoBubble from '../InfoBubble';
import Help from '../Help'
import { TextureLoader } from 'three';

const HealthAndSafety = () => {

    const dispatch = useDispatch();
    const info = useSelector(state => state.info);
    const level = info.level;
    const gameState = info.gameState

    const showUI = info.displayingUI;
    let mql = window.matchMedia('(max-width: 1200px)').matches;

    const [progress, setProgress] = useState(0);
    const [max, setMax] = useState(2);
    const [levelFinished, setLevelFinished] = useState(false)

    const [cameraPosition, setCameraPosition] = useState([0, 2, 5]);
    const [rotationDir, setRotationDir] = useState(false);
    const [cameraRotating, setCameraRotating] = useState(false);

    const DisableRender = () => useFrame(() => null, 1000);// Performance Optimisation to pause rendering while the UI is open.
    
    // UseEffect 
    useEffect(()=> {
      if (progress === max) {
        dispatch(getBadge('oneHundredPercent'));
        setLevelFinished(true);
      }
    },[progress, dispatch, max])
    
    // Setting difficult (number of Hazards) for the current Level
    useEffect(()=> {
      if (level === 1) {
        setMax(3)
      } else if (level === 2)
       {
         setMax(5)
      }

    }, [level])
    //When the level is restarted, reset all the state 
    useEffect(()=>{
      if (gameState === 1) {
        setProgress(0);
        setCameraPosition([0, 2, 5]);
        setCameraRotating(false);
        setLevelFinished(false);
      }
    },[gameState])

    // Event Listeners
    const lookRight = () => {
      setRotationDir(true)
      setCameraRotating(true)
    }

    const lookLeft = () => {
      setRotationDir(false)
      setCameraRotating(true)
    }

    const handleLeave = () => {
      setCameraRotating(false);
    }

    const handleWin = () => {
      if (levelFinished) {
        dispatch(finishLevel());
      }
    }

    return (
      <>
      {!showUI ? 
      <div onClick={handleWin} className={styles.progress}>
        
        <svg className={styles.ring} width="100" height="100" viewBox="50 50 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle strokeDasharray="628" fill="none" cx="100" cy="100" r="50" stroke="white" strokeWidth="5"/>
        </svg>

        <svg  className={styles.stroke} width="100" height="100" viewBox="50 50 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle style={{stroke: levelFinished ? "rgb(100, 255, 100)" : null}} strokeDashoffset={314 - ((314/max)*progress)} cx="100" cy="100" r="50"/>
        </svg>

        <h1 style={{filter: levelFinished ? "drop-shadow(0px 0px 4px rgba(0,0,0, 0.8))" : null}}>{!levelFinished ? progress + "/"+ max : "Finish"}</h1>
      </div> : null}
      
      <div style={{display: showUI && mql ? "none" : "flex"}} className={styles.navigation}>
          <svg style={{filter: cameraRotating && rotationDir ? "drop-shadow(2px 4px 6px black)": null}} onMouseUp={()=> handleLeave()} onMouseDown={()=> lookRight()} onTouchStart={()=> lookRight()} onTouchEnd={()=> handleLeave()} height="50" width="50">
          <polygon stroke="#6f6f8c" points="50,50 50,0 0,25" className="triangle">Left</polygon>
          </svg>
          <svg style={{filter: cameraRotating && !rotationDir ? "drop-shadow(2px 4px 6px black)": null}} onMouseUp={()=> handleLeave()} onMouseDown={()=> lookLeft()} onTouchStart={()=> lookLeft()} onTouchEnd={()=> handleLeave()} height="50" width="50">
            <polygon stroke="#6f6f8c" points="0,0 50,25 0,50" className="triangle">Right</polygon>
          </svg>
      </div>
      <Help message="click/tap on the blue teleportation pads around the room, to get a closer view. If you can't find all hazards, try looking above and below."/>
        <Canvas
        resize={{ polyfill: ResizeObserver }}
        pixelRatio={info.performance === 0 ? 0.25 : info.performance === 1 ? 0.5 : 1}
        className={"canvas"}
        colorManagement 
        onCreated={({ gl }) => gl.setClearColor('black')}
        shadowMap
        style={{position:"fixed", left:"0%", top:"0%", filter: showUI && mql ? "blur(5px)":"none" }}
        >
          <fog attach="fog" args={["black", 15, 50]}/>
          {showUI && mql && <DisableRender />} 
          <Camera direction={rotationDir} rotating={cameraRotating} position={cameraPosition}/>
          {gameState === 2 && level === 1 ? <Scene1 setCameraPosition={setCameraPosition} progress={progress} setProgress={setProgress} dispatch={dispatch}/>: null}
          {gameState === 2 && level === 2 ? <Scene2 cameraPosition={cameraPosition} setCameraPosition={setCameraPosition} progress={progress} setProgress={setProgress} dispatch={dispatch}/> : null}
        </Canvas>
      </>
    )
}

const Teleportation = ({setCameraPosition, position}) => {

  let localPosition = position

  const { nodes, materials } = useLoader(GLTFLoader, "../../assets/models/teleport.glb");

  const handleClick = ()=> {
    setCameraPosition([position[0], position[1] + 2, position[2]]);
  }

  return (
    <mesh onClick={()=> handleClick()} scale={[0.5, 0.5, 0.5]} position={localPosition} geometry={nodes.Circle.geometry} material={materials["Material.001"]}/>
  )
}

// Custom Camera

function Camera({position, direction, rotating}) {

  const ref = useRef();
  const { setDefaultCamera} = useThree();

  //const props = useSpring({position: change ? })

  //useEffect(()=> {

  //} ,[position])
  



  useFrame(({camera})=> {
    if (rotating) {
      if (direction) {
        camera.rotation.y += 0.03;
      } else {
        camera.rotation.y -= 0.03;
      }

      ref.current.updateMatrixWorld()
    }

  })
  
  // Make the camera known to the system
  useEffect(() => void setDefaultCamera(ref.current), [setDefaultCamera])

  return <animated.perspectiveCamera ref={ref} fov={90} position={position}/>
}


//Scene
const Scene1 = ({dispatch, setProgress, setCameraPosition}) => {

  return (
    <>
      <ambientLight
      intensity={0.2}
      />
      
      <Suspense fallback={<Loading/>}>
        {/* <pointLight position={[0, 3, -2]} intensity={1.55} /> */}
        <SmallKitchen/>
        <FireAlarm position={[3.5, 2, -4.5]} dispatch={dispatch}/>
        
        <FaultyLightbar position={[-2.5, 4, -2]} dispatch={dispatch} setProgress={setProgress}/>
        <Spillage position={[1, 0.1, -4]} dispatch={dispatch} setProgress={setProgress}/>
        <Meat position={[4.25, 1.15, 0.5]} dispatch={dispatch} setProgress={setProgress} />
        
        <Lightbar position={[2.5, 4, -2]}/>
        <Lightbar position={[-2.5, 4, 2]} rotation={[0, 90*(Math.PI/180), 0]}/>
        <Lightbar position={[2.5, 4, 2]} rotation={[0, 90*(Math.PI/180), 0]}/>

        <Teleportation position={[0, 0, 5]} setCameraPosition={setCameraPosition}/>
        <Teleportation position={[2.5, 0, 0]} setCameraPosition={setCameraPosition}/>
        <Teleportation position={[0, 0, -2]} setCameraPosition={setCameraPosition}/>
        
        
      </Suspense>
    </>
  )
}

const Scene2 = ({cameraPosition, dispatch, setProgress, progress, setCameraPosition}) => {

  useEffect(()=>{
    setCameraPosition([0, 2, 8]);
  },[setCameraPosition])

  return (
    <>
      <ambientLight
      intensity={0.2}
      />
      
      <Suspense fallback={<Loading/>}>
        {/* <pointLight position={[0, 3, -2]} intensity={1.55} /> */}
        <MainKitchen/>

        <BinBag cameraPosition={cameraPosition} position={[6, 0, -4]} dispatch={dispatch}/>

        <FireAlarm position={[0, 2, -4.5]} dispatch={dispatch}/>

        <FireAlarm rotation={[0, 90*(Math.PI/180), 0]} position={[-4.8, 2.4, -1.6]} dispatch={dispatch}/>
        
        <Sanitising position={[-4.5, 1.5, 2]}  dispatch={dispatch} />
        <DirtySurface position={[-4.5, 1.15, 4]}  dispatch={dispatch} setProgress={setProgress}/>
        <CrossContamination position={[0.38, 0.8, 0.8]} dispatch={dispatch} setProgress={setProgress}/>
        <ClutteredShelfBox position={[-2.8, 1.9, -4.4]} dispatch={dispatch} setProgress={setProgress}/>
        <ObstructionBoundingBox position={[2.8, 0, 5.8]} dispatch={dispatch} setProgress={setProgress}/>
        <FaultyLightbar position={[8, 4, 3]} rotation={[0, 90*(Math.PI/180), 0]} dispatch={dispatch} setProgress={setProgress}/>
        
        <Lightbar position={[8, 4, 0]} rotation={[0, 90*(Math.PI/180), 0]}/>

        <Lightbar position={[0, 4, 3]} rotation={[0, 90*(Math.PI/180), 0]}/>
        <Lightbar position={[0, 4, -2]} rotation={[0, 90*(Math.PI/180), 0]}/>

        <Lightbar position={[2.5, 4, 9]} />
        <Lightbar position={[-2.5, 4, 9]} />

        <Teleportation position={[0, 0, 8]} setCameraPosition={setCameraPosition}/>
        <Teleportation position={[-2.5, 0, 4]} setCameraPosition={setCameraPosition}/>
        <Teleportation position={[2.5, 0, 2]} setCameraPosition={setCameraPosition}/>
        <Teleportation position={[-2.5, 0, -2]} setCameraPosition={setCameraPosition}/>
        
        <Teleportation position={[8, 0, 1]} setCameraPosition={setCameraPosition}/>
        <Teleportation position={[12.2, 0, -1.1]} setCameraPosition={setCameraPosition}/>
      </Suspense>
    </>
  )
}
  
//Meshes
const Sanitising = ({position, dispatch}) => {// Need to, yknow

  return (
    <group position={position}>
      <InfoBubble scaleFactor={15} sign="?" color="gray" onClick={()=> dispatch(showInfo('cleanSurfaces'))}/>
      <SanitiserSpray rotation={[0, 0, 0]} position={[0, -0.4 , 0]}/>
    </group>
  )
}


const CrossContamination = ({position, dispatch, setProgress}) => {// Need to aniamte and add dispatch

  const [found, setFound] = useState(false)
  const props = useSpring({ position: found ? [0, 0.03, -1] : [0, 0.03, 0], yRotation: found ? [0, THREE.Math.degToRad(90), 0] : [0, THREE.Math.degToRad(15), 0]})

  const handleClick = ()=> {
    if (!found) {
      setFound(true);
      setProgress((prevState)=> prevState + 1);
      dispatch(addPoints(200));
    }
      
  }



  return (
    <group position={position}>
      {found ? <InfoBubble onClick={()=> dispatch(showInfo('crossContamination'))}/>: null}
      <ChoppingBoard  onClick={handleClick} color={"#E7595F"} position={[0, 0, 0]}/>{/* Red */}
      <ChoppingBoard onClick={handleClick} color={"#76c4e8"} position={props.position} rotation={props.yRotation}/>{/* Blue */}
    </group>
  )
}

const ObstructionBoundingBox = ({position, dispatch, setProgress}) => {

  const [found, setFound] = useState(false);

  const handleClick = ()=> {
    if (!found) {
      setFound(true);
      setProgress((prevState)=> prevState + 1);
    }
  }

  return (
    <mesh onClick={handleClick} position={position}>
      {found ? <InfoBubble onClick={()=> dispatch(showInfo('obstruction'))}/>: null}
      <meshBasicMaterial transparent={true} opacity={0} attach="material" color="white"/>
      <boxBufferGeometry attach="geometry" args={[1, 2, 1]}/>
    </mesh>
  )
}

const ClutteredShelfBox = ({position, dispatch, setProgress})=> {

  const [found, setFound] = useState(false);

  const handleClick = ()=> {
    if (!found) {
      setFound(true);
      setProgress((prevState)=> prevState + 1);
    }
  }

  return (
    <mesh onClick={handleClick} position={position}>
      {found ? <InfoBubble onClick={()=> dispatch(showInfo('overstacked'))}/>: null}
      <meshBasicMaterial transparent={true} opacity={0} attach="material" color="white"/>
      <boxBufferGeometry attach="geometry" args={[1.6, 0.5, 0.8]}/>
    </mesh>
  )
}

const DirtySurface = ({position, dispatch, setProgress}) => {// Need to, yknow

  const texture = useLoader(TextureLoader, '../../assets/images/textures/dirt.png')
  const [found, setFound] = useState(false);

  const props = useSpring({ position: found ? [0, 0.2, 0] : [0, 0.5, -2], rotation: found ? [60*(Math.PI/180), -10*(Math.PI/180), 0] : [0, 0, 0]})

  const handleClick = ()=> {
    if (!found) {
      setFound(true);
      setProgress((prevState) => prevState + 1);
      dispatch(addPoints(500));
    }
  }

  return (
    <group position={position}>
    {!found ? 
    <mesh onClick={handleClick} position={[0, 0, 0]} rotation={[-90*(Math.PI/180), 0, 0]}>
      <meshLambertMaterial transparent={true} attach="material" map={texture}/>
      <planeBufferGeometry  attach="geometry" args={[1, 1]}/>
    </mesh>
    :
    <>
      <InfoBubble onClick={()=> dispatch(showInfo('cleanSurfaces'))}/>
      <DetergentSpray rotation={props.rotation} position={props.position}/>
    </>
    }
    </group>
  )
}

const ChoppingBoard = ({color, opacity, position, rotation, style, onClick}) => {

  const { nodes } = useLoader(GLTFLoader, "../../assets/models/chopping-board.glb");

  return (
    <animated.mesh onClick={onClick} style={style} scale={[0.2, 0.2, 0.2]} geometry={nodes.Plane005.geometry} rotation={rotation} position={position}>
      <meshStandardMaterial
        transparent
        opacity={opacity}
        color={color}
      />
    </animated.mesh>
  )
}

const WetFloorSign = ({found, position}) => {

  const { nodes, materials } = useLoader(GLTFLoader, "../../assets/models/wet-floor-sign.glb");

  const props = useSpring({config: { tension: 70 }, position: found ? 0: 3, rotation: found ? 180*(Math.PI/180) : 30*(Math.PI/180)})

return (
  <animated.mesh visible={found} position={position} position-y={props.position} rotation={[0, 30*(Math.PI/180), 0]} rotation-y={props.rotation} geometry={nodes["wet-floor-sign"].geometry} material={materials["Material.001"]}>
  </animated.mesh>
)
}

const FlickeringLight = ({position, distance}) => {

  let light = useRef();
  const [dimming, setDimming] = useState(true)

  useFrame(()=> {
    if (light.current) {
      if (light.current.intensity > 0.1) {
      setDimming(true);
    } else if (light.current.intensity < 0.2) {
      setDimming(false);
    }

    if (dimming) {
      light.current.intensity -= 0.05;
    } else {
      light.current.intensity += 0.05;
    }
    }
    
  })

  return (
    <pointLight
          ref={light}
          width={3}
          height={3}
          distance={distance}
          color={"#f7f3eb"}
          intensity={0.6}
          position={position}
          penumbra={1}
        />
  )
}

const Lightbar = ({ position, rotation }) => {

  const { nodes, materials } = useLoader(GLTFLoader, "../../assets/models/lightbar-new.glb");

  return (
    <mesh rotation={rotation} scale={[0.1, 0.1, 1]} position={position} geometry={nodes["faulty-lightbar"].geometry} material={materials["Material.004"]}>
      <pointLight distance={10} color={"#f7f3eb"} intensity={0.7} position={[0, -1, 0]} />
    </mesh>
  )
}

const FaultyLightbar = ({ position, rotation, dispatch, setProgress }) => {

  const { nodes } = useLoader(GLTFLoader, "../../assets/models/lightbar-new.glb");

  const [found, setFound] = useState(false);
  const [dimming, setDimming] = useState(true);

  let lightbar = useRef();

  const handleClick = () => {
    if(!found) {
      setProgress((prevState) => prevState + 1);
      setFound(true);
      dispatch(addPoints(200));
    }
  }

  

  useFrame(()=> {
    if (lightbar.current) {

    if (!found) {
      if (lightbar.current.material.emissive.r > 0.2) {
        setDimming(true);
      } else if (lightbar.current.material.emissive.r < 8) {
        setDimming(false);
      }

      if (dimming) {
        lightbar.current.material.emissive.r -= 0.05;
        lightbar.current.material.emissive.g -= 0.05;
        lightbar.current.material.emissive.b -= 0.05;
      } else {
        lightbar.current.material.emissive.r += 0.05;
        lightbar.current.material.emissive.g += 0.05;
        lightbar.current.material.emissive.b += 0.05;
      }
    } else if (lightbar.current.material.emissive.r < 1){
      lightbar.current.material.emissive.r += 0.05;
      lightbar.current.material.emissive.g += 0.05;
      lightbar.current.material.emissive.b += 0.05;
    }

    }
    
  })

  return (
    <mesh ref={lightbar} onClick={handleClick} scale={[0.1, 0.1, 1]}  position={position} rotation={rotation} geometry={nodes["faulty-lightbar"].geometry} >
      <meshLambertMaterial emissive={[0.6, 0.6, 0.6]} color="#737373"/>
      {!found ? 
      <FlickeringLight distance={10} position={[0, 0, 0]}/>
      : 
      <>
      <InfoBubble onClick={()=> dispatch(showInfo("faultyLighting"))}/>
      <pointLight distance={10} color={"#f7f3eb"} intensity={3} position={[0, 0, 0]} />
      </>}
    </mesh>
  )
}


const SmallKitchen = ()=> {



  const gltf = useLoader(GLTFLoader, "../../assets/models/kitchen.glb");


  return (
    <primitive position={[0, 0, 0]} object={gltf.scene} />
  )

}

const MainKitchen = ()=> {



  const gltf = useLoader(GLTFLoader, "../../assets/models/main-kitchen.glb");


  return (
    <primitive position={[0, 0, 0]} object={gltf.scene} />
  )

}

const Spillage = ({setProgress, dispatch, position})=> {

  const { nodes, materials } = useLoader(GLTFLoader, "../../assets/models/puddle.glb");
  const [found, setFound] = useState(false); 
  const environment = useLoader(THREE.TextureLoader, "../../assets/images/textures/equirectangular.jpg") 

  environment.mapping = THREE.EquirectangularReflectionMapping;
  environment.encoding = THREE.sRGBEncoding;

  const clickBox = () => {
    if(!found) {
      setProgress((prevState) => prevState + 1);
      setFound(true);
      dispatch(addPoints(200));
    }

  }

  return (
  <>
    <WetFloorSign position={position} found={found}/>
    <mesh geometry={nodes.puddle.geometry} transparent opacity={0.5} onClick={clickBox} position={position}>
      <meshStandardMaterial opacity={0.1} roughness={0} metalness={0.95} envMap={environment} transparent={true} normalMap={materials["Material.003"].normalMap} map={materials["Material.003"].map}/>
      {found ? <InfoBubble onClick={()=> dispatch(showInfo("spillage"))}/> : null}
      </mesh>
      </>
  )

}

const FireAlarm = ({position, rotation, dispatch}) => {

  const { nodes } = useLoader(GLTFLoader, "../../assets/models/fire-alarm.glb");
  const [found, setFound] = useState(false);  
  const [light, setLight] = useState(false);

  let object = useRef();

  const environment = useLoader(THREE.TextureLoader, "../../assets/images/textures/equirectangular.jpg")
  environment.mapping = THREE.EquirectangularReflectionMapping;
  environment.encoding = THREE.sRGBEncoding;

  const clickBox = () => {
    if(!found) {
      setFound(true);
    }
  }

  

  useFrame(()=> {
    if (object.current) {

      let material = object.current.material;
      if (!found) {
        if (material.emissive.r > 0.4) {
          setLight(false);
        }

        if (material.emissive.r < 0) {
          setLight(true);
        }

        if (light) {
          material.emissive.r += 0.01;
          material.emissive.g += 0.01;
          material.emissive.b += 0.01;
        } else {
          material.emissive.r -= 0.01;
          material.emissive.g -= 0.01;
          material.emissive.b -= 0.01;
        }

      } else if (material.emissive.r > 0) {
        material.emissive.r = 0;
        material.emissive.g = 0;
        material.emissive.b = 0;
      }
    }
  })

  return (
    <>
    <mesh ref={object} scale={[0.6, 0.6, 0.6]} geometry={nodes.Cube013.geometry} rotation={rotation} onClick={clickBox} position={position}>
      <meshStandardMaterial  roughness={0.8} metalness={0.7} envMap={environment} color="red"/>
      {found ? <InfoBubble scaleFactor={15} sign="?" color="gray" onClick={()=> dispatch(showInfo("fireAlarm"))}/> : null}
      </mesh>
    </>
  )
}

const BinBag = ({position, rotation, dispatch, cameraPosition}) => {

  const { nodes } = useLoader(GLTFLoader, "../../assets/models/binbag.glb");
  const [found, setFound] = useState(false);  
  const [light, setLight] = useState(false);

  let object = useRef();

  const environment = useLoader(THREE.TextureLoader, "../../assets/images/textures/equirectangular.jpg")
  environment.mapping = THREE.EquirectangularReflectionMapping;
  environment.encoding = THREE.sRGBEncoding;

  const clickBox = () => {
    if(!found && cameraPosition[0] === 12.2) {// Double Checking that the player is in the right position to see the secret, in-case they click through the wall
      setFound(true);
      dispatch(getBadge("goodEye"))
    }
  }

  

  useFrame(()=> {
    if (object.current) {

      let material = object.current.material;
      if (!found) {
        if (material.emissive.r > 0.4) {
          setLight(false);
        }

        if (material.emissive.r < 0) {
          setLight(true);
        }

        if (light) {
          material.emissive.r += 0.01;
          material.emissive.g += 0.01;
          material.emissive.b += 0.01;
        } else {
          material.emissive.r -= 0.01;
          material.emissive.g -= 0.01;
          material.emissive.b -= 0.01;
        }

      } else if (material.emissive.r > 0) {
        material.emissive.r = 0;
        material.emissive.g = 0;
        material.emissive.b = 0;
      }
    }
  })

  return (
    <>
    <mesh ref={object} scale={[1, 1, 1]} geometry={nodes.binbag.geometry} rotation={rotation} onClick={clickBox} position={position}>
      <meshStandardMaterial  roughness={0.8} metalness={0.7} envMap={environment} color="black"/>
      </mesh>
    </>
  )
}

const DetergentSpray = ({position, rotation})=> {

  const { nodes, materials } = useLoader(GLTFLoader, "/assets/models/detergent-spray.glb");

  return (
    <animated.mesh position={position} rotation={rotation} material={materials["Material.001"]} geometry={nodes.spray.geometry}/>
  )
}

const SanitiserSpray = ({position, rotation})=> {

  const { nodes, materials } = useLoader(GLTFLoader, "/assets/models/sanitiser-spray.glb");

  return (
    <animated.mesh position={position} rotation={rotation} material={materials["Material.001"]} geometry={nodes.spray.geometry}/>
  )
}

const Meat = ({setProgress, dispatch, position})=> {

  const gltf = useLoader(GLTFLoader, "/assets/models/meat.glb");

  const [found, setFound] = useState(false);  

  const clickBox = () => {
    if(!found) {
      setProgress((prevState) => prevState + 1);
      setFound(true);
      dispatch(addPoints(200));
    }

  }

  return (
    <primitive scale={[0.8, 0.6, 0.8]} onClick={clickBox} position={position} object={gltf.scene} >
      {found ? <InfoBubble onClick={()=> dispatch(showInfo("dangerZone"))}/>: null}
      </primitive>
  )

}


export default HealthAndSafety;