import React, { useEffect, useRef } from 'react';
import styles from './pages/UserInterface.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { showUserInterface, clearNotifications } from './redux/actions';


const Header = ({setApp}) => {

    const info = useSelector(state => state.info);
    const showUI = info.displayingUI;


    const dispatch = useDispatch();

    const container = useRef();

    useEffect(() => {
        if (!showUI) {
             container.current.style.backgroundColor = "rgba(0, 0 ,0 , 0)";
             container.current.style.borderBottom = "none";
         } else {
             container.current.style.backgroundColor = "rgba(158, 113, 158, 0.40)";
             container.current.style.borderBottom = "1px solid white";
         }
      }, [showUI])

    return (
        <div ref={container} className={styles.headerContainer}>
            <header  className={styles.header}>
        <h3>ServiceLearn
            {(info.notifications > 0) ? <p onClick={()=> {
                dispatch(showUserInterface('SHOW_UI'))
                dispatch(clearNotifications());
                setApp(true);
            }} className={styles.notifications}>&nbsp; {info.notifications}</p>: null}
        </h3>
        <div className={styles.experience}>
            {!showUI ? <img className={styles.home} src={'./../assets/svg/home.svg'} alt="Home Button" onClick={() => {
                dispatch(showUserInterface('SHOW_UI'));
                dispatch(clearNotifications());
            }
                }/>: null}
            </div>
                
            {showUI ? <button onClick={() => dispatch(showUserInterface('HIDE_UI'))} className={styles.exit}>+</button> : null}
            </header>
        </div>
        
    )
}

export default Header