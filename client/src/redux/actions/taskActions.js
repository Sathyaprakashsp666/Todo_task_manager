import axios from "axios";
import { baseUrl } from "../../constants/index";

export const getAllTasks = (token) => async (dispatch) => {
  try {
    const response = await axios.get(`${baseUrl}/api/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    dispatch({ type: "GET_ALL_TASKS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({
      type: "GET_ALL_TASKS_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const updateTask = (taskId, updatedTask, token) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${baseUrl}/api/tasks/${taskId}`,
      updatedTask,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: "UPDATE_TASK_SUCCESS", payload: response.data.task });
  } catch (error) {
    dispatch({
      type: "UPDATE_TASK_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const deleteTask = (taskId, token) => async (dispatch) => {
  try {
    await axios.delete(`${baseUrl}/api/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "DELETE_TASK_SUCCESS", payload: taskId });
  } catch (error) {
    dispatch({
      type: "DELETE_TASK_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const createTask = (newTask, token) => async (dispatch) => {
  try {
    const response = await axios.post(`${baseUrl}/api/tasks`, newTask, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "CREATE_TASK_SUCCESS", payload: response.data.task });
  } catch (error) {
    dispatch({
      type: "CREATE_TASK_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const fetchUsers = (token) => async (dispatch) => {
  try {
    const response = await axios.get(`${baseUrl}/api/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "FETCH_USERS_SUCCESS", payload: response.data.users });
  } catch (error) {
    dispatch({
      type: "FETCH_USERS_FAILURE",
      payload: error.response.data.message,
    });
  }
};

export const toggleStatus = (taskId, token) => async (dispatch) => {
  try {
    await axios.patch(`${baseUrl}/api/tasks/toggle-status/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "TOGGLE_STATUS", payload: taskId });
  } catch (error) {
    dispatch({
      type: "TOGGLE_STATUS_FAILURE",
      payload: error.response.data.message,
    });
  }
};
