import React, { Component } from 'react';
import './Timer.css';
import { Timer } from 'easytimer.js';
import Aux from '../../hoc/_Aux';

class TimerComp extends Component {

  constructor(props) {
    super(props);

    const timer = new Timer();

    this.state = {
      timer_text: timer.getTimeValues().toString(),
      timer: timer,
      timer_state: "stopped"
    };

    //Bind the functions
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.logTime = this.logTime.bind(this);

    //Add the listeners
    timer.addEventListener("secondsUpdated", this.onTimerUpdated.bind(this));

    timer.addEventListener("started", this.onTimerUpdated.bind(this));

    timer.addEventListener("reset", this.onTimerUpdated.bind(this));
  }

  componentWillUnmount() {
    if (this.state.timer !== null) {
      this.state.timer.stop();
    }
  }

  onTimerUpdated(e) {
    this.setState({
      ...this.state,
      timer_text: this.state.timer.getTimeValues().toString()
    });
  }

  startTimer() {
    this.state.timer.start();

    this.setState({
      ...this.state,
      timer_state: "ticking"
    });
  }

  stopTimer() {
    this.state.timer.stop();

    this.setState({
      ...this.state,
      timer_text: "00:00:00",
      timer_state: "stopped"
    });
  }

  pauseTimer() {
    this.state.timer.pause();

    this.setState({
      ...this.state,
      timer_state: "paused"
    });
  }

  resetTimer() {
    this.state.timer.reset();

    this.setState({
      ...this.state,
      timer_state: "ticking"
    });
  }

  logTime() {
    console.log(this.state.timer.getTimeValues().toString());
    this.props.addTime(this.state.timer.getTimeValues());
  }
  render() {
    return (
      <Aux>
        <div className="Timer">
          <div className="timer-text">
            <h2>{this.state.timer_text}</h2>
          </div>
          <div className="timer-buttons">
            <button type="button" onClick={this.startTimer} disabled={this.state.timer_state === "ticking"} className="btn btn-outline-light">
              Start
            </button>

            <button onClick={this.pauseTimer} disabled={this.state.timer_state !== "ticking"} className="btn btn-outline-light">
              Pause
            </button>

            <button onClick={this.stopTimer} className="btn btn-outline-light">
              Finish
            </button>

            <button onClick={this.resetTimer} disabled={this.state.timer_state === "stopped"} className="btn btn-outline-light">
              Reset
            </button>
          </div>
        </div>
        <div className="taskForm">
          {this.state.timer_state !== "stopped" && (
            <form>
              <div class="form-group">
                <label for="formGroupExampleInput">Task name</label>
                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter task name"></input>
              </div>
              <div class="form-group">
                <label for="formGroupExampleInput2">Project</label>
                <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Enter project name"></input>
              </div>
            </form>
          )}
        </div>

      </Aux>

    );
  }
}

export default TimerComp;