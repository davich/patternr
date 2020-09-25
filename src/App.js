import React, { useState } from 'react';
import logo from './logo.svg';
import Lights from './Lights.js';
import './App.css';

function App() {
  const [pattern, setPattern] = useState([321]);
  const [incomingPattern, setIncomingPattern] = useState([]);
  const [light, setLight] = useState(0);
  const [gameState, setGameState] = useState("play");

  const start = () => {
    const patt = [1,2,3,4].sort(() => Math.random() - 0.5);
    setPattern(patt);
    setTimeout(() => playPattern(patt), 1000);
  }

  const playPattern = (patt) => {
    setLight(patt[0])
    if (patt.length > 0) {
      setTimeout(() => playPattern(patt.slice(1)), 1000)
    } else {
      setGameState("listen");
    }
  }

  const buttonClick = (i) => {
    const newPattern = [...incomingPattern, i]
    if (newPattern.slice(pattern.length * -1).join() === pattern.join()) {
      alert("you win!");
    }
    setIncomingPattern(newPattern);
  }

  return (
    <div className="App">
      <Lights up={light} gameState={gameState} click={buttonClick}></Lights>
      <button onClick={() => start()}>Start</button>
      <button onClick={() => start()}>Replay</button>
    </div>
  );
}

export default App;
