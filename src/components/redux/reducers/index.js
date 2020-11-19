import counterReducer from './counter';
import loggedReducer from './isLoggedIn';
import infoReducer from './info';

import {combineReducers} from 'redux';


const rootReducer = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    info: infoReducer
})

export default rootReducer
