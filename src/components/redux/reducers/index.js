import counterReducer from './counter';
import loggedReducer from './isLoggedIn';
import {combineReducers} from 'redux';


 const rootReducer = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer
})

export default rootReducer
