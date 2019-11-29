import React from 'react';
import './App.css';
import TimerComp from './components/timer/Timer';
import TimerCard from './components/timerlist/TimerCard';
import TimerList from './components/timerlist/TimerList';

function App() {
  return (
    <div>
      <div className="partition part-one">
        <div className="part-one-timer">
          <h2>Dave Wood</h2>
          <TimerComp />
        </div>
      </div>
      <div className="partition part-two">
        <div className="part-two-timerlist">
          <h2>Timer tasks list</h2>
          {/*<TimerCard taskName="task1" taskProject="project1" taskDuration="12" />*/}
          <TimerList />
          <button className="btn btn-outline-light">
            Clear all tasks
          </button>
        </div>
      </div>
    </div>

  );
}

export default App;
