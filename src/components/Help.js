import React, {useState} from 'react'
import styles from './PopUp.module.css';

import { useSpring, animated } from 'react-spring';

const Help = ({message}) => {

    const [expanded, setExpanded] = useState(false);
    const props = useSpring({width: expanded ? "95vw": "0vw"})

    const toggleHelp = () => {
        if (expanded) {
            setExpanded(false);
        } else {
            setExpanded(true);
        }
    }

    return (
        <div className={styles.help} onClick={toggleHelp}>
            <div>
                <h1>
                    ?
                </h1>
            </div>
            <animated.article style={props}>{expanded ? message : null}</animated.article>
        </div>
    )
}

export default Help