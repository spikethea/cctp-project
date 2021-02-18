import React, { useEffect, useRef, useState } from 'react';
import "../App.css";

import { BrowserRouter as Router, Switch, Route, Link, useLocation, useRouteMatch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { switchPage } from './redux/actions';

import { useSpring, animated } from 'react-spring'

//pages
import Homepage from './pages/Homepage';
import Leaderboard from './pages/Leaderboard';
import Archive from './pages/Archive';
import Quiz from './pages/Quiz';


const UserInterface = ({app, setApp}) => {

    //Router
    const location = useLocation();

    let { path, url } = useRouteMatch();

    let activePage = location.pathname;

     useEffect (()=>{
         
        activePage = location.pathname;
        if (activePage === "/training") {
             setApp(true)
         }
        console.log(location.pathname);
     }, [location]);

     console.log(activePage);
    
    //Redux
    const info = useSelector(state => state.info);
    const showUI = info.displayingUI;

    const dispatch = useDispatch();

        
    const [staggeredPoints, setStaggeredPoints] = useState(0);

    useEffect (()=>{
        if(showUI) {
            setStaggeredPoints(info.points);
        }
    }, [showUI]);

    let mql = window.matchMedia('(max-width: 1200px)').matches;//

    //need to code it so that it detects when the badge element is pressed

    
    if (showUI === true && app) {

        return (
            <> 
            {mql ? <div className="background"></div> : null}
            <div className="ui-container">
                <ProgressBar staggeredPoints={staggeredPoints} info={info}/>
                <ul className="pages">
                    <Link style={{textDecoration: "none"}} to={`${url}/homepage`}><li style={{backgroundColor: location.pathname === `${url}/homepage` ? "rgb(255,255,255, 0.2)" : "rgb(255, 0, 0, 0)"}} onClick={()=> dispatch(switchPage(0))} className="page-item">Homepage</li></Link>
                    <Link style={{textDecoration: "none"}} to={`${url}/leaderboard`}><li style={{backgroundColor:activePage === `${url}/leaderboard` ? "rgb(255,255,255, 0.2)" : "rgb(255, 0, 0, 0)"}} onClick={()=> dispatch(switchPage(1))} className="page-item">Leaderboard</li></Link>
                    <Link style={{textDecoration: "none"}} to={`${url}/archive`}><li style={{backgroundColor:activePage === `${url}/archive` ? "rgb(255,255,255, 0.2)" : "rgb(255, 0, 0, 0)"}} onClick={()=> dispatch(switchPage(2))} className="page-item">Archive</li></Link>
                    <Link style={{textDecoration: "none"}} to={`${url}/quiz`}><li style={{backgroundColor:activePage === `${url}/quiz` ? "rgb(255,255,255, 0.2)" : "rgb(255, 0, 0, 0)"}} onClick={()=> dispatch(switchPage(3))} className="page-item">Quiz</li></Link>
                </ul>
                
                <Switch>
                    <Route exact path={`${path}/`} component={UI}/>
                    <Route path={`${path}/homepage`} component={Homepage}/>
                    <Route path={`${path}/leaderboard`} component={Leaderboard}/>
                    <Route path={`${path}/archive`} component={Archive}/>
                    <Route path={`${path}/quiz`} component={Quiz}/>
                </Switch>
            </div>
            </>
        )
    } else if (!app && !showUI) {
        console.log("showUI is false")
        return (
        <>
            <Redirect from={`${path}/homepage`} to="/training" />
            <Redirect from={`${path}/leaderboard`} to="/training" />
            <Redirect from={`${path}/archive`} to="/training" />
            <Redirect from={`${path}/quiz`} to="/training" />
        </>
        )
    } else return null
}

const UI = () => {
    return (
        <div style={{minHeight:"40em", display:'flex', justifyContent:"center", alignItems:"center"}} className="container">
            <div>
            <h1>Welcome to the On-Screen UI </h1>
            <h2>Press Home to Get Started</h2>
            </div>
        </div>
    )
}

const ProgressBar = ({info, staggeredPoints})=> {

    const points = info.points;
    
    const props = useSpring({ value: points, from: { value: staggeredPoints } })

    return (
        <div style={{display:'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                    <h3 style={{fontWeight:"bold", color:"white", padding:"1em"}}>LV:{info.exp}</h3>
                    <animated.progress style={{width:"70%"}} id="file" value={props.value}  max="1000"/>
                    <p>{points} XP</p>

        </div>
    )
}

export default UserInterface