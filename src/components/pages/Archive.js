import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './UserInterface.module.css';

import puddle from '../../assets/images/info-box/puddle.jpg';

const Archive = () => {

    const state = useSelector(state => state.info);

    return (
        <div className={styles.container}>
            <h2>Your Archive</h2>
            <section>
                <Badges state={state}/>
            </section>
            <section>
                <h4 className={styles.subtitle}>Unlocked Information</h4>
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
                <div key={index} className={styles.archiveBadge}>
                    <h4>{badge.title}</h4>
                    <img src={badge.image} alt="Achievement"/>
                    <p>{badge.description}</p>
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
        <h4 className={styles.subtitle}>Unlocked Achievement Badges</h4>
        <div className={styles.ArchiveBadgesContainer}>
            {AcquiredBadgesList}
        </div>
        </>
    )
}

export default Archive