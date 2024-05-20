// src/App.js
import React, { useState } from 'react';
import StartGame from './components/StartGame';
import GameDashboard from './components/GameDashboard';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [rounds, setRounds] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const startGame = (playerName, numberOfRounds) => {
    setName(playerName);
    setRounds(numberOfRounds);
    setIsGameStarted(true);
  };

  return (
    <div className="App">
      {!isGameStarted ? (
        <StartGame startGame={startGame} />
      ) : (
        <GameDashboard rounds={rounds} userName={name} />
      )}
    </div>
  );
}

export default App;
