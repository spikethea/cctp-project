import counterReducer from './counter';
import infoReducer from './info';
import allergyReducer from './allergies';
import {combineReducers} from 'redux';


const rootReducer = combineReducers({
    counter: counterReducer,
    info: infoReducer,
    allergies: allergyReducer,
})

export default rootReducer
