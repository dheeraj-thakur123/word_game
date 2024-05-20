// src/components/StartGame.js
import React, { useState, useEffect } from 'react';

const StartGame = ({ startGame }) => {
  const [name, setName] = useState('');
  const [rounds, setRounds] = useState(5);
  const [topScores, setTopScores] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/scores')
      .then((response) => response.json())
      .then((data) => setTopScores(data));
  }, []);

  const handleStart = () => {
    if (name.trim() && rounds > 0) {
      startGame(name, rounds);
    }
  };

  return (
    <>    <div className="start-game">
        <div >
            <h1 style={{fontSize:'100px',color:'white',textAlign:'center'}}>Guess-a-Word</h1>
        </div>
      <input
        type="text"
        className='text_field'
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={rounds} onChange={(e) => setRounds(Number(e.target.value))} style={{margin:'25px 0px'}}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        {/* Add more options as needed */}
      </select>
      <button className='start-buttn' onClick={handleStart}>Start Game</button>      
    </div>
    <div className="leaderboard">
        <h3>Top Scores</h3>
        <div class="table-wrapper">
                    <table class="fl-table">
                        <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Top Score</th>                            
                        </tr>
                        </thead>

          {topScores?.map((score, index) =>{
            return (               
                
                        <tbody>
                            <tr>
                                <td>{index+1}</td>
                                <td>{score.name}</td>
                                <td>{score.score}</td>                                
                            </tr>                           
                        </tbody>
                                  
            )
          } )}
          </table>
                </div>  
      </div>
    </>
  );
};

export default StartGame;
