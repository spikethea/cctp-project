import React, { useEffect,  useState } from 'react';
import "../App.css";

import { Switch, Route, Link, useLocation, useRouteMatch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { switchPage } from './redux/actions';

import { useSpring, animated } from 'react-spring'

//pages
import Homepage from './pages/Homepage';
import Options from './pages/Options';
import Archive from './pages/Archive';
import Quiz from './pages/Quiz';


const UserInterface = ({app, setApp}) => {

    //Router
    const location = useLocation();

    let { path, url } = useRouteMatch();
    let [activePage, setActivePage] = useState(location.pathname);

     useEffect (()=>{
        setActivePage(location.pathname);

        if (activePage === "/training") {
             setApp(true)
         }
     }, [location, activePage, setApp]);

    
    //Redux
    const info = useSelector(state => state.info);
    const showUI = info.displayingUI;

    const dispatch = useDispatch();

        
    const [staggeredPoints, setStaggeredPoints] = useState(0);

    useEffect (()=>{
        if(showUI) {
            setStaggeredPoints(info.points);
        }
    }, [showUI, info.points]);

    if (showUI === true ) {

        return (
            <> 
            <div style={{backdropFilter: info.performance === 3 ? "blur(20px)" : null}} className="ui-container">
                <ProgressBar staggeredPoints={staggeredPoints} info={info}/>
                <ul className="pages">
                    <Link style={{textDecoration: "none"}} to={`${url}/homepage`}><li style={{backgroundColor: location.pathname === `${url}/homepage` ? "rgb(34, 34, 34, 0.2)" : "rgb(255, 0, 0, 0)"}} onClick={()=> dispatch(switchPage(0))} className="page-item">homepage</li></Link>
                    <Link style={{textDecoration: "none"}} to={`${url}/archive`}><li style={{backgroundColor:activePage === `${url}/archive` ? "rgb(34, 34, 34, 0.2)" : "rgb(255, 0, 0, 0)"}} onClick={()=> dispatch(switchPage(2))} className="page-item">archive</li></Link>
                    <Link style={{textDecoration: "none"}} to={`${url}/quiz`}><li style={{backgroundColor:activePage === `${url}/quiz` ? "rgb(34, 34, 34, 0.2)" : "rgb(255, 0, 0, 0)"}} onClick={()=> dispatch(switchPage(3))} className="page-item">quizzes</li></Link>
                    <Link style={{textDecoration: "none"}} to={`${url}/options`}><li style={{backgroundColor:activePage === `${url}/options` ? "rgb(34, 34, 34, 0.2)" : "rgb(255, 0, 0, 0)"}} onClick={()=> dispatch(switchPage(1))} className="page-item">options</li></Link>
                </ul>
                
                <Switch>
                    <Route exact path={`${path}/`} component={UI}/>
                    <Route path={`${path}/homepage`} component={Homepage}/>
                    <Route path={`${path}/options`} component={Options}/>
                    <Route path={`${path}/archive`} component={Archive}/>
                    <Route path={`${path}/quiz`} component={Quiz}/>
                    <Redirect exact from={`${path}/`} to={`${path}/homepage`}/>
                </Switch>
            </div>
            </>
        )
    } else if ( !showUI) {
        
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
        <div style={{minHeight:"40em", display:'flex', justifyContent:"center", alignItems:"center"}} className="default-container">
            <div>
            <h3>Welcome to the On-Screen UI </h3>
            <h4>Select the Homepage Tab to Get Started</h4>
            </div>
        </div>
    )
}

const ProgressBar = ({info, staggeredPoints})=> {

    const points = info.points;
    
    const props = useSpring({ value: points, from: { value: staggeredPoints } })

    return (
        <div style={{display:'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                    <h3 style={{fontWeight:"bold", color:"white", padding:"1em", whiteSpace:"nowrap"}}>LVL {info.exp}</h3>
                    <animated.progress className="progress" style={{width:"70%"}} id="file" value={props.value}  max="1000"/>
        </div>
    )
}

export default UserInterface