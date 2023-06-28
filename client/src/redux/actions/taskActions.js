import axios from "axios";
import { baseUrl } from "../../constants/index";


export const getAllTasks = (token) => async (dispatch) => {
  try {
    dispatch({ type: 'GET_ALL_TASKS_REQUEST' });
    const response = await axios.get(`${baseUrl}/api/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    dispatch({ type: 'GET_ALL_TASKS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({
      type: 'GET_ALL_TASKS_FAILURE',
      payload: error.response.data.message,
    });
  }
};

export const updateTask = (taskId, updatedTask, token) => async (dispatch) => {
  try {
    dispatch({ type: 'UPDATE_TASK_REQUEST' });
    const response = await axios.put(
      `${baseUrl}/api/tasks/${taskId}`,
      updatedTask,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch({ type: 'UPDATE_TASK_SUCCESS', payload: response.data.task });
  } catch (error) {
    dispatch({
      type: 'UPDATE_TASK_FAILURE',
      payload: error.response.data.message,
    });
  }
};

export const deleteTask = (taskId, token) => async (dispatch) => {
  try {
    dispatch({ type: 'DELETE_TASK_REQUEST' }); // Dispatch request action
    await axios.delete(`${baseUrl}/api/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: 'DELETE_TASK_SUCCESS', payload: taskId });
  } catch (error) {
    dispatch({
      type: 'DELETE_TASK_FAILURE',
      payload: error.response.data.message,
    });
  }
};

export const createTask = (newTask, token) => async (dispatch) => {
  try {
    dispatch({ type: 'CREATE_TASK_REQUEST' }); // Dispatch request action
    const response = await axios.post(`${baseUrl}/api/tasks`, newTask, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: 'CREATE_TASK_SUCCESS', payload: response.data.task });
  } catch (error) {
    dispatch({
      type: 'CREATE_TASK_FAILURE',
      payload: error.response.data.message,
    });
  }
};

export const toggleStatus = (taskId, token) => async (dispatch) => {
  try {
    dispatch({ type: 'TOGGLE_TASK_STATUS_REQUEST' }); // Dispatch request action
    await axios.patch(`${baseUrl}/api/tasks/toggle-status/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: 'TOGGLE_TASK_STATUS_SUCCESS', payload: taskId });
  } catch (error) {
    dispatch({
      type: 'TOGGLE_TASK_STATUS_FAILURE',
      payload: error.response.data.message,
    });
  }
};