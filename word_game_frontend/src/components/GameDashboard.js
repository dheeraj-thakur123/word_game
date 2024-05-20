// src/components/GameDashboard.js
import React, { useState, useEffect } from 'react';

const GameDashboard = ({ rounds, userName }) => {
  const [words, setWords] = useState([]);
  const [guessCount,setGuessCount] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/words?rounds=${rounds}`)
      .then((response) => response.json())
      .then((data) => setWords(data));
  }, [rounds]);

  const handleGuess = () => {
    if(guess.trim().length>0){
      let curr_count= guessCount+1;
    let current_score = score;
    setGuessCount((prev)=>curr_count+prev); // Use functional update
    if (guess.toLowerCase() === words[currentWordIndex].word.toLowerCase()) {
      current_score += 1;
      setScore(current_score); 
      setGuessCount(0);
      if(currentWordIndex+1<rounds){
        setCurrentWordIndex(currentWordIndex + 1);
      }else{
        setGameOver(true);
        handleGameOver(current_score);
      }
    } else {
      if (guessCount === 3) {
        setGuessCount(0);
        if(currentWordIndex+1<rounds){
          setCurrentWordIndex(currentWordIndex + 1);
        }else{
          setGameOver(true);
          handleGameOver(current_score);
        }
      }
    }
    setGuess('');
    }else{
      setGuess('');
    }
  };
  
  

  const handleGameOver = (current_score) => {
    fetch('http://localhost:5000/api/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName, score:current_score }),
    }).then(() => {
      // Optionally handle post-score submission actions
    });
  };

  if (gameOver) {
    return(
      <div>
        <div className='score' >
          <div className='score_innerBox'>
            Your score: {score}
          </div>
          <button className='play_again' onClick={()=>window.location.href = '/'}>Play Again!</button>
        </div>
      </div>      
    )
  }

  return (
    <div className="game_dashboard">
      {words.length > 0 && (
        <>
          <div>
            <h3 style={{fontSize:'50px',color:'white'}}>Hint: {words[currentWordIndex]?.hint}</h3>
            <div style={{textAlign:'center'}}>
              <input
                type="text"
                className='text_field'
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder='guess the word...'
              />
              <button onClick={handleGuess} type='submit' className='score_submit_button'>Submit</button>
            </div>
          </div>
          <div style={{fontSize:'50px',color:'green'}}>Score: {score}</div>
        </>
      )}
    </div>
  );
};

export default GameDashboard;
