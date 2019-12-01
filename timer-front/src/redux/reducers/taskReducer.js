import { GET_TASKS, ADD_TASK, DELETE_TASK, CLEAR_TASK } from '../actions/types';


const initialState = {
  tasks: []
};


export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload
      }
    case ADD_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks]
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      }
    case CLEAR_TASK:
      return {
        tasks: []
      }
    default:
      return state;
  }
}