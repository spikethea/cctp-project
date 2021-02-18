import React, {useState, useEffect} from 'react';
import { Link, useRouteMatch, Redirect, Switch, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import styles from  './UserInterface.module.css';

//Level Images

//Redux
import { selectStage, showUserInterface, switchPage } from '../redux/actions';

const Homepage = () => {
    const [isShown, setIsShown] = useState(null);
    
    const info = useSelector(state => state.info);
    const dispatch = useDispatch();

    const stages = info.stages;

    const stageList = stages.map ((stage)=> 
            <Stage key={stage.id} onClick={()=> {
                dispatch(selectStage(stage.id+1))
                dispatch(showUserInterface("HIDE_UI"))
            }} onMouseEnter={()=> setIsShown(stage.id)} img={stage.img} stagename={stage.name} exp={stage.exp} id={stage.id+1}/>
    )

    
    const { x, y } = useMousePosition();

    console.log(x);
      console.log(y);
    

    return (
        <div id="ui" className={styles.container}>
            <p style={{top:`${y}px`, left:`${x}px`, maxWidth:"20em"}} className={styles.description}>{isShown !==null ? stages[isShown].description: null}</p>
            <button onClick={() =>{
                dispatch(selectStage(null))
                dispatch(showUserInterface("HIDE_UI"))
                }} className={styles.overworld}>
                <h4>Return to Home</h4>
            </button>
            <section onMouseLeave={() => setIsShown(null)} className={styles.stageSelect}>
                <h3 className={styles.subtitle}>Stages</h3>
                <div className={styles.menu}>
                    {stageList} 
                </div>
                <div className={styles.menushadow}></div>
            </section>
            <section className={styles.badges}>
                <h3 className={styles.subtitle}>Acheivement Badges</h3>
                <Badges onClick={()=>dispatch(switchPage(2))} x={x} y={y}/>
            </section>
            <section className={styles.levelInfo}>
                <h4>{info.activeStage? info.stages[info.activeStage-1].name: "Overworld"}</h4>
                <p>{info.activeStage? info.stages[info.activeStage-1].description: "This is the Overworld Map, Have a look around to see if you can find anything interesting"}</p>
            </section>
        </div>
    )
}

const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({ x: null, y: null });
    const touch = matchMedia('(hover: none)').matches;
  
    const updateMousePosition = ev => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
  
    useEffect(() => {
        if (!touch) {
            window.addEventListener("mousemove", updateMousePosition);
  
      return () => window.removeEventListener("mousemove", updateMousePosition);
        }
    }, []);
  
    return mousePosition;
};

const Stage = ({onClick, stagename, exp, id, img, onMouseEnter}) => {
    

    const info = useSelector(state => state.info);

    if (info.exp >= exp) {
        return (
            <div onMouseEnter={onMouseEnter} onClick={onClick} className={styles.item}>
                <img style={{height:"15em"}} alt="Map of the Stage" src={img}/>
                <div className={styles.inner}>
                    <h4>Stage {id}: {stagename}</h4>
                    <p>LVL {exp}</p>
                </div>
            </div>
        )
    } else 

    

    return (
        <div className={styles.itemLocked}>
            <img style={{height:"15em"}} alt="Map of the Stage" src={img}/>
            <div className={styles.inner}>
                <h4>Stage {id}: {stagename}</h4>
                <p>LVL {exp}</p>
            </div>
        </div>
        
    )
}


const Badges = ({x,y, onClick}) => {
    const [isShown, setIsShown] = useState(null);

    const info = useSelector(state => state.info);
    const badges = info.badges;

    let { path, url } = useRouteMatch();
    console.log("path: " + path);
    console.log("url: " + url);
    let location = useLocation();
    console.log(location.pathname);

    let acquiredBadges = []
    
    Object.keys(badges).forEach(function(item) {
        if(badges[item].isAchieved) {
            acquiredBadges.push(badges[item]);
        }
    });

    const acquiredBadgesList = acquiredBadges.map ((badge, index)=> {
        

        return (
        <Link key={index} to={`archive`}>
            <div onMouseEnter={() => setIsShown(index)}   className={styles.badge}>
                <img src={badge.image} alt="Achievement Badge"/>
                <p>{badge.title}</p>
            </div>
        </Link>
        )
        
    })

    return (
        <div onClick={onClick} onMouseLeave={() => setIsShown(null)} className={styles.badgesContainer}>
            {acquiredBadgesList}
            <p style={{top:`${y}px`, left:`${x}px`}} className={styles.description}>{isShown !==null ? acquiredBadges[isShown].description: null}</p>
        </div>
    )
}

export default Homepage