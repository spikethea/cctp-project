import React, { useEffect, useRef } from 'react';
import styles from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { showUserInterface, clearNotifications } from './redux/actions';

import Home from '../assets/svg/home.svg'


const Header = () => {

    const info = useSelector(state => state.info);
    const showUI = info.displayingUI;


    const dispatch = useDispatch();

    const container = useRef();

    useEffect(() => {
        if (!showUI) {
             container.current.style.backgroundColor = "rgba(0,0,0,0)";
         } else {
             container.current.style.backgroundColor = "rgba(0,0,0,0.5)";
         }
      }, [showUI])

    return (
        <div ref={container} className={styles.container}>
            <header  className={styles.header}>
        <h3>ServiceLearn
            {(info.notifications > 0) ? <p onClick={()=> {
                dispatch(showUserInterface('SHOW_UI'))
                dispatch(clearNotifications());
            }} className={styles.notifications}>&nbsp; {info.notifications}</p>: null}
        </h3>
        <div className={styles.experience}>
            {!showUI ? <img className={styles.home} src={Home} alt="Home Button" onClick={() => {
                dispatch(showUserInterface('SHOW_UI'));
                dispatch(clearNotifications());
            }
                }/>: null}
            </div>
                
            {showUI ? <button onClick={() => dispatch(showUserInterface('HIDE_UI'))} className={styles.exit}>X</button> : null}
            </header>
        </div>
    )
}

export default Header