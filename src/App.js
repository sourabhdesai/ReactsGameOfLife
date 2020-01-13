import React from 'react';
import './App.css';
import Game from './Game';

function App() {
  return (
    <div className="App">
      <Game boardWidth={75} boardHeight={75} iterationSleep={1000} />
    </div>
  );
}

export default App;
