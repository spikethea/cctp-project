const quizReducer = (state = initState, action) => {
    let quizSelected = {};
    switch(action.type) {
        case 'SHOW_QUIZ':
          quizSelected = {...state.quizzes[action.payload]};
            return {
                ...state,
                quizActive: true,
                currentQuiz: quizSelected.tagName, 
            }
        case 'HIDE_QUIZ':

            return {
                ...state,
                quizActive: false,
                currentQuiz: null,
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
            console.log(action.payload);
            console.log(quizSelected);
            quizSelected.completed = true;
            console.log(quizSelected.tagName + " finished");
            return {
              ...state,
              quizActive: false,
              currentQuiz: null,
              quizzes: {
                ...state.quizzes,
                [action.payload]: quizSelected,
              }
            }
        default:
            return state
    }
}

const initState = {
    currentQuiz: null,
    quizActive: false,
    page:0,
    quizzes: {
      introduction: {
          tagName:"introduction",
          name: "Introduction",
          description:"Introductory quiz for new users of the app",
          lvl: 0,
          id: 0,
          completed: false,
          questions: [
              {
                question: "How do I access tasks?",
                answers: {
                  a: "Click a stage and play",
                  b: "Select a stage in the Homepage and select a difficult level",
                  c: "Select a difficulty level in the Homepage",
                  d: "Go to Work",
                },
                correctAnswer: "b"
              },
              {
                question: "What is the Most important thing to do ",
                answers: {
                  a: "Complete Tasks to level up",
                  b: "Check the Archive page to recite information before starting quizzes",
                  c: "All of the Above",
                  d: "Having Fun",
                },
                correctAnswer: "c"
              },
              {
                question: "How can I complete this training exercise?",
                answers: {
                  a: "Reach Level 10 and unlock all achievements for a extra prize",
                  b: "Remember all the information ",
                  c: "Hacking the HTML to finish the quiz",
                  d: "Reach Level 5 and complete the final quiz"
                },
                correctAnswer: "d"
              }
            ]
        },
        basics: {
          tagName:"basics",
          name: "Basics",
          description:"Test your knowledge of basic principles and skills in the Service Sector",
          lvl: 1,
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
          },
    }

    
}

export default quizReducer