import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLevel, endStage } from './redux/actions';
import styles from  './PopUp.module.css';

const LevelSelect = ()=> {

    const state = useSelector(state => state.info);
    const dispatch = useDispatch();


    if (state.gameState === 1) {
        console.log(state.activeStage);
        return (
        <>
        <div className={styles.container}>
                <button  onClick={()=> dispatch(endStage('home'))}>
                    Return To Home
                </button>
                
                <section>
                    <h1>{state.activeStage? state.stages[state.activeStage-1].name: "Stage"}</h1>
                    {state.activeStage ? <img alt={state.stages[state.activeStage-1].name} src={state.stages[state.activeStage-1].img}/>: null}
                    <h3>{state.activeStage? state.stages[state.activeStage-1].description: "Stage Description"}</h3>
                </section>
                
                <section>
                <h2>How to Play</h2>
                <h3>{state.activeStage? state.stages[state.activeStage-1].howToPlay: "How to Play"}</h3>
                </section>
                
            

            <section>
                <h2>Levels</h2>
                <div className={styles.levels}>
                    <button className={styles.open} onClick={()=>dispatch(selectLevel(1))}>1</button>
                    <button className={styles.open} onClick={()=>dispatch(selectLevel(2))}>2</button>
                    <div className={styles.locked}>3</div>
                    <div className={styles.locked}>4</div>
                    <div className={styles.locked}>5</div>
                    <div className={styles.locked}>6</div>
                </div>
            </section>
        </div>
        <div className="background"></div>
        </>
    )} else return null
}

export default LevelSelect