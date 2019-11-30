import { GET_TASKS, ADD_TASK, DELETE_TASK } from '../actions/types';


const initialState = {
  tasks: [
    {
      Id: 1,
      taskName: "first task",
      taskProject: "project1",
      taskDuration: "1h and 2m and 3s"
    },
    {
      Id: 2,
      taskName: "second task",
      taskProject: "project2",
      taskDuration: "2h and 22m and 3s"
    },
    {
      Id: 3,
      taskName: "Third task",
      taskProject: "project3",
      taskDuration: "11h and 11m and 33s"
    }
  ]
};


export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state
      }
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.Id !== action.payload)
      }
    case ADD_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks]
      };

    default:
      return state;
  }
}