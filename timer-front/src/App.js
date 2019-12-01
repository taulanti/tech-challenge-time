import React, { Component } from 'react';
import './App.css';
import TimerComp from './components/timer/Timer';
import TimerList from './components/timerlist/TimerList';
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/authAction';
import { getTasks } from './redux/actions/taskActions';
import RegisterModal from './components/auth/RegisterModal';
import AppNavBar from './components/AppNavBar';

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser())
  }

  getTasks = filter => {
    store.dispatch(getTasks(filter));
  }


  render() {
    return (
      <Provider store={store} >
        <div>
          <AppNavBar />
          <div className="partition part-one">
            <div className="part-one-timer">
              <TimerComp />
            </div>
          </div>
          <div className="partition part-two">
            <div className="part-two-timerlist">
              <h2>Timer tasks list</h2>
              <button className="btn btn-outline-light" onClick={this.getTasks.bind(this, 'day')}>
                Today
              </button>
              <button className="btn btn-outline-light" onClick={this.getTasks.bind(this, 'week')}>
                This week
              </button>
              <button className="btn btn-outline-light" onClick={this.getTasks.bind(this, 'month')}>
                This month
              </button>
              <TimerList />
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
