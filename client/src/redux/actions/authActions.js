import axios from "axios";
import { baseUrl } from "../../constants/index";

export const login = (username, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${baseUrl}/api/auth/login`, {
      username,
      password,
    });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("id", response.data.user._id);
    localStorage.setItem("username", response.data.user.username);
    console.log(response);
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data.token });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error.response.data.message });
  }
};

export const register = (username, email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${baseUrl}/api/auth/register`, {
      username,
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    dispatch({ type: "REGISTER_SUCCESS", payload: response.data.token });
  } catch (error) {
    dispatch({
      type: "REGISTER_FAILURE",
      payload: error.response.data.message,
    });
  }
};
