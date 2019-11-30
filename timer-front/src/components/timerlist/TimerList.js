import React, { Component } from 'react';
import TimeCard from './TimerCard';
import { connect } from 'react-redux';
import { getTasks, deleteTask } from '../../redux/actions/taskActions';
import PropTypes from 'prop-types';

class TimerList extends Component {

  componentDidMount() {
    this.props.getTasks();
  }

  deleteTaskById = id => {
    this.props.deleteTask(id);
  }

  renderTimeList() {
    const { tasks } = this.props.task;
    const result = tasks.map((card, index) => {
      return <TimeCard key={Math.random(1000)} taskName={card.taskName} taskProject={card.taskProject}
        taskDuration={card.taskDuration}
        taskId={card.Id}
        onDelete={this.deleteTaskById.bind(this, card.Id)} />
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

TimerList.propTypes = {
  getTasks: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  task: state.task
})

export default connect(mapStateToProps, { getTasks, deleteTask })(TimerList);