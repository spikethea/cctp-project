import counterReducer from './counter';
import loggedReducer from './isLoggedIn';
import infoReducer from './info';
import allergyReducer from './allergies';

import {combineReducers} from 'redux';


const rootReducer = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    info: infoReducer,
    allergies: allergyReducer,
})

export default rootReducer
