import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import styles from  './UserInterface.module.css';

//Redux
import { selectStage, showUserInterface, switchPage, endStage, toggleTutorial } from '../redux/actions';

//Components 
import Certificate from '../Certificate';

const Homepage = () => {
    const [isShown, setIsShown] = useState(null);
    const [showCertificate, setShowCertificate] = useState(false);
    
    const info = useSelector(state => state.info);
    const quizzes = useSelector(state => state.quiz)
    const dispatch = useDispatch();

    const stages = info.stages;

    const stageList = stages.map ((stage)=> 
            <Stage key={stage.id} onClick={()=> {
                dispatch(selectStage(stage.id+1))
                dispatch(showUserInterface("HIDE_UI"))
            }} onMouseEnter={()=> setIsShown(stage.id)} img={stage.img} stagename={stage.name} exp={stage.exp} id={stage.id+1}/>
    )

    
    const { x, y } = useMousePosition();
    

    return (
        <div id="ui" className={styles.container}>
            <article style={{display: "flex", justifyContent:"space-between", alignItems: "center"}}>
                <p>EXP: {info.exp}</p>
                <Link style={{ cursor:"pointer", color:"white", border: "1px solid var(--third)",borderRadius: "1em", padding: "0.5em", filter: info.tokens > 0 ? "drop-shadow(0px 0px 8px white)" : "none"}} to={`quiz`}><p>Quiz Tokens: {info.tokens}</p></Link>
            </article>
            {quizzes.completed > 5 ?  
            <section>
                <h1>You Won the Game!</h1>
                <div style={{display: "flex"}}>
                    <button style={{ padding:"2em", fontWeight: "bold", color: "var(--primary)", background: "var(--third)"}} onClick={()=>setShowCertificate(true)}>Show my Certificate!</button>
                </div>
                <Certificate info={info} close={()=> setShowCertificate()} showCertificate={showCertificate}/>
            </section>
            : null}
            <section>
                <article className={styles.levelInfo}>
                    <h4>{info.activeStage? info.stages[info.activeStage-1].name: "Overworld"}</h4>
                    <p>{info.activeStage? info.stages[info.activeStage-1].description: "This is the Overworld Map, Have a look around to see if you can find anything interesting"}</p>
                </article>
            </section>
            <p style={{top:`${y}px`, left:`${x}px`, maxWidth:"20em"}} className={styles.description}>{isShown !==null && info.exp >= stages[isShown].exp ? stages[isShown].description: isShown !==null? "Locked Stage: " + stages[isShown].description : null}</p>
            <section style={{display: "flex"}}>{info.activeStage > 0 ? <button onClick={() =>{
                dispatch(endStage('home'))
                dispatch(showUserInterface("HIDE_UI"))
                }} className={styles.overworld}>
                  Return to Home
            </button> : null} 
            <button onClick={()=> dispatch(toggleTutorial())} style={{backgroundColor: "rgb(112, 64, 94)"}}>Open Tutorial</button>
            </section>
            <section onMouseLeave={() => setIsShown(null)} className={styles.stageSelect}>
                <h3 className={styles.subtitle}>Select a Stage</h3>
                    <div className={styles.menu}>
                        {stageList} 
                        
                    </div>
            </section>
            <section className={styles.badges}>
                <h3 className={styles.subtitle}>Achievement Badges</h3>
                <Badges onClick={()=>dispatch(switchPage(2))} x={x} y={y}/>
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
            document.addEventListener("mousemove", updateMousePosition);
  
      return () => document.removeEventListener("mousemove", updateMousePosition);
        }
    }, [touch]);
  
    return mousePosition;
};

const Stage = ({onClick, stagename, exp, id, img, onMouseEnter}) => {
    

    const info = useSelector(state => state.info);

    if (info.exp >= exp) {
        return (
            <div onMouseEnter={onMouseEnter} onClick={onClick} className={styles.item}>
                <img  alt="Map of the Stage" src={img}/>
                <div className={styles.inner}>
                    <h4>{id}: {stagename}</h4>
                    <p>LVL {exp}</p>
                </div>
            </div>
        )
    } else 

    

    return (
        <div onMouseEnter={onMouseEnter}  className={styles.itemLocked}>
            <img  alt="Map of the Stage" src={img}/>
            <div className={styles.inner}>
                <h4>{id}: {stagename}</h4>
                <p>LVL {exp}</p>
            </div>
        </div>
        
    )
}


const Badges = ({x,y, onClick}) => {
    const [isShown, setIsShown] = useState(null);

    const info = useSelector(state => state.info);
    const badges = info.badges;

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
                <img src={`/servicelearn/${badge.image}`} alt="Achievement Badge"/>
                <p>{badge.title}</p>
            </div>
        </Link>
        )
        
    })

    return (
        acquiredBadges.length === 0  ? <p>No Achievements Yet</p> : 
        <div onClick={onClick} onMouseLeave={() => setIsShown(null)} className={styles.badgesContainer}>
           {acquiredBadgesList}
            <p style={{top:`${y}px`, left:`${x}px`}} className={styles.description}>{isShown !==null ? acquiredBadges[isShown].description: null}</p>
        </div>
    )
}

export default Homepage