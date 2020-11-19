import React from 'react';
import styles from  './Homepage.module.css';
import map from './images/map.jpg';

const Homepage = ({onClick}) => {

    const stages = [
        {
           name: "Health and Safety",
           tagname:"healthAndSafety",
           id:1,
           exp:3
        },
        {
            name: "Coffee Machine",
            tagname:"healthAndSafety",
            id:2,
            exp:5
         },
    ]

    const listItems = stages.map ((stage)=> 
            <Item key={stage.id} onClick={onClick} stagename={stage.name} exp={stage.exp} id={stage.id}/>
    )

    return (
        <>
                <h1>Stages</h1>
                <div className={styles.menu}>
                    {listItems}
                    <div className={styles.menushadow}></div>
                    
                    
                    
                </div>
            <h1>Badges</h1>
        </>
    )
}


const Item = ({onClick, stagename, exp, id}) => {
    return (
        <div onClick={onClick} className={styles.item}>
            <img style={{height:"15em"}} alt="Map of the Stage" src={map}></img>
            <div className={styles.inner}>
                <h4>Stage {id}: {stagename}</h4>
                <p>LVL {exp}</p>
            </div>
        </div>
    )
}

export default Homepage