import React, {useRef,  Suspense} from 'react';

//Packages
import { useSelector } from 'react-redux';
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import { Html } from 'drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ResizeObserver } from '@juggle/resize-observer';// Resize Observer for safari compatibility

//Components
import Help from '../Help';




const Future = () => {
    //Redux
    const info = useSelector(state => state.info);

    //Toggle UI
    const showUI = info.displayingUI
    let mql = window.matchMedia('(max-width: 1200px)').matches;

    

    return (
      <>
        {!showUI ? <Help open message="This version of ServiceLearn is just a demo, so this Stage hasnt been made yet. If you would like to make this a reality, visit quincegr.com or contact Quince Gore-Rodney!"/>: null}
        <Canvas
        resize={{ polyfill: ResizeObserver }}
        colorManagement
        pixelRatio={info.performance === 0 ? 0.25 : info.performance === 1 ? 0.5 : 1}
        camera={{position: [0, 100, 150], fov: 30, rotation:[0, 0, 0]}}
        onCreated={({ gl }) => gl.setClearColor('black')}
        shadowMap
        style={{filter: showUI && mql ? "blur(5px)": "none" }}
        >
            <Suspense fallback={<Html style={{position:"absolute", left:"50%", top:"50%"}}>Loading...</Html>}>
            <fog attach="fog" args={["lightblue", 100, 500]}/>
            <Scene/>
            </Suspense>
          
      </Canvas>
    </>
    )
}



const Scene = ()=> {

  const mesh = useRef();

  const { nodes, materials } = useLoader(GLTFLoader, "../assets/models/ice_cream.glb");

  

  useFrame(()=> {
    if (mesh.current) {
        console.log(mesh.current);
        mesh.current.rotation.y += 0.01;
    }

  })


  return (
    <Suspense fallback={<Html style={{position:"absolute", left:"50%", top:"50%"}}>Loading...</Html>}>
    <group  position={[2, -10, -10]}>
      <Lights/>    
       <mesh rotation-z={12*(Math.PI/180)} ref={mesh} scale={[10, 10, 10]} geometry={nodes.Cone.geometry} attach="geometry">
        <meshLambertMaterial map={materials["Material.001"].map} attach="material"/>
       </mesh>
    </group>
    </Suspense>
  )
}


//Scene Lights
const Lights = () => {

    return (
      <>
        <directionalLight
          intensity={1.5}
          position={[0, 10, 10]}
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

export default Future