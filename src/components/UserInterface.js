import React, { useEffect, useRef, useState } from 'react';
import "../App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { transform } from './redux/actions';


//pages
import Homepage from './pages/Homepage';
import Leaderboard from './pages/Leaderboard';
import Archive from './pages/Archive';


const UserInterface = () => {

    //const [displayUI, setDisplayUI] = useState(false);

/*     React.useEffect(()=>{

        console.log("UI");
        if (ToggleUI) {   // <--- this generate error
            setDisplayUI(true);
        } else {
            setDisplayUI(false);
        }

        }, [ToggleUI]) */

    const info = useSelector(state => state.info);
    const showUI = useSelector(state => state.isLogged);

    const [highlighted, setHighlighted] = useState(0);

    if (showUI === true) {
        return (
            <Router>
            <div className="ui-container">
                <div style={{display:'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                    <h3 style={{fontWeight:"bold", color:"white", padding:"1em"}}>LV:{info.exp}</h3>
                    <progress style={{width:"70%"}} id="file" value={info.points}  max="1000"/>
                </div>
                <ul className="pages">
                    <Link to="/training/homepage"><li style={{backgroundColor:highlighted === 0 ? "rgb(255,255,255, 0.2)" : "rgb(255, 0, 0, 0)"}} onClick={()=> setHighlighted(0)} className="page-item">Homepage</li></Link>
                    <Link to="/training/leaderboard"><li style={{backgroundColor:highlighted === 1 ? "rgb(255,255,255, 0.2)" : "rgb(255, 0, 0, 0)"}} onClick={()=> setHighlighted(1)} className="page-item">Leaderboard</li></Link>
                    <Link to="/training/archive"><li style={{backgroundColor:highlighted === 2 ? "rgb(255,255,255, 0.2)" : "rgb(255, 0, 0, 0)"}} onClick={()=> setHighlighted(2)} className="page-item">Archive</li></Link>
                    <Link to="/training/settings"><li style={{backgroundColor:highlighted === 3 ? "rgb(255,255,255, 0.2)" : "rgb(255, 0, 0, 0)"}} onClick={()=> setHighlighted(3)} className="page-item">Quiz</li></Link>
                </ul>
                
                <Switch>
                    <Route path="/training" exact component={Homepage}/>
                    <Route path="/training/homepage" component={Homepage}/>
                    <Route path="/training/leaderboard" component={Leaderboard}/>
                    <Route path="/training/archive" component={Archive}/>
                    <Route path="/training/homepage" component={Homepage}/>
                </Switch>
            </div>
            </Router>
        )
    } else return null
}

export default UserInterface