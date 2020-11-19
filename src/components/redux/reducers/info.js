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
        default: 
            return state
    }
}

const initState = {
    points: 0,
    displayingInfo: false,
    activeBox:"Broom",
    infoBox:{
        fireExtinguisher:{
        tagname:"fireExtinguisher",
        title:"Fire Extinguisher",
        description:"This is a Fire Extinguisher, on the the most important health and Safety",
        displaying: false
        },
        puddle:{
        tagname:"puddle",
        title:"Its a Puddle!",
        description:"This is a Massive Health and Safety risk",
        displaying: false
        }
    },
    badges: {
        goodEye:{
            tagname:"goodEye",
            title:"Good Eye",
            description:"Nice One, you Spotted the Puddle Underneath",
            isAchieved: false
        }
    }
    
}

export default infoReducer;