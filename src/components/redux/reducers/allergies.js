const allergyReducer = (state = initState, action) => {
    let infoSelected = {};
    
    switch(action.type){
        case 'INCREASE_ALLERGY_QUANTITY':
            infoSelected = {...state.allergies[action.payload]};
            infoSelected.inputQuantity += 1;
            console.log(action.payload);
            console.log(infoSelected);
            return {
                ...state,
                allergies: {
                    ...state.allergies,
                    [action.payload]: infoSelected,
                }
            }
            default: 
                return state
    }
}

const initState = {

    allergies: {
        peanut: {
            name: "Peanut",
            tagName: "peanut",
            quantity:3,
            inputQuantity:0
          },
          vegan: {
            name: "Vegan",
            tagName: "vegan",
            quantity:3,
            inputQuantity:0
          },
          dairy: {
            name: "Dairy",
            tagName: "dairy",
            quantity:3,
            inputQuantity:0
          }
    }
    
}

export default allergyReducer;