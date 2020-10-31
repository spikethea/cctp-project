import {SHOW_UI, HIDE_UI, INCREASE, DECREASE} from './types'

export const transform = (name) => {
    console.log("inside tranform");
    console.log("action is " + name);
    return {
        type: name === 'INCREASE' ? INCREASE : DECREASE
    };
};

export const showUserInterface = (name) => {
    console.log("inside showUI");
    return {
        type: name === 'SHOW_UI' ? SHOW_UI : HIDE_UI
    };
};