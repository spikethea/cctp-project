import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleQuiz, addPoints } from './redux/actions';
import styles from './QuizTemplate.module.css';


const QuizTemplate = ()=> {

    const state = useSelector(state => state.quiz);
    const dispatch = useDispatch();

    const quizzes = state.quizzes;
    const introduction = quizzes.introduction;

    const [quizPage, setQuizPage] = useState(0)

    const handleClick = (answer) => {

        let correctAnswer = introduction.questions[quizPage].correctAnswer;
        console.log(correctAnswer)
        if (introduction.questions[quizPage]) {// Is there another question?
            if (answer === introduction.questions[quizPage].correctAnswer) {// Check if answer is correct
                alert("correct!");
                setQuizPage((prevState) => prevState + 1);
                addPoints(600);// If so 
                console.log("correct");
            } else {
                alert('incorrect answer. The correct answer was ' + introduction.questions[quizPage].answers[correctAnswer]);
                setQuizPage((prevState) => prevState + 1);
                console.log("incorrect");
            }
        }

    }

    if (state.quizActive && introduction.questions[quizPage]) {

        return (
        <div className={styles.window}>
            <div className={styles.container}>
                <header>
                    <h2>Quiz</h2>
                    <button onClick={() =>dispatch(toggleQuiz('close'))} alt="Close">X</button>
                </header>
                <div className={styles.inner}>
                    <section>
                                <h2>{introduction.name}</h2>
                                <p>{introduction.questions[quizPage].question}</p>
                    </section>
                    <section>
                        <article>
                                <figure onClick={()=> handleClick('a')}>
                                    <p>{introduction.questions[quizPage].answers.a}</p>
                                </figure>
                                <figure onClick={()=> handleClick('b')}>
                                    <p>{introduction.questions[quizPage].answers.b}</p>
                                </figure>
                                <figure onClick={()=> handleClick('c')}>
                                    <p>{introduction.questions[quizPage].answers.c}</p>
                                </figure>
                                <figure onClick={()=> handleClick('d')}>
                                    <p>{introduction.questions[quizPage].answers.d}</p>
                                </figure>
                        </article>
                    </section>
                </div>
                <footer>
                    <h3>
                        {quizPage + "/" + introduction.questions.length}
                    </h3>
                </footer>
            </div>
        </div>
    )} else if (state.quizActive) {
        dispatch(toggleQuiz('close'));// if not, close the quiz
        console.log("closed");
        return (null)
    } else return null
}

export default QuizTemplate