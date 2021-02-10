import counterReducer from './counter';
import infoReducer from './info';
import allergyReducer from './allergies';
import quizReducer from './quiz';

import {combineReducers} from 'redux';


const rootReducer = combineReducers({
    counter: counterReducer,
    info: infoReducer,
    allergies: allergyReducer,
    quiz: quizReducer,
})

export default rootReducer
