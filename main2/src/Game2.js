import React, { useState, useEffect } from 'react';
import "./Game2.css";

const Game2 = ({ onPassGame }) => {
    const [round, setRound] = useState(3);
    const [instruction, setInstruction] = useState('');
    const [userInput, setUserInput] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [nowRound, setNowRound] = useState(0);
    const [playList, setPlayList] = useState([]);
    const [btnEnabled, setBtnEnabled] = useState(false);
    const characters = ['A', 'B', 'C', 'D'];
    const maxRound = 4;

    const generateRandomCharacter = () => {
        const randomIndex = Math.floor(Math.random() * characters.length);
        return characters[randomIndex];
    };

    const startRound = () => {
        setUserInput([]);
        setPlayList([]);
        const r = Math.floor(Math.random() * maxRound + 1);
        playRound(r);
        setNowRound(r);
    };

    const playRound = async (round) => {
        disableButtons();
        for (let i = 0; i < round; i++) {
            const character = generateRandomCharacter();
            setInstruction(character);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setInstruction('');
            await new Promise((resolve) => setTimeout(resolve, 500));
    
            setPlayList(prevPlayList => [...prevPlayList, character]); 
        }
        enableButtons();
    };

    const enableButtons = () => {
        const buttons = document.querySelectorAll('.button-2');
        buttons.forEach(button => {
            button.classList.remove('btn-disabled');
            button.classList.add('btn-enabled');
        });
        setBtnEnabled(true);
    };
    
    const disableButtons = () => {
        const buttons = document.querySelectorAll('.button-2');
        buttons.forEach(button => {
            button.classList.add('btn-disabled');
            button.classList.remove('btn-enabled');
        });
        setBtnEnabled(false);
    };
    const handleButtonClick = (character) => {
        if (!btnEnabled) {
            return;
        }
        const updatedUserInput = [...userInput, character];
        setUserInput(updatedUserInput);

        if (updatedUserInput.length === nowRound) {
            if (JSON.stringify(updatedUserInput) === JSON.stringify(playList)) {
                if (round === 5) {
                    alert("Congratulations! You have won the Flashing Memory Game.");
                    setRound(1);
                    startRound();

                    onPassGame("Flashing Memory Game");
                } else {
                    setRound(round + 1);
                    startRound();
                }
            } else {
                alert("Incorrect sequence. You have lost the game.");
                setRound(1);
                startRound();
            }
        }
    };

    useEffect(() => {
        if (!gameOver) {
            const buttons = document.querySelectorAll('button');
            buttons.forEach(button => button.disabled = true);
            startRound();
        }
    }, [gameOver]);

    return (
        <>
            <div className="top-half">
                {characters.map((character, index) => (
                    <div className="button-2" key={index} onClick={() => handleButtonClick(character)} disabled={true}>
                        {character}
                    </div>
                ))}
            </div>
            <div className="bottom-half">
                <div className="instruction-box">
                    {instruction}
                </div>
            </div>
        </>
    );
};

export default Game2;