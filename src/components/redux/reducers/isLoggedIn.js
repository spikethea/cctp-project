const loggedReducer = (state = false, action) => {
    switch(action.type){
        case'SHOW_UI':
            return state = true;
        case'HIDE_UI':
            return state = false;
        default: 
            return state
    }
}

export default loggedReducer