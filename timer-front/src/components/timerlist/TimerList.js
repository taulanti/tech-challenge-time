import React, { Component } from 'react';
import TimeCard from './TimerCard';
import { connect } from 'react-redux';
import { getTasks, deleteTask } from '../../redux/actions/taskActions';
import PropTypes from 'prop-types';

class TimerList extends Component {

  deleteTaskById = id => {
    this.props.deleteTask(id);
  }

  componentDidMount() {
    this.props.getTasks('day');
  }

  renderTimeList() {
    const { tasks } = this.props.task;
    const result = tasks.map((card, index) => {
      return <TimeCard key={Math.random(1000)} taskName={card.title} taskProject={card.project}
        taskDuration={card.duration}
        taskId={card.id}
        onDelete={this.deleteTaskById.bind(this, card.id)} />
    });
    return result;
  }

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? this.renderTimeList() : null}
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
  task: state.task,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getTasks, deleteTask })(TimerList);