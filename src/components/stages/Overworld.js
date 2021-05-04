import React, {useRef, useState, Suspense} from 'react';

//Packages
import { useSelector, useDispatch } from 'react-redux';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import { Box } from 'drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ResizeObserver } from '@juggle/resize-observer';// Resize Observer for safari compatibility

//Components
import InfoBubble from '../InfoBubble';
import Loading from '../Loading';
import Help from '../Help';

//Redux
import { getBadge, showInfo } from '../redux/actions';



const Overworld = () => {
    //Redux
    const dispatch = useDispatch();
    const info = useSelector(state => state.info);

    const infoBoxAcquired = info.infoBox.homeButton.displayed// Stores the values of whether the infoBox for stadium has been clicked yet
    //Toggle UI
    const showUI = info.displayingUI
    let mql = window.matchMedia('(max-width: 1200px)').matches;

    return (
      <>
        {!showUI ? <Help message="Click on Landmarks around the Map to reveal extra information which could help you in the future..."/>: null}
        <Canvas
        resize={{ polyfill: ResizeObserver }}
        colorManagement
        pixelRatio={info.performance === 0 ? 0.25 : info.performance === 1 ? 0.5 : 1}
        camera={{position: [0, 100, 150], fov: 30, rotation:[0, 0, 0]}}
        onCreated={({ gl }) => gl.setClearColor('lightblue')}
        shadowMap
        style={{filter: showUI && mql ? "blur(5px)": "none" }}
        >
          <fog attach="fog" args={["lightblue", 50, 500]}/>
          <Scene infoBoxAcquired={infoBoxAcquired} dispatch={dispatch}/>
      </Canvas>
    </>
    )
}



const Scene = ({dispatch, infoBoxAcquired})=> {

  const mesh = useRef();

  useFrame(()=> {
    if (mesh.current) {
      mesh.current.rotation.y += 0.0015;
    }

  })


  return (
    <>
    
    <group ref={mesh} position={[2, 0, -10]}>
    <Lights/>
      
      <Suspense fallback={<Loading/>}>
        <FrontGate dispatch={dispatch} position={[20, -1, 15]} color={[100, 100, 200]} />
        <Stadium infoBoxAcquired={infoBoxAcquired} dispatch={dispatch} position={[0, 0, -10]}/>
        
        <TowerBlock position={[20, 0, 30]}/>
        <TowerBlock position={[30, 0, 40]}/>

        {/* Circle around Stadium */}
        <LCCBlock position={[-40, -1, 0]} rotation={[0,-80*(Math.PI/180), 0]}/>
        <LCCBlock position={[-25, -1, 23]} rotation={[0,-40*(Math.PI/180), 0]}/>
        <LCCBlock position={[0, -1, 30]}/>

        {/* Estate */}
        <group position={[40, -1, -30]}>
          <LCCBlock position={[5, 0, 0]} rotation={[0,180*(Math.PI/180), 0]}/>
          <LCCBlock position={[0, 0, 15]} />
          <LCCBlock position={[5, 0, 25]} rotation={[0,180*(Math.PI/180), 0]}/>
          <LCCBlock position={[20, 0, 15]} rotation={[0, 90*(Math.PI/180), 0]}/>
          <LCCBlock position={[30, 0, 15]} rotation={[0, 90*(Math.PI/180), 0]}/>
        </group>

      {/* Estate */}
      <group position={[0, -1, 30]}>
          <LCCBlock position={[5, 0, 0]} rotation={[0,180*(Math.PI/180), 0]}/>
          <LCCBlock position={[0, 0, 15]} />
          <LCCBlock position={[5, 0, 25]} rotation={[0,180*(Math.PI/180), 0]}/>
        </group>

        <Floor/>
      </Suspense>
    </group>
    
  </>
  )
}


//Scene Lights
const Lights = () => {

    return (
      <>
        <directionalLight
          color="#fae9b1"
          intensity={0.9}
          position={[-30, 30, 50]}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={500}
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

const Stadium = ({ dispatch, infoBoxAcquired, position }) => {

  const {nodes, materials} = useLoader(GLTFLoader, "../assets/models/stadium.glb");

  let [found, setFound] = useState(false)
  let [pressed, setPressed] = useState(false);

  let [light, setLight] = useState(false);

  let object = useRef();

  const handleClick = () => {
    
    if (!found) {
      setFound(true);
    }
  }

  const handleInfoClick = () => {
    dispatch(showInfo("homeButton"));
    if (!pressed) {
      setPressed(true);
    }
    
  }


  useFrame(()=> {
    if (object.current && infoBoxAcquired === false) {// If the stadium hasnt been clicked before, then flash the stage
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
        <mesh castShadow geometry={nodes.Stadium.geometry} attach="geometry" receiveShadow ref={object}  onClick={handleClick} position={position}>
          <meshLambertMaterial  map={materials.stadium.map} attach="material"/>
          {found ? <InfoBubble sign="?" scaleFactor={100} onClick={handleInfoClick}/>: null}
        </mesh>
  )
}

const Floor = () => {

  return (
    <mesh receiveShadow rotation-x={-Math.PI/2} position={[0, -1, 0]}>
      <planeBufferGeometry  attach="geometry" args={[5000, 5000]} />
      <meshStandardMaterial attach="material" color="grey" />
    </mesh>
  )
}

const LCCBlock = ({position, rotation }) => {

  const { nodes, materials } = useLoader(GLTFLoader, "../assets/models/lccblock.glb");
  const environment = useLoader(THREE.TextureLoader, "../../assets/images/textures/equirectangular.jpg") 

  environment.mapping = THREE.EquirectangularReflectionMapping;
  environment.encoding = THREE.sRGBEncoding;

  return (
    <mesh geometry={nodes["LCC_Block"].geometry} receiveShadow castShadow rotation={rotation} position={position}>
      <meshStandardMaterial envMap={environment} map={materials.lcc_block.map} normalMap={materials.lcc_block.normalMap} roughnessMap={materials.lcc_block.roughnessMap}/>
    </mesh>
  )
}
  

const TowerBlock = ({position, rotation }) => {

  const { nodes } = useLoader(GLTFLoader, "../assets/models/tower-block.glb");
  const environment = useLoader(THREE.TextureLoader, "../../assets/images/textures/equirectangular.jpg") 

  environment.mapping = THREE.EquirectangularReflectionMapping;
  environment.encoding = THREE.sRGBEncoding;

  return (
    <mesh geometry={nodes["tower_block"].children[0].geometry} material={nodes["tower_block"].children[0].material} receiveShadow castShadow rotation={rotation} position={position}/>
  )
}

const FrontGate = ({dispatch, position, color}) => {
  
  const environment = useLoader(THREE.TextureLoader, "../../assets/images/textures/equirectangular.jpg") 
  let [pressed, setPressed] = useState(false);

  environment.mapping = THREE.EquirectangularReflectionMapping;
  environment.encoding = THREE.sRGBEncoding;

  const handleClick = () => {
    if (!pressed){
      setPressed(true);
    dispatch(getBadge('curiousCat'));
    }
    
  }

  
    return (
      <mesh castShadows receiveShadows onClick={handleClick}>
          <Box
            args={[5, 50, 5]}
            position={position}
          >
            {pressed? <InfoBubble sign="?" scaleFactor={100} onClick={()=> dispatch(showInfo("gettingAround"))}/> : null}
            <meshStandardMaterial 
              roughness={0}
              metalness={0.7}
              envMap={environment}
              attach="material" 
              color={`rgb(${color})`}
            />
          </Box>
      </mesh>
    )
  }

export default Overworld;