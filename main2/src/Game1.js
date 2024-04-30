import React, { useState, useEffect } from 'react';
import "./Game1.css";
import "./color.css";

const Game1 = ({ onPassGame }) => {
    const numbers = [
        [1, 2, 2],
        [3, 6, -3],
        [8, 3, 11],
        [9, 8, 17],
        [5, 4, 9],
    ];

    const [numIndex, setNumIndex] = useState(0);
    const [input1, setInput1] = useState(numbers[numIndex][0]);
    const [input2, setInput2] = useState(numbers[numIndex][1]);
    const [output, setOutput] = useState(numbers[numIndex][2]);

    const handleButtonClick = (operator) => {
        let result;
        switch (operator) {
            case '+':
                result = input1 + input2;
                break;
            case '-':
                result = input1 - input2;
                break;
            case 'x':
                result = input1 * input2;
                break;
            case '÷':
                result = input1 / input2;
                break;
            default:
                break;
        }

        if (result === output) {
            setNumIndex((numIndex + 1) % numbers.length);
            setInput1(numbers[numIndex][0]);
            setInput2(numbers[numIndex][1]);
            setOutput(numbers[numIndex][2]);
            
            alert("Congratulations! You have won the operation blanks game.");
            onPassGame("operation-blanks");
        } else {
            alert("Incorrect answer. Please try again.");
        }
    };

    useEffect(() => {
        setInput1(numbers[numIndex][0]);
        setInput2(numbers[numIndex][1]);
        setOutput(numbers[numIndex][2]);
    }, [numIndex]);

    return (
        <div className="game-container">
            <div className="primary-box">
                <div className="section">
                    <div>{input1}</div>
                </div>
                <div className="section">
                    <button onClick={() => handleButtonClick('+')}>+</button>
                    <button onClick={() => handleButtonClick('-')}>-</button>
                    <button onClick={() => handleButtonClick('x')}>x</button>
                    <button onClick={() => handleButtonClick('÷')}>÷</button>
                </div>
                <div className="section">
                    <div>{input2}</div>
                </div>
                <div className="section">
                    <div>=</div>
                </div>
                <div className="section">
                    <div>{output}</div>
                </div>
            </div>
        </div>
    );
};

export default Game1;