const quizReducer = (state = initState, action) => {
    let quizSelected = {};
    switch(action.type) {
        case 'SHOW_QUIZ':

            return {
                ...state,
                quizActive: true,
            }
        case 'HIDE_QUIZ':

            return {
                ...state,
                quizActive: false,
            }
        case 'SWITCH_QUIZ':
          quizSelected = {...state.quizzes[action.payload]};
          console.log(quizSelected);
          return {
            ...state,
            currentQuiz: quizSelected.tagName
          }
          case 'FINISH_QUIZ':
            quizSelected = {...state.quizzes[action.payload]};
            console.log(quizSelected);
            return {
              ...state,
              quizActive: false,
              currentQuiz: null,
            }
        default:
            return state
    }
}

const initState = {
    currentQuiz: null,
    quizActive: false,
    quizzes: {
        introduction: {
            tagName:"introduction",
            name: "Introduction",
            description:"Introductory quiz for new users of the app, to test your knowledge of basic principles and skills in the Service Sector",
            lvl: 0,
            id: 0,
            completed: false,
            questions: [
                {
                  question: "What is the Hospitality Industry?",
                  answers: {
                    a: "A collection of Venues where you will work at",
                    b: "relationship between a guest and a host",
                    c: "Brendan Eich",
                    d: "a broad category of fields within the service industry that includes food and drink service, event planning, etc.",
                  },
                  correctAnswer: "d"
                },
                {
                  question: "Which Skillset is required for Hospitality Sector?",
                  answers: {
                    a: "Observation Skills",
                    b: "Conversational Skills",
                    c: "All of the Above",
                    d: "Arithmetic Skills",
                  },
                  correctAnswer: "c"
                },
                {
                  question: "Where should I go to find directions to the Front Office (where I can sign in)?",
                  answers: {
                    a: "Human Resources",
                    b: "The Front Office",
                    c: "A Random Employee",
                    d: "The Staff at the Front Gate"
                  },
                  correctAnswer: "d"
                }
              ]
        }
    }

    
}

export default quizReducer