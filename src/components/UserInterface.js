import React, { useEffect, useRef, useState } from 'react';
import "../App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { switchPage } from './redux/actions';

import { useSpring, animated } from 'react-spring'

//pages
import Homepage from './pages/Homepage';
import Leaderboard from './pages/Leaderboard';
import Archive from './pages/Archive';
import Quiz from './pages/Quiz';


const UserInterface = () => {


    const info = useSelector(state => state.info);
    const showUI = info.displayingUI;
    const activePage = info.page;

    const dispatch = useDispatch();

    let mql = window.matchMedia('(max-width: 1200px)').matches;//

    //need to code it so that it detects when the badge element is pressed

    
    if (showUI === true) {

        return (
            <Router>
            {mql ? <div className="background"></div> : null}
            <div className="ui-container">
                <ProgressBar info={info}/>
                <ul className="pages">
                    <Link style={{textDecoration: "none"}} to="/homepage"><li style={{backgroundColor:activePage === 0 ? "rgb(255,255,255, 0.2)" : "rgb(255, 0, 0, 0)"}} onClick={()=> dispatch(switchPage(0))} className="page-item">Homepage</li></Link>
                    <Link style={{textDecoration: "none"}} to="/leaderboard"><li style={{backgroundColor:activePage === 1 ? "rgb(255,255,255, 0.2)" : "rgb(255, 0, 0, 0)"}} onClick={()=> dispatch(switchPage(1))} className="page-item">Leaderboard</li></Link>
                    <Link style={{textDecoration: "none"}} to="/archive"><li style={{backgroundColor:activePage === 2 ? "rgb(255,255,255, 0.2)" : "rgb(255, 0, 0, 0)"}} onClick={()=> dispatch(switchPage(2))} className="page-item">Archive</li></Link>
                    <Link style={{textDecoration: "none"}} to="/quiz"><li style={{backgroundColor:activePage === 3 ? "rgb(255,255,255, 0.2)" : "rgb(255, 0, 0, 0)"}} onClick={()=> dispatch(switchPage(3))} className="page-item">Quiz</li></Link>
                </ul>
                
                <Switch>
                    <Route path="/" exact component={Homepage}/>
                    <Route path="/homepage" component={Homepage}/>
                    <Route path="/leaderboard" component={Leaderboard}/>
                    <Route path="/archive" component={Archive}/>
                    <Route path="/quiz" component={Quiz}/>
                </Switch>
            </div>
            </Router>
        )
    } else return null
}

const ProgressBar = ({info})=> {

    const points = info.points;
    const showUI = info.displayingUI;

    const [staggeredPoints, setStaggeredPoints] = useState(0);

    // Bug stops staggered points variable changing
    
    useEffect (()=>{
        if(showUI) {
            setStaggeredPoints(points);
        }
        
    })

    console.log(points);
    console.log(staggeredPoints);
    
    const props = useSpring({ value: points, from: { value: staggeredPoints } })

    return (
        <div style={{display:'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                    <h3 style={{fontWeight:"bold", color:"white", padding:"1em"}}>LV:{info.exp}</h3>
                    <animated.progress style={{width:"70%"}} id="file" value={props.value}  max="1000"/>
        </div>
    )
}

export default UserInterface