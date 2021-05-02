const infoReducer = (state = initState, action) => {
    let infoSelected = {};
    let Points = 0;
    let initialPoints = 0;
    let expLevel = 0;
    let initialActivePoints = 0;
    let initialActiveBadge = "";
    let initialNotifications = 0;
    let tokens = 0;
    let initialPerformance = 0;

    switch(action.type) {
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
            initialPoints = state.points;
            initialActivePoints = state.activePoints;
            expLevel = state.exp;
            tokens = state.tokens;
            initialNotifications = state.notifications;
            infoSelected = {...state.infoBox[action.payload]};

            if (!infoSelected.displayed) {
                if (1000 > (initialPoints + 200)) {
                    initialPoints =  state.points + 200
                } else {
                    initialNotifications += 1;
                    expLevel += 1;
                    initialPoints = (state.points + 200) - 1000;
                }
                initialActivePoints = 200;
                tokens = state.tokens += 1;
                initialNotifications += 1;
            }

            return {
                ...state,
                exp: expLevel,
                points: initialPoints,
                activePoints: initialActivePoints,
                tokens: tokens,
                notifications: initialNotifications,
                displayingInfo: true,
                activeBox:infoSelected,
                infoBox: {
                    ...state.infoBox,
                    [action.payload]: infoSelected
                }
            }
        case 'HIDE_INFO':
            infoSelected = {...state.infoBox[action.payload]}
            infoSelected.displayed = true;
            return {
                ...state,
                displayingInfo:false,
                infoBox: {
                    ...state.infoBox,
                    [action.payload]: infoSelected
                }
            }
        case 'GET_BADGE':
            Points = action.payload;
            initialActivePoints = state.activePoints
            initialActiveBadge = state.activeBadge
            initialPoints = state.points
            expLevel = state.exp
            tokens = state.tokens
            initialNotifications = state.notifications;
            infoSelected = {...state.badges[action.payload]};
            
            if (!infoSelected.isAchieved) {
                if ((initialPoints + infoSelected.points) < 1000) {
                    initialPoints =  state.points + infoSelected.points
                } else {
                    expLevel += 1;
                    initialNotifications += 1;
                    initialPoints = (state.points + infoSelected.points) - 1000;
                }
                tokens += 3
                infoSelected.isAchieved = true;
                initialNotifications += 1;
                initialActiveBadge = infoSelected.tagname
                initialActivePoints = infoSelected.points
                
            }
            return {
                ...state,
                exp: expLevel,
                tokens: tokens,
                notifications: initialNotifications,
                activeBadge: initialActiveBadge,
                points: initialPoints,
                activePoints: initialActivePoints,
                badges: {
                    ...state.badges,
                    [action.payload]:infoSelected
                }
            }
            case 'HIDE_BADGE':
                return {
                    ...state,
                    activeBadge: null,
                }
        case 'SELECT_STAGE':
            infoSelected = {...state.stages[action.payload]}
            
            return {
                ...state,
                activeStage: infoSelected.id,
                gameState: 1,// gameState 1 is the state to select a level 
            }
        case 'SELECT_LEVEL':
            return {
                ...state,
                level: action.payload,
                gameState: 2,// gameState 2 is the state to start the task
            }
        case 'FINISH_LEVEL': 
            return {
                ...state,
                gameState: 3// GameState 3 finishes the level, bringing up the LevelEnd component
            }
        case 'RESTART_STAGE':// Restart the Task on the same level
            return {
                ...state,
                gameState: 1,
            }
        case 'RETURN_TO_HOME':// return back to Overworld/Home 
            return {
                ...state,
                level: null,
                gameState: 0,
                activeStage: 0,
            }
        case 'CLEAR_NOTIFICATIONS':
            return {
                ...state,
                notifications: 0,
            }
        case 'ADD_POINTS':
            initialNotifications = state.notifications
            Points = action.payload;
            initialPoints = state.points;
            expLevel = state.exp;
            if ((initialPoints + Points) < 1000) {
                Points = state.points + action.payload;
            } else {
                initialNotifications += 1;
                expLevel += 1;
                Points = (state.points + action.payload) - 1000;
            }
            return {
                ...state,
                notifications: initialNotifications,
                points: Points,
                activePoints: action.payload,
                exp: expLevel,
            }
        case 'ADD_TOKENS':
            tokens = state.tokens + action.payload;
            return {
                ...state,
                tokens: tokens,
            }
        case 'REMOVE_TOKENS':
            tokens = state.tokens;
            if (state.tokens - action.payload > 0) {
                tokens -= action.payload;
            } else {
                tokens = 0;
            }
        return {
            ...state,
            tokens: tokens,
        }
        case 'TOGGLE_MUTE':
            return {
                ...state,
                muted: !state.muted
            }
        case 'TOGGLE_TUTORIAL': 
            return {
                ...state,
                displayingTutorial: !state.displayingTutorial
            }
        case 'TOGGLE_PERFORMANCE':
            initialPerformance = state.performance;
            if (initialPerformance < 3) {
                initialPerformance += 1;
            } else {
                initialPerformance = 0;
            }
            return {
                ...state,
                performance: initialPerformance,
            }
        default: 
            return state
        
    }
}

const initState = {
    performance: 2,
    muted: true,
    points: 0,
    exp: 0,
    tokens:1,
    notifications: 0,
    page:0,
    displayingTutorial: true,
    displayingUI: false,
    displayingInfo: false,
    displayingBadge: false,
    gameState: 0,
    activeBox: "broom",
    activePoints:0,
    activeBadge: null,
    activeStage: 0,
    level: null,
    infoBox:{
        homeButton:{
            tagname:"homeButton",
            title:"Get Started",
            description:"To get started, press the home button and you can access your first stage.",
            displayed: false,
            image:"../assets/images/infobox/home-button.jpg"
        },
        gettingAround:{
            tagname:"gettingAround",
            title:"Getting Around",
            description:"If you find yourself getting lost finding the front office at your on your first day, ask a member of staff at the entrance. This could save you coming in late!",
            displayed: false,
            image:"../assets/images/infobox/getting-around.jpg",
        },
        fireExtinguisher:{
            tagname:"fireExtinguisher",
            title:"Fire Extinguisher",
            description:"This is a Fire Extinguisher, one the the most important health and safety items there is, accessible in every room. Only use them in emergencies.",
            displayed: false,
            image:"../assets/images/infobox/home-button.jpg"
        },
        fireAlarm:{
            tagname:"fireAlarm",
            title:"Fire Alarms",
            description:"Fire Alarms are THE most important and safety device there is, accessible in every room. If you see a fire, press the fire alarm and find your closest fire exit. Fire is no joke, and can kill.",
            displayed: false,
            image:"../assets/images/infobox/home-button.jpg"
        },
        spillage:{
            tagname:"spillage",
            title:"Floor spillage",
            description:"This is a Massive safety risk, if you see a wet floor, place a yellow warning sign over it, and alert your manager if there isnt time to clean it immedieately",
            displayed: false,
            image:"../assets/images/infobox/puddle.jpg"
        },
        faultyLighting:{
            tagname:"faultyLighting",
            title:"Faulty Lighting",
            description:"While in busy kitchens we need to see everything thats going on around us. If a light is broken or faulty, report it to your shift manager.",
            displayed: false,
            image:"../assets/images/infobox/faulty-lighting.jpg"
        },
        dangerZone:{
            tagname:"dangerZone",
            title:"Danger Zone!",
            description:"The Danger zone for food is between 8 and 60 degrees celcius. After two hours, food between these two temperature is to be thrown away. This is very important at Buffets, where is food left out for longer periods",
            displayed: false,
            image:"../assets/images/infobox/faulty-lighting.jpg"
        },
        crossContamination:{
            tagname:"crossContamination",
            title:"Cross Contamination",
            description:"Watch out for cross-contamination! Coloured chopping boards do not mix! Red is for raw meat, green is for fruit/veg and blue for raw fish.",
            displayed: false,
            image:"../assets/images/infobox/faulty-lighting.jpg"
        },
        obstruction:{
            tagname:"obstruction",
            title:"3 is a Bit Too Close",
            description:"Slips, Trips and Falls. Keep the walkway clear to avoid these. If a obstruction under 25kg is blocking the way, adopt a good posture, keeping the load close to your body and move in out the way if you can.",
            displayed: false,
            image:"../assets/images/infobox/faulty-lighting.jpg"
        },
        overstacked:{
            tagname:"overstacked",
            title:"Overstacked Shelf ",
            description:"Improper storage of heavy items on shelves above waist-height could fall on people, causing serious injuries. Never Overstack items like heavy equipment, tableware. Use a ladder if necessary to reach higher.",
            displayed: false,
            image:"../assets/images/infobox/faulty-lighting.jpg"
        },
        cleanSurfaces:{
            tagname:"cleanSurfaces",
            title:"Clean at all Times",
            description:"As a commercial kitchen, we need to keep our food preparation surfaces clean at all times. Always use the green detergent spray, for wiping common kitchen counters like this after use.",
            displayed: false,
            image:"../assets/images/infobox/faulty-lighting.jpg"
        },
        sanitising:{
            tagname:"sanitising",
            title:"Clean, then Sanitise",
            description:"At the end of the day, use a food-safe Blue Sanitiser to clean countertops. First use the detergent to clean the surface, then use the sanitiser to reduce the germs to a safe level. Sanitisers can be corrosive, so be careful",
            displayed: false,
            image:"../assets/images/infobox/faulty-lighting.jpg"
        },
        allergens: {
            tagname:"allergens",
            title: "Allergens",
            description: "Never offer allergen guidance to a customer, unless you have been specifically trained in-person to do so. Always refer to the given allergen chart given out on the day of the event.",
            displayed: false,
            image: "../assets/images/infobox/faulty-lighting.jpg"
        },
        buffet: {
            tagname:"buffet",
            title: "Allergen Signs Facing Forward",
            description: "At Buffets, all the food MUST have information on allergens clearly placed on/by each item with any of the 14 allergenic ingredients. Unless there is a member of the catering staff on site who can provide allergen information",
            displayed: false,
            image: "../assets/images/infobox/faulty-lighting.jpg"
        },
        peanut:{
            tagname:"peanut",
            title:"Peanuts",
            description:"The Peanut Allergy is a common allergy, which can cause anaphylactic shock. If cooking with allergens such as peanuts, it is difficult to guaruntee the the food as peanut free, so ALL meals must be peanut-free on the day of the event.",
            displayed: false,
            image:"../assets/images/infobox/faulty-lighting.jpg"
        },
        vegan:{
            tagname:"vegan",
            title:"Vegan",
            description:"The Peanut Allergy is one of the most common allergens in the UK. When at a Buffet",
            displayed: false,
            image:"../assets/images/infobox/faulty-lighting.jpg"
        },
        dairy:{
            tagname:"dairy",
            title:"Dairy",
            description:"Dairy Allergies/Intolerance are common. If a customer says they are lactose intolerant, mark them down as dairy as lactose is a ingredient of milk.",
            displayed: false,
            image:"../assets/images/infobox/faulty-lighting.jpg"
        },
        vegetarian:{
            tagname:"vegetarian",
            title:"Vegetarian Choices",
            description:"A less critical allergen/dietary choice, but nevertheless important. Many Muslim customer may choose to eat vegetarian if there is no Halal available.",
            displayed: false,
            image:"../assets/images/infobox/faulty-lighting.jpg"
        },
        eggs:{
            tagname:"eggs",
            title:"Eggs",
            description:"Between 0.5 and 2.5% of children have an egg allergy. Eggs can be found in foods you don’t expect, including cakes, breads to pasta, mayonnaise and glazes",
            displayed: false,
            image:"../assets/images/infobox/faulty-lighting.jpg"
        },
        mustard:{
            tagname:"mustard",
            title:"Mustard",
            description:"The Peanut Allergy is one of the most common allergens in the UK. When at a Buffet",
            displayed: false,
            image:"../assets/images/infobox/faulty-lighting.jpg"
        },
        other:{
            tagname:"other",
            title:"Other Allergens",
            description:"There are 14 named allergens, but alot more allergies than that. Bee stings, tree nuts, and fish can cause Anaphylaxis as well as peanuts",
            displayed: false,
            image:"../assets/images/infobox/faulty-lighting.jpg"
        },
    },
    badges: {
        curiousCat: {
            tagname:"curiousCat",
            title:"Be a Curious Cat",
            description:"Curiosity killed the cat, but satisfaction brough it back. Keep being inquisitive.",
            isAchieved: false,
            image:"../assets/svg/badges/curious-cat.svg",
            points: 550,
        },
        brainiac: {
            tagname:"brainiac",
            title:"Brainiac!",
            description:"You've completed more than 3 quizzes, keep going (you're halfway there)",
            isAchieved: false,
            image:"../assets/svg/badges/brainiac.svg",
            points: 750,
        },
        goodEye:{
            tagname:"goodEye",
            title:"Good Eye",
            description:"Nice One, you Spotted the hidden Bin Bag. Attention to detail in hospitality is  a key skill.",
            isAchieved: false,
            image:"../assets/svg/badges/good-eye.svg",
            points: 500,
        },
        oneHundredPercent:{
            tagname:"oneHundredPercent",
            title:"100%",
            description:"You've 100% the first stage!",
            isAchieved: false,
            image:"../assets/svg/badges/100.svg",
            points: 350,
        },
        firstLoss: {
            tagname:"firstLoss",
            title:"First Loss",
            description:"Sometimes you win, sometimes you lose. Its the taking part that counts, right?",
            isAchieved: false,
            image:"../assets/svg/badges/firstloss.svg",
            points: 100,
        }
    },
    stages: [
                {
                name: "Health and Safety",
                tagname:"healthAndSafety",
                id:0,
                exp:0,
                img:"../../assets/images/levels/health_and_safety.jpg",
                description:"This stage is all about using your observational skills to spot all the dangerous hazards around the room, and ensuring the safety of you and are others around you.",
                howToPlay: "Identify and click/tap to find archive information about hazards. Indentify all them to complete!",
                activeLevel:0,
                levels: [
                    {
                        name: "Upper Kitchen",
                        tagname:"correctUniform",
                        description:"This is the Smallest kitchen in the Venue. "
                    },
                    {
                        name: "Main Ktichen",
                        tagname:"coffeeMachine",
                        description:"The main kitchen in the room, this "
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
                exp:3,
                img:"../../assets/images/levels/allergies.jpg",
                description:"Allergen lists are an important task, where you must the correct details of each customer to essential accuracy, in a tight amount of space. ensuring the customers get their dietal preferences right.",
                howToPlay: "To play this game, you must use your arithmetic and memory skills to keep count of the amount of each color coded allergic customer. Once the timer is up, you must convert these using the allergen chart and submit correctly.",
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
                exp:6,
                img:"../../assets/images/levels/customer_service.jpg",
                description:"Customer Service Skills will be the most frequently used skills on the job. This stage will teach you how to handle daily situations which you will come across everyday, and improve your confidence with dealing with innapropriate customers.",
                howToPlay: "To play this game, you must talk to each customer and pick the most appropriate sentence for each .",
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
                name: "Table Service",
                tagname:"tableService",
                id:3,
                exp:7,
                img:"../../assets/images/levels/customer_service.jpg",
                description:"Organizing is paramount to successfully running an event. You will learn how to place tableware correctly and lay linen.",
                howToPlay: "This stage has a time-limit to correctly place utensils on each table. Use the arrow keys/keyboard to move each utensil to the correct place.",
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
        ]
    
}

export default infoReducer;