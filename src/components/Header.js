import React, { useEffect, useRef } from 'react';
import styles from './pages/UserInterface.module.css';

import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { showUserInterface, clearNotifications } from './redux/actions';


const Header = ({setApp}) => {
    const location = useLocation()
    

    const info = useSelector(state => state.info);
    const showUI = info.displayingUI;

    const dispatch = useDispatch();

    const container = useRef();

    useEffect(() => {
        if (!showUI) {
             container.current.style.backgroundColor = "rgba(0, 0 ,0 , 0)";
             container.current.style.borderBottom = "none";
         } else {
             container.current.style.backgroundColor = "var(--primary)";
             container.current.style.borderBottom = "1px solid white";
         }
      }, [showUI])

    return (
        <div style={{backdropFilter: info.performance === 3 && showUI ? "blur(20px)" : null}} ref={container} className={styles.headerContainer}>
            <header  className={styles.header}>
        <h3>ServiceLearn
            {(info.notifications > 0) ? <Link to={location.pathname === "/training" ? "training/archive" : "archive"}><p onClick={()=> {
                dispatch(showUserInterface('SHOW_UI'))
                dispatch(clearNotifications());
                setApp(true);
            }} className={styles.notifications}>&nbsp; {info.notifications}</p></Link>: null}
        </h3>
        <Link to={location.pathname === "/training" ? "training/homepage" : "homepage"}><div className={styles.experience}>
            {!showUI ? <img className={styles.home} src='/assets/svg/home.svg' alt="Home Button" onClick={() => {
                dispatch(showUserInterface('SHOW_UI'));
                dispatch(clearNotifications());
            }
                }/>: null}
            </div></Link>
                
            {showUI ? <button onClick={() => dispatch(showUserInterface('HIDE_UI'))} className={styles.exit}>+</button> : null}
            </header>
        </div>
        
    )
}

export default Header