import React, { useState, useEffect } from 'react';
import "./Slido.css";
import p1 from "./res/img/assets/1.png"
import p2 from "./res/img/assets/2.png"
import p3 from "./res/img/assets/3.png"
import p4 from "./res/img/assets/4.png"
import p5 from "./res/img/assets/5.png"
import p6 from "./res/img/assets/6.png"
import p7 from "./res/img/assets/7.png"
import p8 from "./res/img/assets/8.png"
import slidoImg from "./res/img/slido.png";

const Slido = ({ onPassGame }) => {
    const [grid, setGrid] = useState(Array(9).fill(null));
    const [emptyCellIndex, setEmptyCellIndex] = useState(8);
    const [solvedGrid, setSolvedGrid] = useState([]);
    const [active, setActive] = useState(false);
    const [winState, setWinState] = useState(false);
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        initializeGrid();
    }, []);

    const initializeGrid = () => {
        const squares = [p1, p2, p3, p4, p5, p6, p7, p8];
        const shuffledSquares = squares.sort(() => Math.random() - 0.5);

        setGrid(shuffledSquares);
        setSolvedGrid(squares);
        setActive(true);
        setWinState(false);
        setShowImage(false);
    };

    const handleCellClick = (clickedIndex) => {
        if (active && isValidMove(clickedIndex)) {
            const newGrid = [...grid];
            newGrid[emptyCellIndex] = newGrid[clickedIndex];
            newGrid[clickedIndex] = null;
            setGrid(newGrid);
            setEmptyCellIndex(clickedIndex);

            if (checkWinState(newGrid)) {
                alert('Correct!');
                onPassGame("Slido");
                initializeGrid();
            }
        }
    };

    const isValidMove = (clickedIndex) => {
        const rowDiff = Math.abs(Math.floor(clickedIndex / 3) - Math.floor(emptyCellIndex / 3));
        const colDiff = Math.abs((clickedIndex % 3) - (emptyCellIndex % 3));
        return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
    };

    const checkWinState = (currentGrid) => {
        return JSON.stringify(currentGrid) === JSON.stringify(solvedGrid);
    };

    const solveGame = () => {
        const newGrid = [...grid];
        newGrid[emptyCellIndex] = null;
        setGrid(newGrid);
        setShowImage(true);
        setWinState(true);
    };

    const resetGame = () => {
        initializeGrid();
    };

    return (
        <>
            <div className="slido">
                <h1>Slido SingSongZepe</h1>
                <div className={`grid-slido ${showImage ? 'hidden' : ''}`}>
                    {grid.map((square, index) => (
                        <div key={index} className={`cell-slido ${square ? 'filled' : 'empty'}`} onClick={() => handleCellClick(index)}>
                            {square && <img src={square} alt={`Image ${index}`} />}
                        </div>
                    ))}
                </div>
                {showImage && <img className="solved" src={slidoImg} alt="Slido Image" />}
                <div className="buttons">
                    <button onClick={solveGame} disabled={winState}>Solve</button>
                    <button onClick={resetGame} disabled={!active}>Reset</button>
                </div>
            </div>
        </>
    );
};

export default Slido;