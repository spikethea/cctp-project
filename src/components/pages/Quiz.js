import React from 'react';
import styles from  './UserInterface.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { toggleQuiz, selectQuiz } from '../redux/actions';

const Quiz = () => {

    const state = useSelector(state => state.quiz);

    return (
        <div className={styles.container}>
            <h2>Quizzes</h2>
            <section>
                <h4 className={styles.subtitle}>Introduction</h4>
                <Quizzes state={state}/>
            </section>
        </div>
    )
}


const Quizzes = ({state}) => {

    const dispatch = useDispatch();

    
    const introduction = state.quizzes.introduction;

    let quizArray = [];

    Object.keys(state.quizzes).forEach(function(item){
        quizArray.push(state.quizzes[item]);
    })

    console.log(quizArray);

    const handleClick = () => {
        dispatch(toggleQuiz("show"))
        dispatch(selectQuiz('introduction'))
    }

    quizArray = quizArray.map((quiz, index)=> {
        return (
            <article key={index} onClick={handleClick} className={styles.quiz}>
                <figure>
                    <h4>{quiz.name}</h4>
                    <img src="https://upload.wikimedia.org/wikipedia/en/3/34/Students-in-barrons-kitchen.jpg"/>
                </figure>
                <aside>
                    <p>28/01/2021</p>
                    <p>{quiz.description}</p>
                </aside>
            </article>
            )
        })

    return (
        <>
        {quizArray}
        </>
    )
}

export default Quiz
