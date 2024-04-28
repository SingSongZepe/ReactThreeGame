import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import './App.css'
import Blanko from './Blanko'; 
import Slido  from './Slido'; 
import Tetro from './Tetro'; 

function Center({ selectedOption, score, setScore}) {

  function reset() {
    setScore(0);
  }

  function handlePassGame(game_name) {
    setScore(score + 1);
    console.log("user passed game " + game_name);
  }

  let content;
  if (selectedOption === '/blanko') {
    content = <Blanko onPassGame={ handlePassGame }/>;
  } else if (selectedOption === '/slido') {
    content = <Slido />;
  } else if (selectedOption === '/tetro') {
    content = <Tetro />;
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