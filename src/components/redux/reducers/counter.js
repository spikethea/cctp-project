const counterReducer = (state = 1, action) => {
    switch(action.type){
        case 'INCREASE':
            return state + 1
        case "DECREASE":
            return state - 1
        default: 
            return state
    }
}

export default counterReducer;