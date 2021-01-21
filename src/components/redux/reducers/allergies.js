const allergyReducer = (state = initState, action) => {
    let infoSelected = {};
    
    switch(action.type){
        case 'INCREASE_ALLERGY_QUANTITY':
            infoSelected = {...state.allergies[action.payload]};
            infoSelected.inputQuantity += 1;
            if (infoSelected.inputQuantity === infoSelected.quantity) {
                infoSelected.isCorrect = true
            } else {
                infoSelected.isCorrect = false
            }
            console.log(action.payload);
            console.log(infoSelected);
            console.log(infoSelected.isCorrect)
            return {
                ...state,
                allergies: {
                    ...state.allergies,
                    [action.payload]: infoSelected,
                }
            }
            case 'DECREASE_ALLERGY_QUANTITY':
                infoSelected = {...state.allergies[action.payload]};
                if(infoSelected.inputQuantity > 0) {infoSelected.inputQuantity -= 1;}
                if (infoSelected.inputQuantity === infoSelected.quantity) {
                    infoSelected.isCorrect = true
                } else {
                    infoSelected.isCorrect = false
                }
                console.log(action.payload);
                console.log(infoSelected);
                console.log(infoSelected.isCorrect)
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
    started:false,
    difficulty:1,
    allergies: {
        peanut: {
            name: "Peanut",
            tagName: "peanut",
            quantity:1,
            inputQuantity:0,
            isCorrect: false,
            color:"#f7be5c",
          },
          vegan: {
            name: "Vegan",
            tagName: "vegan",
            quantity:1,
            inputQuantity:0,
            isCorrect: false,
            color:"#00ff04",
          },
          dairy: {
            name: "Dairy",
            tagName: "dairy",
            quantity:1,
            inputQuantity:0,
            isCorrect: false,
            color:"#ede8e1",
          },
          vegetarian: {
            name: "Vegetarian",
            tagName: "vegetarian",
            quantity:3,
            inputQuantity:0,
            isCorrect: false,
            color:"#006302",
          },
          eggs: {
            name: "Eggs",
            tagName: "eggs",
            quantity:1,
            inputQuantity:0,
            isCorrect: false,
            color:"#ecf233",
          },
          mustard: {
            name: "Mustard",
            tagName: "mustard",
            quantity:2,
            inputQuantity:0,
            isCorrect: false,
            color:"#ff6f00",
          },
          other: {
            name: "Other",
            tagName: "other",
            quantity:4,
            inputQuantity:0,
            isCorrect: false,
            color:"#f542e9",
          },
    }
    
}

export default allergyReducer;