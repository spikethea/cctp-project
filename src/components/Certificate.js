import React from 'react';
import { useSelector } from 'react-redux';
import { useTransition, animated } from 'react-spring';

import styles from './Certificate.module.css'
const Certificate = ({ showCertificate, close, info }) => {
    
    const quiz = useSelector(state => state.quiz);

    const transitions = useTransition(showCertificate, null, {
        from: { opacity: "0",  top: "0%" },
        enter: { opacity: "1", top: "50%" },
        leave: { opacity: "0", top: "0%" },
    })




    return (
        <>
        {
        transitions.map(
            ({ item, key, props }) => 
            item && (
        <div key={key}>
        <animated.div className={styles.container} style={props}>
            <header><div className={styles.exit} onClick={close}>+</div></header>
            <h1>Well Done!</h1>
            <h2>Heres your certificate:</h2>
            <article  className={styles.score}>
                <h3>You Achieved:</h3>
                <h2>{determineScore(quiz, info)}</h2>
            </article>
            <div>
                <h2>You have...</h2>
                <article>
                    <h3>Completed {quiz.completed} Quizzes</h3>
                    {/* <h3>Found 13 Information Boxes</h3>
                    <h3>Unlocked 13 Information Boxes</h3> */}
                </article>
            </div>
            <div style={{display: "flex"}}>
                <button onClick={()=> window.print()}>Print Certificate</button>
                <button style={{color: "", background: "rgb(112, 64, 94)"}} onClick={close}>Keep Playing</button>
            </div>
        </animated.div>
        <animated.div style={props.opacity} className="background"></animated.div>
        </div>)
        )}
        </>
    )
}

const determineScore = (quiz, info) => {
    
        if (quiz.completed > 5) {
            if (!info.badges.firstLoss.isAchieved) {
                if (info.infoBox.other.displayed) {
                    return "A+";
                }
                return "A-";
            } else return "B+";
            
        } else return "B-";
    
    
    
}

export default Certificate