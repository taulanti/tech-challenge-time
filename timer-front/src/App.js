import React from 'react';
import './App.css';
import TimerComp from './components/timer/Timer';
import TimerList from './components/timerlist/TimerList';
import {Provider} from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
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
          <TimerList />
          <button className="btn btn-outline-light">
            Clear all tasks
          </button>
        </div>
      </div>
    </div>
    </Provider>
  );
}

export default App;
