import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './UserInterface.module.css';

import puddle from '../../assets/images/info-box/puddle.jpg';

const Archive = () => {

    const state = useSelector(state => state.info);

    return (
        <div className={styles.container}>
            <section>
                <Badges state={state}/>
            </section>
            <section>
                <h3 className={styles.subtitle}>Unlocked Information</h3>
                <Info state={state}/>
            </section>
        </div>
    )
}

const Info = ({state})=> {


    const [infoBox, setInfoBox] = useState([]);

    useEffect(()=>{

        setInfoBox([]);

        Object.keys(state.infoBox).forEach(function(info) {
        console.log(infoBox)
        if(state.infoBox[info].displayed) {
            setInfoBox(infoBox => [...infoBox, (state.infoBox[info])]);
        }
        });
    }, [state.infoBox])

    return (
        <div className={styles.infoContainer}>
            {infoBox.map((infoBox, id)=> (
                <div key={id} className={styles.info}>
                    <figure>
                        <h3>{infoBox.title}</h3>
                        <img src={puddle} alt="puddle"/>
                    </figure>
                    <p>{infoBox.description}</p>
                </div>
            ))}
        </div>
    )
}

const Badges = ({state}) => {

    

    const badges = state.badges;

    console.log("update");

    let acquiredBadges = []
    
    Object.keys(badges).forEach(function(item) {
        if(badges[item].isAchieved) {
            acquiredBadges.push(badges[item]);
        }
        console.log(acquiredBadges);
    });

    const AcquiredBadgesList = acquiredBadges.map ((badge, index)=> {
        console.log(badge.image);
        if(acquiredBadges.length > 0) {
            
            return (
            <div key={index} style={{margin:"0.2em", padding:"1em", background:"whitesmoke"}} className={styles.badge}>
                <img src={badge.image} alt="Achievement"/>
                <p style={{color:"#212121"}}>{badge.title}</p>
            </div>
        )} else {
            console.log("no badges")
            return (
            <>
                <p>no badges unlocked yet.</p>
            </>
        )}
        
    }
    )

    return (
        <>
        <h3 className={styles.subtitle}>Unlocked Achievement Badges</h3>
        <div className={styles.badgesContainer}>
            {AcquiredBadgesList}
        </div>
        </>
    )
}

export default Archive