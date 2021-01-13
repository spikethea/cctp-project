import React from 'react';
import styles from  './Leaderboard.module.css';

const Leaderboard = () => {
    return (
    <>
        <div className={styles.leaderboard}>
            <div className={styles.row}>QUINCE 650 Points</div>
            <div className={styles.row}>QUINCE</div>
            <div className={styles.row}>QUINCE</div>
            <div className={styles.row}>QUINCE</div>
        </div>
    </>
    )
}

export default Leaderboard