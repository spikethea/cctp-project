import React from 'react';
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

    const counter = useSelector(state => state.counter);
    const showUI = useSelector(state => state.isLogged);
    const dispatch = useDispatch();


    if (showUI === true) {
        return (
            <Router>
            <div className="ui-container">
                <p>Counter {counter}</p>
                <button onClick={() => dispatch(transform('INCREASE'))}>+</button>
                <button onClick={() => dispatch(transform('DECREASE'))}>-</button>
                <ul className="pages">
                    <Link to="/homepage"><li className="page-item">Homepage</li></Link>
                    <Link to="/leaderboard"><li className="page-item">Leaderboard</li></Link>
                    <Link to="/archive"><li className="page-item">Archive</li></Link>
                    <Link to="/settings"><li className="page-item">Quiz</li></Link>
                </ul>
                
                <Switch>
                    <Route path="/" exact component={Homepage}/>
                    <Route path="/homepage" component={Homepage}/>
                    <Route path="/Leaderboard" component={Leaderboard}/>
                    <Route path="/archive" component={Archive}/>
                    <Route path="/homepage" component={Homepage}/>
                </Switch>
            </div>
            </Router>
        )
    } else return null
}

export default UserInterface