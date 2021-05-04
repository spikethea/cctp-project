import React, { useEffect } from 'react';
import styles from  './UserInterface.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { getBadge, toggleQuiz } from '../redux/actions';

const Quiz = () => {

    const state = useSelector(state => state.quiz);
    const info = useSelector(state=> state.info);
    
    return (
        <div className={styles.container}>
            <h2>Quizzes</h2>
            <p>Tokens: {info.tokens}</p>
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

    useEffect(()=> {




        Object.keys(state.quizzes).forEach(function(item){
            if (lvl >= state.quizzes[item].lvl) {
                quizArray.push(state.quizzes[item]);
            } else {
                
            }
    
        })
    }, [state, lvl, quizArray])

    Object.keys(state.quizzes).forEach(function(item){
        if (lvl >= state.quizzes[item].lvl) {
            quizArray.push(state.quizzes[item]);
        } else {
            
        }

    })

    useEffect(()=> {
        if (state.completed === 3) {
            dispatch(getBadge('brainiac'));
        }
        
    },[state, dispatch])

    const handleClick = (tagName) => {
        if (info.tokens > 0 ) {
            dispatch(toggleQuiz(tagName, "show"))
        } else {
            alert("Not Enough Tokens! Earn some more by unlocking new Badges and Information Boxes")
        }
        
    }

    quizArray = quizArray.map((quiz, index)=> {
        
        return (
            <article className={ quiz.completed ? styles.quizCompleted : styles.quiz} key={index} onClick={()=> handleClick(quiz.tagName)} >
                <figure>
                    <h2>{quiz.name}</h2>
                    <img alt="Quiz" src="https://upload.wikimedia.org/wikipedia/en/3/34/Students-in-barrons-kitchen.jpg"/>
                </figure>
                <aside>
                    <header>
                        <h4>LVL: {quiz.lvl}</h4>
                        <h4 style={{color: quiz.completed ? "white": "black", filter: quiz.completed ? "drop-shadow(0px 0px 5px white)" : "none"}}>{quiz.completed ? "COMPLETED": `Questions: ${quiz.questions.length}`}</h4>
                    </header>
                    <h3 style={{ fontWeight: "normal" }}>{quiz.description}</h3>
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
