import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const decodeHtml = function (html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

function Questions() {

    const [options, setOptions] = useState([]);
    const [questions, setQuestions] = useState([]);

    const score = useSelector(state => state.score);
    const questionIndex = useSelector(state => state.index);
    const dispatch = useDispatch();
    const question = questions[questionIndex];

    const encodeQuestions = useSelector((state) => state.questions);
    useEffect(() => {
        const decodeQuestions = encodeQuestions.map(q => {
            return {
                ...q,
                question: decodeHtml(q.question),
                correct_answer: decodeHtml(q.correct_answer),
                incorrect_answers: q.incorrect_answers.map(a => decodeHtml(a))

            }
        })
        setQuestions(decodeQuestions)
    }, [encodeQuestions])

    const answer = question.correct_answer;    
    const [answerSelected, setAnswerSelected] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const getRandomInt = max => {
        return Math.floor(Math.random() * Math.floor(max)); 
    }

    useEffect(() => {
        if (!question) {
            return;
        }

        let answer = [...question.incorrect_answers];
        answer.splice(getRandomInt(question.incorrect_answers.length), 0, question.correct_answer);
        setOptions(answer);
    }, [question]);

    const handleListItemClick = event => {

        setAnswerSelected(true);
        setSelectedAnswer(event.target.textContent)
        
        if (event.trigger.textContent === answer) {
            dispatch({
                type: 'SET_SCORE',
                score: score + 1
            })
        }

        if (questionIndex + 1 <= questions.length) {
            setTimeout(() => {
                setAnswerSelected(false)
                setSelectedAnswer(null)
                dispatch({
                    type: 'SET_INDEX',
                    index: questionIndex + 1,
                })
            }, 2500)
        }

    };

    const getClass = option => {
        if (!answerSelected) {
            return ``;
        }

        if (option === answer) {
            return `correct`;
        }

        if (option === selectedAnswer) {
            return `selected`;
        }
    }

    

    return (
        <div>
            <p>Question {questionIndex + 1}</p>
            <h3>{question.question}</h3>
            <ul>
                {options.map((option, i) => (
                    <li key={i} onClick={handleListItemClick} className={getClass(option)}>
                        {option}
                    </li>
                ))}
            </ul>
            <div>
                Score: {score} / {questions.length}
            </div>
        </div>
    )
}


export default Questions;