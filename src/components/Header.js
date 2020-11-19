import React from 'react';
import styles from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { showUserInterface } from './redux/actions';


const Header = () => {

    const showUI = useSelector(state => state.isLogged);
    const dispatch = useDispatch();


    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h3>CCTP Project</h3>
                <div className={styles.experience}>
                {!showUI ? <p onClick={() => dispatch(showUserInterface('SHOW_UI'))}>HOME</p>: null}
                </div>
                
                {showUI ? <button onClick={() => dispatch(showUserInterface('HIDE_UI'))} className={styles.exit}>X</button> : null}
            </header>
        </div>
    )
}

export default Header