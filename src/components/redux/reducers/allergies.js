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
            case 'SWITCH_ALLERGY_LEVEL':
                infoSelected = action.payload;

                let peanut, vegan, dairy, vegetarian, eggs, other, mustard;
                peanut = vegan = dairy = vegetarian = eggs = other = mustard = 0;

                function randomInteger(min, max) {// Function to chose a random integer between range of min & max
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                  }

                if (infoSelected === 1) {
                    console.log("Level 1: Peanut and Vegetarian");
                    peanut = randomInteger(2, 4);
                    vegetarian = randomInteger(1, 2);
                } else if (infoSelected === 2) {
                    console.log("Level 2: Peanut, Vegetarian, Vegan and Dairy");
                    peanut = randomInteger(1, 2);
                    vegetarian = randomInteger(1, 3);
                    vegan = randomInteger(1, 1);;
                    dairy = randomInteger(1, 2);;
                }
                console.log(infoSelected);

                return {
                    ...state,
                    allergies: {
                        ...state.allergies,
                        peanut: {
                            ...state.allergies.peanut,
                            quantity: peanut,
                        },
                        vegan: {
                            ...state.allergies.vegan,
                            quantity: vegan,
                        },
                        dairy: {
                            ...state.allergies.dairy,
                            quantity: dairy,
                        },
                        vegetarian: {
                            ...state.allergies.vegetarian,
                            quantity: vegetarian,
                        },
                        eggs: {
                            ...state.allergies.eggs,
                            quantity: eggs,
                        },
                        mustard: {
                            ...state.allergies.mustard,
                            quantity: mustard,
                        },
                        other: {
                            ...state.allergies.other,
                            quantity: other,
                        },
                    },
                }
            default: 
                return state
    }
}

const initState = {
    started: false,
    moving: false,
    difficulty: 1,
    allergies: {
        peanut: {
            name: "Peanut",
            tagName: "peanut",
            quantity:0,
            inputQuantity:0,
            isCorrect: false,
            color:"#f7be5c",
          },
          vegan: {
            name: "Vegan",
            tagName: "vegan",
            quantity:0,
            inputQuantity:0,
            isCorrect: false,
            color:"#00ff04",
          },
          dairy: {
            name: "Dairy",
            tagName: "dairy",
            quantity:0,
            inputQuantity:0,
            isCorrect: false,
            color:"#ede8e1",
          },
          vegetarian: {
            name: "Vegetarian",
            tagName: "vegetarian",
            quantity:0,
            inputQuantity:0,
            isCorrect: false,
            color:"#006302",
          },
          eggs: {
            name: "Eggs",
            tagName: "eggs",
            quantity:0,
            inputQuantity:0,
            isCorrect: false,
            color:"#ecf233",
          },
          mustard: {
            name: "Mustard",
            tagName: "mustard",
            quantity:0,
            inputQuantity:0,
            isCorrect: false,
            color:"#f542e9",
          },
          other: {
            name: "Other",
            tagName: "other",
            quantity:0,
            inputQuantity:0,
            isCorrect: false,
            color:"#000000",
          },
    }
    
}

export default allergyReducer;