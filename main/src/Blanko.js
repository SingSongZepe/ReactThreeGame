import React, { useState, useEffect } from 'react';
import "./Blanko.css";
import "./color.css";
import { strs } from './res/data/blanko'; 

const Blanko = ({ onPassGame }) => {
    function getSub(str, indexes) { 
        let result = ''; 
        indexes.forEach(index => {
                result += str[index]; 
            });
        return result; 
    }
    const [currentString, setCurrentString] = useState('');
    const [inputIndices, setInputIndices] = useState([]);
    const [inputValues, setInputValues] = useState(['', '', '']);
    
    useEffect(() => {
        const randomString = strs[Math.floor(Math.random() * strs.length)];
        setCurrentString(randomString);
        const indices = [];
        while (indices.length < 3) {
            const randomIndex = Math.floor(Math.random() * randomString.length);
            if (randomString[randomIndex] !== ' ' && !indices.includes(randomIndex)) {
                indices.push(randomIndex);
            }
        }
        indices.sort();
        setInputIndices(indices);
    }, []);

    const handleInputChange = (index, value) => {
        console.log(index);
        console.log(value);

        const newInputValues = [...inputValues];
        newInputValues[index] = value;
        setInputValues(newInputValues);

        if (newInputValues.every(val => val.length === 1)) {
            if (newInputValues.join('') === getSub(currentString, inputIndices)) {
                alert('Correct!');
                onPassGame("Blanko");
            }
        }
    };

    const resetGame = () => {
        const randomString = strs[Math.floor(Math.random() * strs.length)];
        setCurrentString(randomString);
        const indices = [];
        while (indices.length < 3) {
            const randomIndex = Math.floor(Math.random() * randomString.length);
            if (randomString[randomIndex] !== ' ' && !indices.includes(randomIndex)) {
                indices.push(randomIndex);
            }
        }
        setInputIndices(indices);
        setInputValues(['', '', '']);
    };

    return (
        <>
            <div className="blanko">
                <h1>Blanko SingSongZepe</h1>
                <div className="container-blanko">
                    {currentString.split('').map((char, index) => (
                        <div key={index} className="box">
                            {inputIndices.includes(index) ? (
                                <input
                                    className="input-box"
                                    type="text"
                                    maxLength={1}
                                    value={inputValues[inputIndices.indexOf(index)]}
                                    onChange={(e) => handleInputChange(inputIndices.indexOf(index), e.target.value)}
                                />
                            ) : (
                                char
                            )}
                        </div>
                    ))}
                </div>
                <button key="btn" className="btn-reset" onClick={resetGame}>Reset Game</button>
            </div>
        </>
    )
};

export default Blanko;