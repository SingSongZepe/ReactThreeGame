import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import './App.css'
import Game1 from './Game1';
import Game2 from './Game2';
import Game3 from './Game3';

function Center({ selectedOption, score, setScore}) {
  const [baseScore, setBaseScore] = useState(2);

  function initSet() {
    const url = 'https://cs6080.web.cse.unsw.edu.au/raw/data/score.json';

    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const serializedData = JSON.stringify(data);
      setScore(serializedData["data"]);
      setBaseScore(serializedData["data"]);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setScore(2);
      setBaseScore(2);
    });
  }

  function reset() {
    initSet(baseScore);
  }

  function handlePassGame(game_name) {
    setScore(score + 1);
    console.log("user passed game " + game_name);
  }

  let content;
  if (selectedOption === '/game1') {
    content = <Game1 onPassGame={ handlePassGame }/>;
  } else if (selectedOption === '/game2') {
    content = <Game2 onPassGame={ handlePassGame }/>;
  } else if (selectedOption === '/game3') {
    content = <Game3 onPassGame={ handlePassGame }/>;
  } else {
    content = (
      <>
        <h3 className="red-font">Please choose an option from the navbar</h3>
        <h5>Games won: {score} 
          <span className="reset blue-font" onClick={reset}> reset</span>
        </h5>
      </>
    );
  }

  return (
    <div className="center">
      {content}
    </div>
  )
}

function App() {
  // record score
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  function handleOptionChange(option) {
    setSelectedOption(option);
  }

  return (
    <>
      <div>Hello World</div>
      <Header onOptionChange={ handleOptionChange } />
      <Center selectedOption={ selectedOption} score={ score } setScore={ setScore }/>
      <Footer />
    </>
  );
}

export default App;