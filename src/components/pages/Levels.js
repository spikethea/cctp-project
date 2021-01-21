import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from  './UserInterface.module.css';

const Levels = ()=> {
    return (
        <div className={styles.container}>
            <div className={styles.level}>
                <h1>Level 1</h1>
            </div>
        </div>
    )
}

export default Levels