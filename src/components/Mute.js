import React from 'react';
import styles from './PopUp.module.css';

import { useSelector, useDispatch } from 'react-redux'
import { toggleMute } from './redux/actions/index';

const Mute = ({ onClick }) => {

    const state = useSelector(state => state.info)
    const dispatch = useDispatch();

    if (!state.displayingUI) {
        return (    
        <button className={styles.mute} onClick={()=> dispatch(toggleMute())}>
            {state.muted ? <img alt="unmute made by https://www.freepik.com" src="/assets/svg/mute.svg"/>
            : <img alt="mute made by https://www.flaticon.com/authors/pixel-perfect" src="/assets/svg/unmute.svg"/>}
        </button>
    )} else return null
}

export default Mute