const quizReducer = (state = initState, action) => {
    let quizSelected = {};
    let initialCompleted = 0;
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
            console.log(quizSelected.tagName + " finished");
            return {
              ...state,
              quizActive: false,
              quizzes: {
                ...state.quizzes,
                [action.payload]: quizSelected,
              }
            }
            case 'WIN_QUIZ':
            initialCompleted = state.completed;
            quizSelected = {...state.quizzes[action.payload]};
            console.log(action.payload);
            console.log(quizSelected);
            if (initialCompleted) {
              initialCompleted += 1
            }
            quizSelected.completed = true;
            console.log("you  won " + quizSelected.name);
            return {
              ...state,
              quizActive: false,
              completed: initialCompleted,
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
    completed: 0,
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
                  b: "Select a stage in the Homepage and choose a difficult level",
                  c: "Select a difficulty level in the Homepage",
                  d: "Go to Work",
                },
                correctAnswer: "b"
              },
              {
                question: "What is the most important thing to do in ServiceLearn",
                answers: {
                  a: "Complete stages to level up",
                  b: "Check the Archive page to recite information before starting quizzes",
                  c: "All of the Above",
                  d: "Having Fun",
                },
                correctAnswer: "c"
              },
              {
                question: "How can I complete this training exercise (proof-of-concept version)?",
                answers: {
                  a: "Reach Level 5 and unlock all achievements for a extra prize",
                  b: "Remember all the information ",
                  c: "Hacking the HTML to finish the quiz",
                  d: "Reach Level 3 and complete 80% of the quizzes"
                },
                correctAnswer: "d"
              },
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
            ]
        },
        keepingItClean: {
          tagName:"keepingItClean",
          name: "Keeping it Clean",
          description:"How to clean the . It is recommended that you play Health & Safety before you play this quiz.",
          lvl: 1,
          id: 0,
          completed: false,
          questions: [
              
              {
                question: "What chemical should you use for general cleaning purposes?",
                answers: {
                  a: "Soap",
                  b: "Disenfectant",
                  c: "Sanitiser",
                  d: "Detergent"
                },
                correctAnswer: "d"
              },
              {
                question: "What Colour is the Detergent Spray?",
                answers: {
                  a: "Red",
                  b: "Green",
                  c: "Blue",
                  d: "Purple"
                },
                correctAnswer: "b"
              },
              {
                question: "When should kitchen surfaces be cleaned?",
                answers: {
                  a: "Clean as you go",
                  b: "Every 2 hours",
                  c: "When the manager says",
                  d: "Every 15 minutes"
                },
                correctAnswer: "a"
              },
              {
                question: "How often should you sanitise",
                answers: {
                  a: "At the end of the day",
                  b: "Clean as you go",
                  c: "Only clean, don't sanitise",
                  d: "Every 15 minutes"
                },
                correctAnswer: "a"
              },
              {
                question: "What is the method for sanitising dirty surfaces?",
                answers: {
                  a: "Clean the surface with a sanitiser, then use the disinfectant to detergent",
                  b: "Clean the surface with a detergent, then use the disinfectant to sanitise",
                  c: "Clean the surface with a sanitiser",
                  d: "Sanitise with a detergent"
                },
                correctAnswer: "b"
              },
            ]
          },
          hazardousSituations: {
            tagName:"hazardousSituations",
            name: "Hazardous Situations",
            description:"How to clean the . It is recommended that you complete both 'Health & Safety' levels before you play this quiz.",
            lvl: 2,
            id: 0,
            completed: false,
            questions: [
                
                {
                  question: "If you see a puddle in the Kitchen what should you do?",
                  answers: {
                    a: "Place a yellow wet floor sign over it then continue with work.",
                    b: "Place a yellow wet floor sign over it, then alert a manager.",
                    c: "Mop up the puddle immediately.",
                    d: "Clean the puddle with disinfectant."
                  },
                  correctAnswer: "b"
                },
                {
                  question: "How Many Fire Alarms are in the building?",
                  answers: {
                    a: "15 in every department.",
                    b: "54",
                    c: "At least one in every room.",
                    d: "One within every 50 metres"
                  },
                  correctAnswer: "c"
                },
                {
                  question: "What is the MOST important health and safety feature in Hospitality?",
                  answers: {
                    a: "The Fire Extinguiser, because it can save lives by extinguish fires",
                    b: "The customer service",
                    c: "The windows because they prevent people from becoming exhausted and hot.",
                    d: "The Fire Alarm, because it saves lives by giving a early warning in the event of a fire"
                  },
                  correctAnswer: "d"
                },
                {
                  question: "What is the problem with this picture?",
                  image: "https://www.rosehillwinecellars.com/blog/wp-content/uploads/2010/08/wine-stored-imporperly.jpg",
                  alt: "Overstacked Boxes in room",
                  answers: {
                    a: "The storage is overstacked",
                    b: "Its in the wrong place",
                    c: "Its not clean enough",
                    d: "Everything shuold be in boxes"
                  },
                  correctAnswer: "a"
                },
                {
                  question: "What is the problem with this picture?",
                  image: "https://lh3.googleusercontent.com/proxy/V_-BADjyIl8Z0UVwiqA9DB8YCSeRnvqQGW-2dm0PYAYEu7gNE9WhsLR_THos7uf_ij8GfLfqsDBjiaPovr1u1remOCbcqE83MsChj5BAT4DDPrCZlFoNgBfAK-y3i-BltZeNXuIiVWA",
                  alt: "Bad lighting",
                  answers: {
                    a: "The kitchen hasnt got enough thing",
                    b: "The lighting is broken, and needs to be replaced with a lamp",
                    c: "There is bad/broken lighting, and that means that people in the kitchen cant see",
                    d: "The kitchen is dirty"
                  },
                  correctAnswer: "c"
                },
              ]
            },
            foodSafety: {
              tagName:"foodSafety",
              name: "Food Safety",
              description:"How to clean the . It is recommended that you complete both 'Health & Safety' levels before you play this quiz.",
              lvl: 2,
              id: 0,
              completed: false,
              questions: [
                  
                  {
                    question: "What is the temperature zone where bacteria usually grow?",
                    answers: {
                      a: "Between 8C and 60C (The Danger Zone)",
                      b: "Straight out the microwave (The Stranger Zone)",
                      c: "Below 100C (The Bacterial Opportunity Zone)",
                      d: "Between 20C and 170C (The Danger Zone)"
                    },
                    correctAnswer: "a"
                  },
                  {
                    question: "How long is it acceptable for food to stay out in the Danger Zone?",
                    answers: {
                      a: "5 Minutes",
                      b: "30 Minutes",
                      c: "2 Hours",
                      d: "3 Hours"
                    },
                    correctAnswer: "c"
                  },
                  {
                    question: "At what type of event is this more likely to happen?",
                    answers: {
                      a: "Open Catering/Buffets",
                      b: "VIP Events",
                      c: "Seated events",
                      d: "On-Bar food service"
                    },
                    correctAnswer: "a"
                  },
                  {
                    question: "How can the risk of cross contamination be reduced?",
                    answers: {
                      a: "Using appropriate cutting boards for each type of use",
                      b: "washing your hands after touching raw food and before you handle ready-to-eat food ",
                      c: "wash utensils, plates and chopping boards for raw and cooked food thoroughly between tasks.",
                      d: "All the above"
                    },
                    correctAnswer: "d"
                  },
                  {
                    question: "What type of cutting board should be used to prepare this? ",
                    image: "/assets/images/quizzes/beach-sea-silhouette-cold-abstract-wine-1048440-pxhere.com.jpg",
                    alt: "photo of raw fish",
                    answers: {
                      a: "A blue plastic cutting board",
                      b: "Wooden cutting board",
                      c: "A red plastic cutting board",
                      d: "A white plastic cutting board"
                    },
                    correctAnswer: "a"
                  },
                  {
                    question: "What is this coloured cutting board used for (picture of green cutting board)?",
                    image: "/assets/images/quizzes/beach-sea-silhouette-cold-abstract-wine-1048440-pxhere.com.jpg",
                    alt: "photo of raw fish",
                    answers: {
                      a: "Raw meat",
                      b: "White meat",
                      c: "Vegetables and fish",
                      d: "Fruit and Vegetables"
                    },
                    correctAnswer: "d"
                  },
                ]
              },
              allergensBasic: {
                tagName:"allergensBasic",
                name: "Allergens - Basic",
                description:"How to clean the . It is recommended that you complete both 'Health & Safety' levels before you play this quiz.",
                lvl: 3,
                id: 0,
                completed: false,
                questions: [
                    
                    {
                      question: "How many allergen categories are there in our Hospitality venue?",
                      answers: {
                        a: "6 including the ‘other’ category",
                        b: "6 + the ‘other’ Category ",
                        c: "An unlimited amount of allergen categories",
                        d: "8 categories"
                      },
                      correctAnswer: "b"
                    },
                    {
                      question: "What colour code is the Vegetarian option?",
                      answers: {
                        a: "Blue",
                        b: "Dark green",
                        c: "Brown",
                        d: "A shade of green"
                      },
                      correctAnswer: "b"
                    },
                    {
                      question: "Identify the issue with this Buffet Display (picture of Buffet without any allergen information cards)",
                      image:"https://www.tg-woodware.com/imagprod/categories/buffet-counter-display2.jpg",
                      alt: "Catering Display on table, without any labels",
                      answers: {
                        a: "Its not completely full",
                        b: "It has no special food for allergic people",
                        c: "It has no allergen information on the table ",
                        d: "All of the above"
                      },
                      correctAnswer: "c"
                    },
                    {
                      question: "What symptoms can an allergic person have if they consume food which they are allergic to?",
                      answers: {
                        a: "Anaphylaxis",
                        b: "A sore throat, or a raised, itchy, red rash ",
                        c: "Feeling sick",
                        d: "All the above"
                      },
                      correctAnswer: "d"
                    },
                    {
                      question: "How are allergens counted, to ensure the correct amount of speciality food is available?",
                      answers: {
                        a: "The number is counted by staff using colour codes, and then it is converted into one of the 14 named allergens.",
                        b: "The meals are pre-counted, then the missing customers food is thrown away.",
                        c: "The number of meals per head is counted by staff using colour codes, and then it is given to the Chef.",
                        d: "The amount of speciality meals is guessed, then the rest of the allergic people go hungry"
                      },
                      correctAnswer: "a"
                    },
                    {
                      question: "A customer with a milk allergy asks you if the milk provided is Soy or Cow’s Milk. How will you respond?",
                      answers: {
                        a: "Tell them that its soy, you're pretty sure that it is.",
                        b: "Check the Allergen Chart to make sure that the brand is made of soy milk.",
                        c: "Ask your manager if the milk can be swapped out for some soy milk.",
                        d: "Advise the customer to not drink the milk just in case it actually is cow’s milk."
                      },
                      correctAnswer: "b"
                    },
                  ]
                },
                allergensInDepth: {
                  tagName:"allergensInDepth",
                  name: "Allergens - In Depth",
                  description:"How to clean the . It is recommended that you complete both 'Health & Safety' levels before you play this quiz.",
                  lvl: 4,
                  id: 0,
                  completed: false,
                  questions: [
                      
                      {
                        question: "How should allergy information be displayed at Buffets?",
                        answers: {
                          a: "One on every table, clearly providing all the allergenic information available",
                          b: "On the table in-front of each food item, clearly providing any of the allergenic information",
                          c: "I must tell every customer what allergen the food item itself contains",
                          d: "On the Allergen Chart"
                        },
                        correctAnswer: "b"
                      },
                      {
                        question: "A customer lets you know that they are lactose intolerant. How will you mark them down on the allergen count?",
                        answers: {
                          a: "They have no allergies, don’t include them in the allergen count.",
                          b: "Ask your manager what lactose intolerance is.",
                          c: "Ask them if they would prefer to not eat dairy today.",
                          d: "Take it as a fish allergy and put them in that category"
                        },
                        correctAnswer: "c"
                      },
                      {
                        question: "A customer comes to you, distraught that they couldn’t find any Halal options. You have asked your manager and there are no extra Halal meals available. What do you do next?",
                        answers: {
                          a: "Apologise for the unfortunate situation, and recommend the vegetarian options as a alternative",
                          b: "Apologise for the inconvenience.",
                          c: "Ask the customer if they would like their money back.",
                          d: "Apologise for the unfortunate situation and search the venue to find some Halal food."
                        },
                        correctAnswer: "a"
                      },
                      {
                        question: "A customer says they have a peanut allergy. The main meal cooked today is a peanut-based dish. What action will you take?",
                        answers: {
                          a: "Tell the customer politely, that it is not safe for them to have any of the cooked food today.",
                          b: "Apologize for the inconvenience and offer them a peanut-free dish which was also cooked in the same kitchen.",
                          c: "Tell the customer that they should’ve let someone know earlier that they had a peanut allergy.",
                          d: "Go to the kitchen and try to find something in the kitchen which doesn’t have peanuts in it."
                        },
                        correctAnswer: "a"
                      },
                      {
                        question: "A customer tells you they had an allergic reaction, but they have no symptoms and say they feel fine. What will you do?",
                        answers: {
                          a: "Tell them if they feel fine, come back in 30 minutes if they start to feel worse",
                          b: "Treat it as an allergic reaction and give them a EpiPen",
                          c: "Alert your manager because the allergic reaction could set in later",
                          d: "Do all the above"
                        },
                        correctAnswer: "c"
                      },
                      {
                        question: "Which allergen can cause Anaphylaxis?",
                        answers: {
                          a: "Fish",
                          b: "Insect Stings",
                          c: "Pollen",
                          d: "Any substance can cause Anaphylaxis"
                        },
                        correctAnswer: "d"
                      },
                    ]
                  },
    }

    
}

export default quizReducer