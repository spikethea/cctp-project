import {SHOW_UI, HIDE_UI, SWITCH_PAGE, POPUP_INFO, HIDE_INFO, GET_BADGE, HIDE_BADGE, SELECT_STAGE, GAME_STATE, CLEAR_NOTIFICATIONS, DECREASE_ALLERGY_QUANITITY, INCREASE_ALLERGY_QUANTITY, SWITCH_ALLERGY_LEVEL, ADD_POINTS, SHOW_QUIZ, HIDE_QUIZ, SWITCH_QUIZ} from './types'

export const showUserInterface = (name) => {
    console.log("inside showUI");
    return {
        type: name === 'SHOW_UI' ? SHOW_UI : HIDE_UI,
    };
};

export const switchPage = (page) => {
    console.log("switching page to " + page);
    return {
        type: SWITCH_PAGE,
        payload: page
    }
}

export const showInfo = (tagName) => {
    console.log("displaying infobox " + tagName);
    return {
        type: POPUP_INFO,
        payload: tagName
    }
}

export const closeInfoBox = (tagName) => {
    console.log("displaying infobox " + tagName);
    return {
        type: HIDE_INFO,
        payload: tagName
    }
}

export const getBadge = (badgeName) => {
    console.log("Acquired Badge " + badgeName);
    return {
        type: GET_BADGE,
        payload: badgeName
    }
}

export const hideBadge = (badgeName) => {
    console.log("Hiding Current Badge ");
    return {
        type: HIDE_BADGE,
        payload: badgeName
    }
}

export const selectStage = (stageID) => {
    console.log("Loading Stage " + stageID)
    return {
        type: SELECT_STAGE,
        payload: stageID
    }
}

export const gameState = (gameState) => {
    console.log("Level " + gameState);
    return {
        type: GAME_STATE,
        payload: gameState
    }
}

export const clearNotifications = () => {
    console.log("clearing notifications")
    return {
        type: CLEAR_NOTIFICATIONS
    }
}

export const allergyQuantity = (allergyName, action) => {
    console.log("changing allergy quantity of " + allergyName);
    console.log("action is " + action);
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

export const addPoints = (points) => {
    console.log("adding " + points + " points")

    return {
        type: ADD_POINTS,
        payload: points,
    }
}

export const toggleQuiz = (action) => {
    return {
        type: action === "show" ? SHOW_QUIZ : HIDE_QUIZ
    }
}

export const selectQuiz = (quiz) => {
    return {
        type: SWITCH_QUIZ,
        payload: quiz,
    }
}