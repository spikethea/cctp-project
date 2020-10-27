import {SHOW_UI, HIDE_UI} from './types'

export const increment = () => {
    return {
        type: 'INCREMENT'
    };
};

export const showUserInterface = (name) => {
    console.log("inside showUI");
    return {
        type: name === 'SHOW_UI' ? SHOW_UI : HIDE_UI
    };
};