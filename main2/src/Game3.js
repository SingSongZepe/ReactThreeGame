import React, { useState, useEffect, useRef } from 'react';
import "./Game3.css";
import "./color.css";

const Game3 = ({ onPassGame }) => {
    const [shooterPosition, setShooterPosition] = useState({ x: 0, y: 490 });
    const [blackSquares, setBlackSquares] = useState([]);
    const [hiddenList, setHiddenList] = useState( Array.from({ length: 10 }, () => false));
    
    const gameWindowRef = useRef(null);

    useEffect(() => {
        startGame();
    }, []);

    useEffect(() => {
        gameWindowRef.current.focus();
    }, []);

    const startGame = () => {
        setShooterPosition({ x: 0, y: 480 });

        const squares = [];
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 10; j++) {
                squares.push({ x: j * 50, y: i * 50 });
            }
        }
        setBlackSquares(squares);
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowLeft" && shooterPosition.x > 0) {
            setShooterPosition((prevPos) => ({ ...prevPos, x: prevPos.x - 1 }));
        } else if (e.key === "ArrowRight" && shooterPosition.x < 490) {
            setShooterPosition((prevPos) => ({ ...prevPos, x: prevPos.x + 1 }));
        } else if (e.key === " ") {
            console.log("shoot");
            console.log("pos: x." + shooterPosition.x + " y." + shooterPosition.y);
            shoot();
        }
    };

    const shoot = () => {
        let xshoot = shooterPosition.x + 10; // mid of shooter
        let rid = Math.floor(xshoot / 50);
        let offset = xshoot % 50;
        let updatedHiddenList = [...hiddenList];
        if (offset < 30 && offset > 10) {
            updatedHiddenList[rid] = true;
            setHiddenList(updatedHiddenList);
        }

        if (updatedHiddenList.every((a) => a)) {
            alert("You have won!");
            startGame();
            
            onPassGame("Space Invaders");
        }
    };

    return (
        <>
            <h1 className="gradient-text">Hello Game3</h1>
            <div
                className="game-window"
                ref={gameWindowRef}
                onKeyDown={handleKeyDown}
                tabIndex={0}
            >
                <div className="invaders">
                    {blackSquares.map((square, index) => (
                        <div key={index} className={`black-square ${hiddenList[index % 10] ? "hidden" : ""}`} style={{ left: square.x, top: square.y }}></div>
                    ))}
                </div>
                <div className="shooter" style={{ left: shooterPosition.x, top: shooterPosition.y }}></div>
            </div>
        </>
    );
};

export default Game3;