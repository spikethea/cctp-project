import React from 'react';
import styles from  './Leaderboard.module.css';

const Leaderboard = () => {
    return (
    <>
        <h2>Leaderboard</h2>
        <div className={styles.leaderboard}>
            <div className={styles.row}>QUINCE 650 Points</div>
            <div className={styles.row}>ASFD 350 Points</div>
            <div className={styles.row}>STAN 0 Points</div>
            <div className={styles.row}>KHAN 1050 Points</div>
        </div>
    </>
    )
}

export default Leaderboard