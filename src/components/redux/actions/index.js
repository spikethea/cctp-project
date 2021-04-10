import {RESET_STATE, SHOW_UI, HIDE_UI, SWITCH_PAGE, POPUP_INFO, HIDE_INFO, GET_BADGE, HIDE_BADGE, SELECT_STAGE, RESTART_STAGE, RETURN_TO_HOME, SELECT_LEVEL, FINISH_LEVEL, CLEAR_NOTIFICATIONS, DECREASE_ALLERGY_QUANITITY, INCREASE_ALLERGY_QUANTITY, SWITCH_ALLERGY_LEVEL, ADD_POINTS, SHOW_QUIZ, HIDE_QUIZ, SWITCH_QUIZ, FINISH_QUIZ, WIN_QUIZ, ADD_TOKENS, REMOVE_TOKENS, RESET_ALLERGY_QUANTITIES, TOGGLE_MUTE, TOGGLE_TUTORIAL, TOGGLE_PERFORMANCE} from './types'

export const showUserInterface = (name) => {

    return {
        type: name === 'SHOW_UI' ? SHOW_UI : HIDE_UI,
    };
};

export const switchPage = (page) => {
    return {
        type: SWITCH_PAGE,
        payload: page
    }
}

export const showInfo = (tagName) => {
    return {
        type: POPUP_INFO,
        payload: tagName
    }
}

export const closeInfoBox = (tagName) => {
    return {
        type: HIDE_INFO,
        payload: tagName
    }
}

export const getBadge = (badgeName) => {

    return {
        type: GET_BADGE,
        payload: badgeName
    }
}

export const hideBadge = (badgeName) => {

    return {
        type: HIDE_BADGE,
        payload: badgeName
    }
}

export const selectStage = (stageID) => {

    return {
        type: SELECT_STAGE,
        payload: stageID
    }
}

export const endStage = (name) => {

    return {
        type: name === 'restart' ? RESTART_STAGE : RETURN_TO_HOME,
    }
}

export const selectLevel = (level) => {

    return {
        type: SELECT_LEVEL,
        payload: level
    }
}

export const finishLevel = () => {

    return {
        type: FINISH_LEVEL,
    }
}

export const clearNotifications = () => {

    return {
        type: CLEAR_NOTIFICATIONS
    }
}

export const allergyQuantity = (allergyName, action) => {

    return {
        type: action === "increase" ? INCREASE_ALLERGY_QUANTITY : DECREASE_ALLERGY_QUANITITY,
        payload: allergyName,
    }
}

export const allergyLevel = (level) => {
    return {
        type: SWITCH_ALLERGY_LEVEL,
        payload: level,
    }
}

export const allergyReset = () => {
    return {
        type: RESET_ALLERGY_QUANTITIES,
    }
}

export const addPoints = (points) => {

    return {
        type: ADD_POINTS,
        payload: points,
    }
}

export const toggleQuiz = ( name, action) => {
    return {
        type: action === "show" ? SHOW_QUIZ : action === "hide" ? HIDE_QUIZ : action === "finish" ? FINISH_QUIZ: WIN_QUIZ,
        payload: name
    }
}

export const selectQuiz = (quiz) => {
    return {
        type: SWITCH_QUIZ,
        payload: quiz,
    }
}

export const winQuiz = (quiz) => {
    return {
        type: WIN_QUIZ,
        payload: quiz,
    }
}

export const tokens = (quantity, action) => {
    return {
        type: action === 'add' ? ADD_TOKENS : REMOVE_TOKENS,
        payload: quantity
    }
}

export const toggleMute = (toggle) => {
    return {
        type: TOGGLE_MUTE,
        payload: toggle
    }
}

export const toggleTutorial = (toggle) => {
    return {
        type: TOGGLE_TUTORIAL,
        payload: toggle
    }
}

// Resseting the Redux state
export const resetState = (action) => {
    return {
        type: RESET_STATE
    }
}

export const performance = (action) => {
    return {
        type: action === 'toggle' ? TOGGLE_PERFORMANCE : TOGGLE_PERFORMANCE
    }
}
