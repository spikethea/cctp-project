const infoReducer = (state = initState, action) => {
    let infoSelected = {};
    switch(action.type){
        case 'POPUP_INFO':
            infoSelected = {...state.infoBox[action.payload]}
            console.log(action.payload);
            console.log(infoSelected);
            //infoSelected.displaying = true;
            return {
                ...state,
                displayingInfo:true,
                activeBox:infoSelected
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
            if (!infoSelected.displaying) {
                infoSelected.displaying = true;
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
                activeStage:infoSelected.id,
            }
        case 'CLEAR_NOTIFICATIONS':
            return {
                ...state,
                notifications: 0,
            }
        default: 
            return state
    }
}

const initState = {
    points: 0,
    exp: 2,
    notifications: 1,
    displayingInfo: false,
    displayingBadge: false,
    activeBox:"Broom",
    activeBadge: {

    },
    activeStage: 2,
    infoBox:{
        homeButton:{
            tagname:"HomeButton",
            title:"Get Started",
            description:"To get started, press the home button and you can access your first task.",
            displaying: false
        },
        fireExtinguisher:{
            tagname:"fireExtinguisher",
            title:"Fire Extinguisher",
            description:"This is a Fire Extinguisher, one the the most important health and safety items there is, accessible in every room. Only use them in emergencies.",
            displaying: false
        },
        puddle:{
            tagname:"puddle",
            title:"Its a Puddle!",
            description:"This is a Massive Health and Safety risk, if you see a puddle (which hasnt already been spotted) cover it with a sign immediately!",
            displaying: false
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
                    name: "Overworld Map",
                    tagname:"overworldMap",
                    id:0,
                    exp:0,
                    description:"This is the Overworld Map, Have a look around to see if you can find anything interesting",
                    activeLevel:0,
                    levels: 0,
                },
                {
                name: "Health and Safety",
                tagname:"healthAndSafety",
                id:1,
                exp:0,
                img:"../../assets/images/levels/health_and_safety.jpg",
                description:"This stage is all about managing your Health, and ensuring the safety of you are others around you when Maecenas a nunc ac velit ultrices gravida. Nunc scelerisque diam quis efficitur posuere. Cras id hendrerit libero, nec luctus turpis. Etiam non ullamcorper sem. Curabitur vel dui ligula. Mauris congue a augue at pulvinar. Quisque ut ultrices ante. Nulla interdum nisl dolor, sit amet lacinia lectus dictum id.",
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
                name: "Allergy List",
                tagname:"allergyLists",
                id:2,
                exp:2,
                img:"../../assets/images/levels/allergies.jpg",
                description:"Allergy testing is all about ensuring the get the correct details in a tight amount of space",
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
                id:3,
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