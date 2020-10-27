import React from 'react';
import styles from  './Homepage.module.css';

const Homepage = ({onClick}) => {
    return (
        <>
                <div className={styles.menu}>
                    <div onClick={onClick} className={styles.item}>
                        <h3>Upper Body Workout</h3>
                        <p>LVL 3</p>
                    </div>
                    <div className={styles.item}><h3>Option 1</h3></div>
                    <div className={styles.item}><h3>Option 1</h3></div>
                    <div className={styles.item}><h3>Option 1</h3></div>
                    <div className={styles.item}><h3>Option 1</h3></div>
                    <div className={styles.item}><h3>Option 1</h3></div>
                    <div className={styles.item}><h3>Option 1</h3></div>
                <div className={styles.menushadow}></div>
                </div>
        </>
    )
}

export default Homepage