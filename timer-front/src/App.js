import React from 'react';
import './App.css';
import TimerComp from './container/timer/Timer';

function App() {
  return (
    <div>
      <div className="partition part-one">
        <div className="part-one-timer">
          <h2>Dave Wood</h2>
          <TimerComp/>
        </div>
      </div>
      <div className="partition part-two">
        <div className="part-two-timerlist">
          <h2>Megan Kelly</h2>
        </div>
      </div>
    </div>

  );
}

export default App;
