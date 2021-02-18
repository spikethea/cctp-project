import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleQuiz, addPoints } from './redux/actions';
import styles from './QuizTemplate.module.css';


const QuizTemplate = ()=> {

    const state = useSelector(state => state.quiz);
    console.log(state.quizActive)
    const dispatch = useDispatch();

    const quizzes = state.quizzes;
    const quizActive = state.quizActive

    const currentQuiz = quizzes[state.currentQuiz];
    console.log(currentQuiz);

    console.log(quizzes.introduction);

    useEffect(()=> {
        console.log("useEffect");

        if (quizActive && quizPage === currentQuiz.questions.length) {
            console.log("closing");
            dispatch(toggleQuiz(state.currentQuiz, 'finish'));// if not, close the quiz
            setQuizPage(0);
        }

        if (!quizActive) {
            setQuizPage(0);
        }
    }, [quizActive])

    const [quizPage, setQuizPage] = useState(0);

    const handleClick = (answer) => {

        let correctAnswer = currentQuiz.questions[quizPage].correctAnswer;
        console.log(correctAnswer)
        if (currentQuiz.questions[quizPage]) {// Is there another question?
            if (answer === currentQuiz.questions[quizPage].correctAnswer) {// Check if answer is correct
                alert("correct!");
                setQuizPage((prevState) => prevState + 1);
                console.log("correct");
            } else {
                alert('incorrect answer. The correct answer was ' + currentQuiz.questions[quizPage].answers[correctAnswer]);
                setQuizPage((prevState) => prevState + 1);
                console.log("incorrect");
            }
        }

    }

    return (
        <>
        <Quiz dispatch={dispatch} quizActive={quizActive} handleClick={handleClick} currentQuiz={currentQuiz} quizPage={quizPage}/>
        </>
    )


}


const Quiz = ({quizActive, handleClick, currentQuiz, quizPage, dispatch}) => {



    if (quizActive && currentQuiz.questions[quizPage]) {

        return (
        <div className={styles.window}>
            <div className={styles.container}>
                <header>
                    <h2>Quiz</h2>
                    <button onClick={() =>dispatch(toggleQuiz(currentQuiz.tagName, 'hide'))} alt="Close">X</button>
                </header>
                <div className={styles.inner}>
                    <section>
                                <h2>{currentQuiz.name}</h2>
                                <p>{currentQuiz.questions[quizPage].question}</p>
                    </section>
                    <section>
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
    )} else if (quizActive && quizPage === currentQuiz.questions.length) {

        

        return (
        <div className={styles.window}>
            <div className={styles.container}>
                <header>
                    <h2>Finished</h2>
                    <button onClick={() =>dispatch(toggleQuiz(currentQuiz.tagName, 'finish'))} alt="Close">X</button>
                </header>
                <section>
                    <button onClick={()=> dispatch(toggleQuiz(currentQuiz.tagName, 'finish'))}>Finished</button>
                </section>
                
            </div>
        </div>
        )
    } else return null
}

export default QuizTemplate