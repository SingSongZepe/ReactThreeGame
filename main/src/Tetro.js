import React, { useState, useEffect } from 'react';
import './Tetro.css';

function Tetro({ onPassGame }) {
    const [grid, setGrid] = useState(Array.from({ length: 120 }, () => ''));
    const [box, setBox] = useState([]);
    const [active, setActive] = useState(false);
    const dropInterval = 500;

    useEffect(() => {
        if (active) {
            const interval = setInterval(() => {
                moveBlockDown();
            }, dropInterval);

            return () => clearInterval(interval);
        }
    }, [active, box]);

    useEffect(() => {
        if (checkFailed()) {
            resetGame();
        }
        if (checkFilledLine() >= 5) {
            onPassGame("Tetro");
            alert("Congratulations! You have passed the game.");
        }
    }, [grid]);

    const createBlock = (g) => {
        const blocks = [
            [4], // 1x1 block
            [4, 14], // 2x1 block
            [4, 14, 5, 15] // 2x2 block
        ];

        const randomBlock = blocks[Math.floor(Math.random() * blocks.length)];
        const newGrid = [...g];
        newGrid.splice(4, randomBlock.length, ...randomBlock);
        setGrid(newGrid);
        setBox(randomBlock);
        setActive(true);
    };

    const moveBlockDown = () => {
        const newGrid = [...grid];
        const emptyIndexes = newGrid.map((cell, index) => (cell === '' && index < 100) ? index : null).filter(index => index !== null);

        if (emptyIndexes.length === 0 || box.some(index => newGrid[index + 10] !== '' && newGrid[index + 10] !== 'green')) {
            lockBlock();
        } else {
            const updatedGrid = newGrid.map((cell, index) => (box.includes(index) ? '' : cell));
            box.forEach(index => {
                updatedGrid[index + 10] = 'green';
            });
            setGrid(updatedGrid);
            setBox(box.map(index => index + 10));
        }
    };

    const moveBlockLeft = () => {
        if (!box.some(index => index % 10 === 0)) {
            const newBox = box.map(index => index - 1);
            if (!newBox.some(index => grid[index] === 'blue')) {
                setGrid(grid.map((cell, index) => (box.includes(index) ? '' : cell)));
                setBox(newBox);
            }
        }
    };
    
    const moveBlockRight = () => {
        if (!box.some(index => index % 10 === 9)) {
            const newBox = box.map(index => index + 1);
            if (!newBox.some(index => grid[index] === 'blue')) {
                setGrid(grid.map((cell, index) => (box.includes(index) ? '' : cell)));
                setBox(newBox);
            }
        }
    };

    const checkFailed = () => {
        for (let i = 0; i < 40; i++) {
            if (grid[i] === 'blue') {
                alert('Game Over!');
                return true;
            }
        }
        return false;
    };

    const checkFilledLine = () => {
        let filledLines = 0;
        for (let i = 0; i < 120; i += 10) {
            const line = grid.slice(i, i + 10);
            if (line.every(cell => cell === 'blue')) {
                filledLines++;
            }
        }
        return filledLines;
    };

    const lockBlock = () => {
        const newGrid = [...grid];
        box.forEach(index => {
            newGrid[index] = 'blue';
        });
        setGrid(newGrid);
        setActive(false);
        createBlock(newGrid);
        checkFailed();
    };

    const handleCellClick = () => {
        createBlock(grid);
    };

    const resetGame = () => {
        setGrid(Array.from({ length: 120 }, () => ''));
        setBox([]);
        setActive(false);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                moveBlockLeft();
            } else if (e.key === 'ArrowRight') {
                moveBlockRight();
            } else if (e.key === 'ArrowDown') {
                moveBlockDown();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [box]);

    return (
        <div className='tetro'>
            <div className="container-tetro" onClick={handleCellClick}>
                {grid.map((cell, index) => (
                    <div key={index} className={`cell-tetro ${cell === 'blue' ? 'blue' : cell === 'green' ? 'green' : ''}`} onClick={handleCellClick}></div>
                ))}
            </div>
            <button onClick={resetGame}>Reset</button>
        </div>
    );
}

export default Tetro;