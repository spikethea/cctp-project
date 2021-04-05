import infoReducer from './info';
import allergyReducer from './allergies';
import quizReducer from './quiz';

import {combineReducers} from 'redux';
import storage from 'redux-persist/lib/storage'


const appReducer = combineReducers({
    info: infoReducer,
    allergies: allergyReducer,
    quiz: quizReducer,
})

const rootReducer = (state, action) => {
    if (action.type === 'RESET_STATE') {
        console.log("Resetting State")
        // for all keys defined in your persistConfig(s)
        storage.removeItem('persist:root')
        // storage.removeItem('persist:otherKey')

        state = undefined;
    }

    return appReducer(state, action)
}

export default rootReducer
