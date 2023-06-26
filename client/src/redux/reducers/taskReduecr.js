const initialState = {
  tasks: [],
  error: null,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_TASKS_SUCCESS":
      return { ...state, tasks: action.payload, error: null };
    case "GET_ALL_TASKS_FAILURE":
    case "UPDATE_TASK_FAILURE":
    case "DELETE_TASK_FAILURE":
      return { ...state, error: action.payload };
    case "UPDATE_TASK_SUCCESS": {
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, ...action.payload };
        }
        return task;
      });
      return { ...state, tasks: updatedTasks, error: null };
    }
    case "DELETE_TASK_SUCCESS": {
      const updatedTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      return { ...state, tasks: updatedTasks, error: null };
    }
    case "TOGGLE_TASK_STATUS_SUCCESS":
      const updatedTask = action.payload;
      const updatedTasks = state.tasks.map((task) => {
        if (task._id === updatedTask._id) {
          return { ...task, completed: updatedTask.completed };
        }
        return task;
      });
      return { ...state, tasks: updatedTasks };

    case "TOGGLE_TASK_STATUS_FAILURE":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default taskReducer;
