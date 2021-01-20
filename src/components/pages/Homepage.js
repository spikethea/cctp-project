import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from  './Homepage.module.css';

//Level Images

//Redux
import { selectStage } from '../redux/actions';

const Homepage = () => {
    
    const info = useSelector(state => state.info);
    const dispatch = useDispatch();

    const stages = info.stages;
    

    const stageList = stages.map ((stage)=> 
            <Stage key={stage.id} onClick={()=> {
                dispatch(selectStage(stage.id))

            }} img={stage.img} stagename={stage.name} exp={stage.exp} id={stage.id+1}/>
    )

    return (
        <div className={styles.container}>
            <button onClick={() =>dispatch(selectStage(0))} className={styles.overworld}>
                <h4>Return to Home</h4>
            </button>
            
            <section className={styles.stageSelect}>
                <h3 className={styles.subtitle} style={{margin:"0.5em"}}>Stages</h3>
                <div className={styles.menu}>
                    {stageList} 
                </div>
                <div className={styles.menushadow}></div>
            </section>
            <section className={styles.badges}>
                <h3 className={styles.subtitle}>Acheivement Badges</h3>
                <Badges/>
            </section>
            <section className={styles.levelInfo}>
                <h4>{info.stages[info.activeStage].name}</h4>
                <p>{info.stages[info.activeStage].description}</p>
            </section>
        </div>
    )
}

const Stage = ({onClick, stagename, exp, id, img}) => {

    const info = useSelector(state => state.info);

    console.log(info.exp + " "  + exp);

    console.log(img);

    if (info.exp >= exp) {
        return (
            <div onClick={onClick} className={styles.item}>
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


const Badges = () => {

    const info = useSelector(state => state.info);

    const badges = info.badges;

    

    let acquiredBadges = []
    
    Object.keys(badges).forEach(function(item) {
        if(badges[item].displaying) {
            acquiredBadges.push(badges[item]);
        }
        console.log(acquiredBadges);
    });

    const badgeInfo = () => {
        return (
            <>
            </>
        )
    }

    const AcquiredBadgesList = acquiredBadges.map ((badge, index)=> {
        console.log(badge.image);
        return (
        <div key={index}  className={styles.badge}>
            <img src={badge.image} alt="Achievement"/>
            <p  onClick={badgeInfo}>{badge.title}</p>
        </div>
        )
        
    }
    )

    return (
        <div className={styles.badgesContainer}>
            {AcquiredBadgesList}
        </div>
    )
}

export default Homepage