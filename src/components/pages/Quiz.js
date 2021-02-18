import React from 'react';
import styles from  './UserInterface.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { toggleQuiz, selectQuiz } from '../redux/actions';

const Quiz = () => {

    const state = useSelector(state => state.quiz);
    const info = useSelector(state=> state.info);

    return (
        <div className={styles.container}>
            <h2>Quizzes</h2>
            <section>
                <h4 className={styles.subtitle}>Introduction</h4>
                <Quizzes info={info} state={state}/>
            </section>
        </div>
    )
}


const Quizzes = ({state, info}) => {

    const dispatch = useDispatch();
    const lvl = info.exp;


    let quizArray = [];
    let lockedQuizArray = [];

    Object.keys(state.quizzes).forEach(function(item){
        if (lvl >= state.quizzes[item].lvl) {
            quizArray.push(state.quizzes[item]);
        } else {
            
        }

    })

    console.log(quizArray);

    const handleClick = (tagName) => {
        dispatch(toggleQuiz(tagName, "show"))
    }

    quizArray = quizArray.map((quiz, index)=> {
        
        return (
            <article style={{background: quiz.completed ? "grey" : "white"}} key={index} onClick={()=> handleClick(quiz.tagName)} className={styles.quiz}>
                <figure>
                    <h4>{quiz.name}</h4>
                    <img alt="Quiz Picture" src="https://upload.wikimedia.org/wikipedia/en/3/34/Students-in-barrons-kitchen.jpg"/>
                </figure>
                <aside>
                    <header>
                        <h4>LVL: {quiz.lvl}</h4>
                        <h4 style={{color: "white"}}>{quiz.completed ? "COMPLETED": ""}</h4>
                    </header>
                    <h3>{quiz.description}</h3>
                </aside>
            </article>
            )
        })

    return (
        <>
        {quizArray}
        {lockedQuizArray}
        </>
    )
}

export default Quiz
