import React, {useEffect, useState} from 'react';
import styles from './QuizTemplate.module.css';

//Packages
import { useSelector, useDispatch } from 'react-redux';
import { toggleQuiz, winQuiz, tokens } from './redux/actions';
import useSound from 'use-sound';


//Sounds

import incorrectSound from '../assets/audio/incorrect.mp3';
import correctSound from '../assets/audio/correct.mp3';


const QuizTemplate = ()=> {
    // Redux
    const state = useSelector(state => state.quiz);
    const info = useSelector(state => state.info);

    const dispatch = useDispatch();
    const quizzes = state.quizzes;
    const quizActive = state.quizActive
    const currentQuiz = quizzes[state.currentQuiz];
    
    //UseState
    const [incorrect, setIncorrect] = useState(false);
    const [correctNum, setCorrectNum] = useState(0);
    const [quizPage, setQuizPage] = useState(0);
    const [message, setMessage] = useState("Lets Go!")

    

    //useSound
     const [ playCorrect ] = useSound(correctSound, {volume: 0.25});
     const [ playIncorrect ] = useSound(incorrectSound, {volume: 0.2});

    useEffect(()=> {

        if (!quizActive) {
            setQuizPage(0);
            setCorrectNum(0);
            setMessage("Lets Go!");
        }
    }, [quizActive])

    useEffect(()=> {
        if (state.currentQuiz) {
            if (correctNum === currentQuiz.questions.length) {
                dispatch(winQuiz(state.currentQuiz))
            }
        }

    }, [correctNum, state.currentQuiz, currentQuiz, dispatch])

    const handleClick = (answer) => {

        let correctAnswer = currentQuiz.questions[quizPage].correctAnswer;

        if (currentQuiz.questions[quizPage]) {// Is there another question?
            if (answer === currentQuiz.questions[quizPage].correctAnswer) {// Check if answer is correct
                if (!info.muted) {
                    playCorrect();
                }
                setMessage("correct!");
                setQuizPage((prevState) => prevState + 1);
                setCorrectNum(correctNum + 1);
            } else {
                if (!info.muted) {
                    playIncorrect();
                }
                setMessage('Incorrect answer. The correct answer was ' + currentQuiz.questions[quizPage].answers[correctAnswer]);
                setIncorrect(true);
            }
        }

    }

    if (quizActive) {return (
            <>
                {incorrect ? <Incorrect setIncorrect={setIncorrect} setQuizPage={setQuizPage} message={message} dispatch={dispatch} currentQuiz={currentQuiz} /> : <Quiz message={message} correctNum={correctNum} quizActive={quizActive} handleClick={handleClick} dispatch={dispatch} currentQuiz={currentQuiz} quizPage={quizPage}/>}
                <div className={styles.background}></div>
            </>
        )} else return null


}


const Quiz = ({handleClick, currentQuiz, quizPage, dispatch, correctNum}) => {



    
        

            if (currentQuiz.questions[quizPage]) {

            return (
            <>
            <div className={styles.window}>
                <div className={styles.container}>
                    <nav>
                        <button onClick={() =>dispatch(toggleQuiz(currentQuiz.tagName, 'hide'))} alt="Close">+</button>
                    </nav>
                    <div className={styles.inner}>
                        <section className={styles.question}>
                                    <h2 style={{paddingBottom: currentQuiz.questions[quizPage].image ? "0em" : "2em"}}>{currentQuiz.name}</h2>
                                    {currentQuiz.questions[quizPage].image ? <img alt={currentQuiz.questions[quizPage].alt} src={currentQuiz.questions[quizPage].image}/>:null}
                                    <p>{currentQuiz.questions[quizPage].question}</p>
                        </section>
                        <section className={styles.answers}>
                            <article>
                                    <figure onClick={()=> handleClick('a')}>
                                        <p>{currentQuiz.questions[quizPage].answers.a}</p>
                                    </figure>
                                    <figure onClick={()=> handleClick('b')}>
                                        <p>{currentQuiz.questions[quizPage].answers.b}</p>
                                    </figure>
                                    <figure onClick={()=> handleClick('c')}>
                                        <p>{currentQuiz.questions[quizPage].answers.c}</p>
                                    </figure>
                                    <figure onClick={()=> handleClick('d')}>
                                        <p>{currentQuiz.questions[quizPage].answers.d}</p>
                                    </figure>
                            </article>
                        </section>
                    </div>
                    <footer>
                        <h3>
                            {quizPage + "/" + currentQuiz.questions.length}
                        </h3>
                    </footer>
                </div>
            </div>
            </>
        )} else {
            return (
            <>
                <div className={styles.window}>
                    <div className={styles.container}>
                        <nav>
                            <button onClick={() =>dispatch(toggleQuiz(currentQuiz.tagName, 'finish'))} alt="Close">+</button>
                        </nav>
                        <header>
                            <h1>Finished</h1>
                        </header>
                        <div className={styles.inner}>
                            <section>
                                <h1>You got {correctNum} Questions of out {currentQuiz.questions.length} right!</h1>
                                <button onClick={()=> dispatch(toggleQuiz(currentQuiz.tagName, 'finish'))}>Close</button>
                            </section>
                        </div>
                    </div>
                </div>
            </>
            )
        }
}

const Incorrect = ({message, setQuizPage, setIncorrect, dispatch, currentQuiz})=> {

    const handleClick = () => {
        setIncorrect(false);
        dispatch(toggleQuiz(currentQuiz.tagName, 'finish'))
        dispatch(tokens(1, 'remove'));
    }


    return (
        <div className={styles.window}>
                    <div className={styles.container}>
                        <nav>
                        <button onClick={handleClick} alt="Close Quiz">+</button>
                        </nav>
                        <div className={styles.inner}>
                            <h1>Incorrect Answer</h1>
                            <section>
                                <h1>{message}</h1>
                            </section>
                            <section>
                                <button onClick={handleClick}>Exit Quiz</button>
                            </section>
                        </div>
                    </div>
                </div>
    )
}

export default QuizTemplate