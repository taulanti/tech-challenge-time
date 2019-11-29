import React, { Component } from 'react';
import Aux from '../../hoc/_Aux';
import TimeCard from './TimerCard';

class TimerList extends Component {

  constructor(props) {
    super(props);
    this.renderTimeList = this.renderTimeList.bind(this);
  }

  renderTimeList() {
    const timerCards = [];
    timerCards.push({ taskName: "task1", taskProject: "project1", taskDuration: "12 sec" });
    timerCards.push({ taskName: "task2", taskProject: "project2", taskDuration: "44 sec" });
    timerCards.push({ taskName: "task3", taskProject: "project3", taskDuration: "14 minutes and 12 sec" });
    timerCards.push({ taskName: "task4", taskProject: "project4", taskDuration: "2 hours and 2 minutes and 12 sec" });
    const result = timerCards.map((card, index) => {
      return <TimeCard key={Math.random(1000)} taskName={card.taskName} taskProject={card.taskProject}
        taskDuration={card.taskDuration} />
    });
    return result;
  }

  render() {
    return (
      <div>
        {this.renderTimeList()}
      </div>
    );
  }
}

export default TimerList;