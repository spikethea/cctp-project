import React from 'react';
import styles from './PopUp.module.css';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import {endStage} from './redux/actions/index.js'; 

const LevelEnd = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state.info);

    if (state.gameState === 3) {
        
        return (
            <>
            <div className={styles.container}>
                <section>
                <h1>This level has finished, thanks for playing</h1>
                <img alt={state.stages[state.activeStage-1].name} src={`${state.stages[state.activeStage-1].img}`}/>
                </section>
                
                <section>
                    <div className={styles.buttonContainer}>
                        <button onClick={()=> dispatch(endStage('restart'))}>Play Another Level</button>
                        <button onClick={()=> dispatch(endStage('home'))}>Back to Home</button>
                    </div>
                </section>
            </div>
            <div className="background"></div>
            </>
        )} else {
            return null
        }
}

export default LevelEnd