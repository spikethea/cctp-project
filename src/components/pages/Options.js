import React from 'react';
import styles from  './UserInterface.module.css';

import {  useDispatch, useSelector } from 'react-redux';
import { resetState, performance, addPoints } from '../redux/actions';

const Options = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state.info);
    
    
    const performanceIndex = [
        "Very Low",
        "Low",
        "Standard",
        "High (Experimental)",
    ] 
    

    return (
    <div className={styles.container}>
        <section>
            <h3>Leaderboard</h3>
            <table className={styles.leaderboard}>
            <tbody>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Age</th>
                </tr>
                <tr>
                    <td>Jill</td>
                    <td>Smith</td>
                    <td>50</td>
                </tr>
                <tr>
                    <td>Eve</td>
                    <td>Jackson</td>
                    <td>94</td>
                </tr>
            </tbody>
            </table>
        </section>
        <section style={{display: "flex"}}>
            <button onClick={()=> dispatch(performance('toggle'))}>Performance: <span style={{fontWeight: "bold"}}>{performanceIndex[state.performance]}</span></button>
        </section>
        <section style={{display: "flex"}}>
            <button onClick={()=> dispatch(resetState())}>Reset Progress</button>
        </section>
        <section style={{display: "flex"}}>
            <button onClick={()=> dispatch(addPoints(1000))}>Press 6 Times to Unlock everything (cheat for demo)</button>
        </section>
    </div>
    )
}

export default Options