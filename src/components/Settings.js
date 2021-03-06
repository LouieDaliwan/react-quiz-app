import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function Settings()
{
    const [options, setOptions] = useState(null);

    const loading = useSelector(state => state.options.loading);
    const questionDifficulty = useSelector(state => state.options.questio_difficulty) ;
    const questionCategory = useSelector(state => state.options.category);
    const questionType = useSelector(state => state.options.question_type);
    const numberOfQuestions = useSelector(state => state.options.amount_of_questions);
    
    const dispatch = useDispatch();

    useEffect(() => {

        const apiUrl = `https://opentdb.com/api_category.php`; 

        const handleLoadingChange = value => {
            dispatch({
                type: 'CHANGE_LOADING',
                loading: value
            });
        }
    
        handleLoadingChange(true);

        fetch(apiUrl)
        .then((res) => res.json())
        .then((response) => {
            handleLoadingChange(false);
            setOptions(response.trivia_categories);
        });
    }, [setOptions, dispatch]);

    const handleCategoryChange = e => {
        dispatch({
            type: 'CHANGE_CATEGORY',
            value: e.target.value,
        })
    }

    const handleDifficulty = e => {
        dispatch({
            type: 'CHANGE_DIFFICULTY',
            value: e.target.value,
        })
    }

    const handleTypeChange = e => {
        dispatch({
            type: 'CHANGE_TYPE',
            value: e.target.value,
        })
    }

    const handleAmountChange = e => {
        dispatch({
            type: 'CHANGE_AMOUNT',
            value: e.target.value,
        })
    }

    if (!loading) {
        return (
            <div>
                <div>
                    <h2>Select Category:</h2>
                    <select value={questionCategory} onChange={handleCategoryChange}>
                        <option>All</option>
                        { options &&
                            options.map((option) => (
                               <option value={option.id} key={option.id}>
                                   {option.name}
                                </option> 
                            ))
                        }
                    </select>
                </div>
                <div>
                    <h2>Select Difficulty:</h2>
                    <select value={questionDifficulty} onChange={handleDifficulty}>
                        <option value="" key="difficulty-0">All</option>
                        <option value="easy" key="difficulty-1">Easy</option>
                        <option value="medium"  key="difficulty-2">Medium</option>
                        <option value="hard" key="difficulty-3">Hard</option>
                    </select>
                </div>
                <div>
                    <h2>Select Question Type:</h2>
                    <select value={questionType} onChange={handleTypeChange}>
                        <option value="" key="type-0">All</option>
                        <option value="multiple" key="type-1">Multiple Choice</option>
                        <option value="boolean" key="type-2">True/False</option>
                    </select>
                </div>
                <div>
                    <h2>Amount of Questions:</h2>
                    <input value={numberOfQuestions} onChange={handleAmountChange} />
                </div>
            </div>
        );
    } else {
        <p> Loading... </p>
    }
    
}

export default Settings;