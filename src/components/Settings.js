import React, { useEffect, useState } from "react";

function Settings()
{
    const [options, setOptions] = useState(null);
    const [loading, setLoading] = useState(null);
    const [questionDifficulty, setQuestionDifficulty] = useState(null);
    const [questionCategory, setQuestionCategory] = useState("");
    const [questionType, setQuestionType] = useState("");
    const [numberOfQuestions, setNumberofQuestions] = useState(50);

    useEffect(() => {
        const apiUrl = `https://opentdb.com/api_category.php`; 
    
        fetch(apiUrl)
        .then((res) => res.json())
        .then((response) => {
            setLoading(false);
            setOptions(response.trivia_categories);
        });
    }, [setOptions]);

    const handleCategoryChange = e => {
        setQuestionCategory(e.target.value);
    }

    const handleDifficulty = e => {
        setQuestionDifficulty(e.target.value);
    }

    const handleTypeChange = e => {
        setQuestionType(e.target.value);
    }

    const handleAmountChange = e => {
        setNumberofQuestions(e.target.value);
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