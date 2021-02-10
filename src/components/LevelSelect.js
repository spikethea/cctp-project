import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { gameState } from './redux/actions';
import styles from  './LevelSelect.module.css';

const LevelSelect = ()=> {

    const state = useSelector(state => state.info);
    const dispatch = useDispatch();

    const activeLevel = state.gameState;
    console.log(activeLevel);


    if (state.levelSelect) {
        return (
        <div className={styles.container}>
            <section>
                <header><p>Return To Home</p></header>
                <h1>{state.activeStage? state.stages[state.activeStage-1].name: "Stage"}</h1>

                <p>{state.activeStage? state.stages[state.activeStage-1].description: "Stage Description"}</p>
            </section>

            <section>
                <h2>Levels</h2>
                <div className={styles.levels}>
                    <figure onClick={()=>dispatch(gameState(1))}>1</figure>
                    <figure onClick={()=>dispatch(gameState(2))}>2</figure>
                    <figure onClick={()=>dispatch(gameState(3))}>3</figure>
                    <figure onClick={()=>dispatch(gameState(4))}>4</figure>
                    <figure onClick={()=>dispatch(gameState(5))}>5</figure>
                    <figure onClick={()=>dispatch(gameState(6))}>6</figure>
                </div>
            </section>
        </div>
    )} else return null
}

export default LevelSelect