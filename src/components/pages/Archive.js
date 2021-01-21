import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './UserInterface.module.css';
import puddle from '../../assets/images/info-box/puddle.jpg';

const Archive = () => {

    const state = useSelector(state => state.info);

    return (
        <div>
            <Badges state={state}/>
            <h3>Information</h3>
            <Info state={state}/>
        </div>
    )
}

const Info = ({state})=> {

    const info = state.infoBox;

    const infoBox = info.homeButton;
    console.log(infoBox);

    return (
        <div className={styles.infoContainer}>
            <div className={styles.info}>
                <article>
                    <h3>{infoBox.title}</h3>
                    <img src={puddle} alt="puddle"/>
                </article>
                <p>{infoBox.description}</p>
            </div>
        </div>
    )
}

const Badges = ({state}) => {

    

    const badges = state.badges;

    console.log("update");

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
        if(acquiredBadges.length > 0) {
            
            return (
        <div key={index}  className={styles.badge}>
            <img src={badge.image} alt="Achievement"/>
            <p  onClick={badgeInfo}>{badge.title}</p>
        </div>
        )} else {
            console.log("no badges")
            return (
            <p>no badges unlocked yet.</p>
        )}
        
    }
    )

    return (
        <>
        <h3>Unlocked Achievement Badges</h3>
        <div className={styles.badgesContainer}>
            {AcquiredBadgesList}
        </div>
        </>
    )
}

export default Archive