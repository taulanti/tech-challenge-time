import React from 'react'
import './TimerCard.css';

const TimerCard = (props) => {
  return (
    <div className="timer-card">
      <label className="label-white">Task name: </label>
      <label className="normal-label"> {props.taskName}</label><br />
      <label className="label-white">Task project: </label>
      <label className="normal-label"> {props.taskProject}</label><br />
      <label className="label-white">Task duration: </label>
      <label className="normal-label"> {props.taskDuration}</label><br/>
      <button className="btn btn-outline-light">
        Delete
      </button>
    </div>
  )
}

export default TimerCard