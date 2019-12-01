import React, { Component } from 'react';
import './Timer.css';
import { Timer } from 'easytimer.js';
import Aux from '../../hoc/_Aux';
import { addTask } from '../../redux/actions/taskActions';
import { connect } from 'react-redux';

class TimerComp extends Component {

  constructor(props) {
    super(props);

    const timer = new Timer();

    this.state = {
      timer_text: timer.getTimeValues().toString(),
      timer: timer,
      timer_state: "stopped",
      taskName: "default",
      taskProject: "default",
      duration: timer.getTimeValues().toString()
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

  inputChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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
    this.onSubmit();
    this.setState({
      ...this.state,
      timer_text: "00:00:00",
      timer_state: "stopped",
      taskName: "default",
      taskProject: "default"
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
    this.props.addTime(this.state.timer.getTimeValues());
  }

  formatDuration = (time) => {
    const t = time.split(":");
    if (t[0] !== '00') {
      return `${parseInt(t[0], 10)} hours and ${parseInt(t[1], 10)} minutes and ${parseInt(t[2], 10)} seconds`;
    } else if (t[1] !== '00') {
      return `${parseInt(t[1], 10)} minutes and ${parseInt(t[2], 10)} seconds`;
    }
    return `${parseInt(t[2], 10)} seconds`
  }

  onSubmit = () => {

    const newTask = {
      title: this.state.taskName,
      project: this.state.taskProject,
      duration: this.formatDuration(this.state.timer_text),
    };
    this.props.addTask(newTask);
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
                <input type="text" class="form-control" name="taskName" placeholder="Enter task name"
                  onChange={this.inputChangeHandler}></input>
              </div>
              <div class="form-group">
                <label for="formGroupExampleInput2">Project</label>
                <input type="text" class="form-control" name="taskProject" placeholder="Enter project name"
                  onChange={this.inputChangeHandler}></input>
              </div>
            </form>
          )}
        </div>

      </Aux>

    );
  }
}

const mapStateToProps = state => ({
  task: state.task
});

export default connect(mapStateToProps, { addTask })(TimerComp);