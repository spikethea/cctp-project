import React, {useRef, useState, Suspense, useEffect} from 'react';

//Packages
import { useSelector, useDispatch } from 'react-redux';
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import { Box, Html } from 'drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ResizeObserver } from '@juggle/resize-observer';// Resize Observer for safari compatibility

//Components
import InfoBubble from '../InfoBubble';
import Help from '../Help';

//Redux
import { getBadge, showInfo, addPoints } from '../redux/actions';



const Overworld = () => {
    //Redux
    const dispatch = useDispatch();
    const counter = useSelector(state => state.counter);
    const info = useSelector(state => state.info);

    //Toggle UI
    const showUI = info.displayingUI
    let mql = window.matchMedia('(max-width: 1200px)').matches;

    

    return (
      <>
        {!showUI ? <Help message="Click on Landmarks around the Map to reveal important information which could help you in the future"/>: null}
        <Canvas
        resize={{ polyfill: ResizeObserver }}
        colorManagement 
        camera={{position: [0, 100, 150], fov: 30, rotation:[0, 0, 0]}}
        onCreated={({ gl }) => gl.setClearColor('lightblue')}
        shadowMap
        style={{filter: showUI && mql ? "blur(5px)": "none" }}
        >
          <fog attach="fog" args={["lightblue", 100, 500]}/>
          <Scene counter={counter} dispatch={dispatch}/>
      </Canvas>
    </>
    )
}



const Scene = ({dispatch})=> {

  const mesh = useRef();

  useFrame(()=> {
    if (mesh.current) {
      mesh.current.rotation.y += 0.0015;
    }

  })


  return (
    <group ref={mesh} position={[2, 0, -10]}>
      <Lights/>
      <FrontGate dispatch={dispatch} position={[1, -1, 20]} color={[200, 200, 200]} />
      <Suspense fallback={<Html style={{position:"absolute", left:"50%", top:"50%"}}>Loading...</Html>}>
        <Stadium dispatch={dispatch}/>
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

const Stadium = ({ dispatch }) => {

  const gltf = useLoader(GLTFLoader, "../assets/models/stadium.glb");

  let [found, setFound] = useState(false)
  let [pressed, setPressed] = useState(false);

  let [light, setLight] = useState(false);

  let object = useRef();

  const handleClick = () => {
    
    if (!found) {
      setFound(true);
      dispatch(addPoints(350));
    }
  }

  const handleInfoClick = () => {
    dispatch(showInfo("homeButton"));
    if (!pressed) {
      setPressed(true);
    }
    
  }


  useFrame(()=> {
    if (object.current) {
      let material = object.current.children[0].children[0].material;
      

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
        <primitive castShadow ref={object} onClick={handleClick} position={[0, -2, -10]} object={gltf.scene} >{found ? <InfoBubble sign="?" scaleFactor={100} onClick={handleInfoClick}/>: null}</primitive>
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
  
const FrontGate = ({dispatch, position, color}) => {
  
    let [found, setFound] = useState(false);
    let [pressed, setPressed] = useState(false);


    const handleClick = () => {
      if (!pressed){
        setPressed(true);
      dispatch(getBadge('curiousCat'));
      dispatch(addPoints(450));
      }
      
    }
      
  
    return (
      <mesh onClick={handleClick}>
          <Box
            args={[8, 4, 8]}
            position={position}
          >
            {pressed? <InfoBubble sign="?" scaleFactor={100} onClick={()=> dispatch(showInfo("gettingAround"))}/> : null}
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