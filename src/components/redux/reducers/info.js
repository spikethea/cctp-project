const infoReducer = (state = initState, action) => {
    let infoSelected = {};
    switch(action.type){
        case 'SHOW_UI':
        return {
            ...state,
            displayingUI: true
            }
        case 'HIDE_UI':
            return {
                ...state,
                displayingUI: false
            }
        case 'SWITCH_PAGE':
            return {
                ...state,
                page:action.payload
            }
        case 'POPUP_INFO':
            infoSelected = {...state.infoBox[action.payload]}
            console.log(action.payload);
            console.log(infoSelected);
            infoSelected.displayed = true;
            return {
                ...state,
                displayingInfo:true,
                activeBox:infoSelected,
                infoBox: {
                    ...state.infoBox,
                    [action.payload]: infoSelected
                }
            }
        case 'HIDE_INFO':
            return {
                ...state,
                displayingInfo:false,
            }
        case 'GET_BADGE':
            let initialNotifications = state.notifications;
            let initialDisplaying = false;
            infoSelected = {...state.badges[action.payload]};
            if (!infoSelected.isAchieved) {
                infoSelected.isAchieved = true;
                initialDisplaying = true;
                initialNotifications += 1;
            }
            return {
                ...state,
                notifications: initialNotifications,
                displayingBadge: initialDisplaying,
                activeBadge:infoSelected,
                badges: {
                    ...state.badges,
                    [action.payload]:infoSelected
                }
            }
            case 'HIDE_BADGE':
                return {
                    ...state,
                    displayingBadge: false,
                }
        case 'SELECT_STAGE':
            infoSelected = {...state.stages[action.payload]}
            console.log(infoSelected.id);
            return {
                ...state,
                activeStage: infoSelected.id,
                levelSelect: true,
            }
        case 'GAME_STATE':
            console.log(action.payload)
            return {
                ...state,
                gameState: action.payload,
                levelSelect: false,
            }
        case 'CLEAR_NOTIFICATIONS':
            return {
                ...state,
                notifications: 0,
            }
        case 'ADD_POINTS':
            let Points = action.payload;
            let initalPoints = state.points;
            let expLevel = state.exp;
            if ((initalPoints + Points) < 1000) {
                Points = state.points + action.payload;
            } else {
                expLevel += 1;
                Points = (state.points + action.payload) - 1000;
            }
            return {
                ...state,
                points: Points,
                exp: expLevel,
            }
        default: 
            return state
    }
}

const initState = {
    points: 320,
    exp: 2,
    notifications: 1,
    page:0,
    displayingUI: false,
    displayingInfo: false,
    displayingBadge: false,
    levelSelect: false,
    activeBox:"Broom",
    activeBadge: {

    },
    activeStage: 0,
    gameState:0,
    infoBox:{
        homeButton:{
            tagname:"HomeButton",
            title:"Get Started",
            description:"To get started, press the home button and you can access your first task.",
            displayed: false
        },
        gettingAround:{
            tagname:"gettingAround",
            title:"Getting Around",
            description:"If you find yourself getting lost at your on your first day, ask a member of staff at the entrance and they will be able to help you find the front office. Avoid's you coming in late!",
            displayed: false,
        },
        fireExtinguisher:{
            tagname:"fireExtinguisher",
            title:"Fire Extinguisher",
            description:"This is a Fire Extinguisher, one the the most important health and safety items there is, accessible in every room. Only use them in emergencies.",
            displayed: false,
        },
        puddle:{
            tagname:"puddle",
            title:"Its a Puddle!",
            description:"This is a Massive Health and Safety risk, if you see a puddle, cover it with a yellow warning sign immediately!",
            displayed: false
        }
    },
    badges: {
        goodEye:{
            tagname:"goodEye",
            title:"Good Eye",
            description:"Nice One, you Spotted the Puddle Underneath",
            isAchieved: false,
            image:"../../assets/svg/badges/goodEye.svg"
        },
        oneHundredPercent:{
            tagname:"oneHundredPercent",
            title:"100%",
            description:"You've 100% the stage!",
            isAchieved: false,
            image:"../../assets/svg/badges/100.svg"
        }
    },
    stages: [
                {
                name: "Health and Safety",
                tagname:"healthAndSafety",
                id:0,
                exp:0,
                img:"../../assets/images/levels/health_and_safety.jpg",
                description:"This stage is all about managing your Health, and ensuring the safety of you are others around you when Maecenas a nunc ac velit ultrices gravida.",
                activeLevel:0,
                levels: [
                    {
                        name: "Correct Uniform",
                        tagname:"correctUniform",
                    },
                    {
                        name: "Coffee Machine",
                        tagname:"coffeeMachine",
                    },
                    {
                        name: "Food Safety",
                        tagname:"foodSafety",
                    },
                ]
            },
            {
                name: "Allergen List",
                tagname:"allergyLists",
                id:1,
                exp:2,
                img:"../../assets/images/levels/allergies.jpg",
                description:"Allergen lists are an important task, where you must the correct details of each customer to essential accuracy, in a tight amount of space. ensuring the customers get their dietal prefences and no potential allrgic reaction occurs.",
                activeLevel:0,
                levels: [
                    {
                        name: "Correct Uniform",
                        tagname:"correctUniform",
                    },
                    {
                        name: "Coffee Machine",
                        tagname:"coffeeMachine",
                    },
                    {
                        name: "Food Safety",
                        tagname:"foodSafety",
                    },
                ]
            },
            {
                name: "Customer Service",
                tagname:"customerService",
                id:2,
                exp:5,
                img:"../../assets/images/levels/customer_service.jpg",
                activeLevel:0,
                levels: [
                    {
                        name: "Correct Uniform",
                        tagname:"correctUniform",
                    },
                    {
                        name: "Coffee Machine",
                        tagname:"coffeeMachine",
                    },
                    {
                        name: "Food Safety",
                        tagname:"foodSafety",
                    },
                ]
            }
        ]
    
}

export default infoReducer;