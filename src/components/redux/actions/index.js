import {SHOW_UI, HIDE_UI, INCREASE, DECREASE, POPUP_INFO, HIDE_INFO} from './types'

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

export const showInfo = (tagName) => {
    console.log("displaying infobox " + tagName);
    return {
        type: POPUP_INFO,
        payload: tagName
    }
}

export const infoBox = (tagName) => {
    console.log("displaying infobox " + tagName);
    return {
        type: HIDE_INFO,
        payload: tagName
    }
}

export const getBadge = (tagName) => {
    console.log("displaying infobox " + tagName);
    return {
        type: HIDE_INFO,
        payload: tagName
    }
}